// import React, { useEffect, useState } from "react";
// import { supabase } from "../../supabaseClient";
// import alert from "../../assets/alert.png"

// const ChatReports = () => {
//     const [reports, setReports] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchReports();

//         const channel = supabase
//             .channel("realtime-user_reports")
//             .on(
//                 "postgres_changes",
//                 { event: "*", schema: "public", table: "user_reports" },
//                 () => fetchReports()
//             )
//             .subscribe();

//         return () => supabase.removeChannel(channel);
//     }, []);

//     // ---------- PRIORITY ARRAYS ----------
//     const highPriority = [
//         "Harassment",
//         "Threats",
//         "Unsolicited Explicit Content",
//         "Offensive Language"
//     ];

//     const mediumPriority = [
//         "Catfishing",
//         "AI Generated",
//         "Fake Profile",
//         "Other"
//     ];

//     const lowPriority = [
//         "Spam",
//         "Violation of Terms"
//     ];

//     function getPriority(reason) {
//         if (highPriority.includes(reason)) return "high";
//         if (mediumPriority.includes(reason)) return "medium";
//         if (lowPriority.includes(reason)) return "low";
//         return "low";
//     }

//     // ---------- FETCH ----------
//     async function fetchReports() {
//         setLoading(true);

//         const { data, error } = await supabase
//             .from("user_reports")
//             .select("*")
//             .order("created_at", { ascending: false });

//         if (!error) {
//             const mapped = (data || []).map(report => ({
//                 ...report,
//                 priority: getPriority(report.reason),
//                 status: report.status || "open" // fallback if null
//             }));

//             setReports(mapped);
//         }

//         setLoading(false);
//     }

//     // ---------- INVESTIGATE ----------
//     async function handleInvestigate(reportId) {
//         try {
//             const { data, error } = await supabase
//                 .from("user_reports")
//                 .update({ status: "under_investigation" })
//                 .eq("id", reportId)
//                 .select(); // important to confirm update

//             if (error) {
//                 console.error("Update failed:", error.message);
//                 return;
//             }

//             // Update UI immediately
//             setReports(prev =>
//                 prev.map(r =>
//                     r.id === reportId
//                         ? { ...r, status: "under_investigation" }
//                         : r
//                 )
//             );

//             console.log("Status updated successfully", data);
//         } catch (err) {
//             console.error("Unexpected error:", err);
//         }
//     }

//   async function handleBanUser(report) {
//   try {
//     // Insert into ban_user table using the reported user's phone number
//     const { error } = await supabase
//       .from("ban_user")
//       .insert({
//         phone_number: report.reported_phone // <--- use reported_phone here
//       });

//     if (error) {
//       if (error.code === "23505") { // unique violation
//         alert("User is already banned.");
//         return;
//       }
//       console.error("Ban failed:", error.message);
//       return;
//     }

//     // Optionally, update report status to resolved
//     await supabase
//       .from("user_reports")
//       .update({ status: "resolved" })
//       .eq("id", report.id);

//     // Update UI
//     setReports(prev =>
//       prev.map(r =>
//         r.id === report.id
//           ? { ...r, status: "resolved", isBanned: true }
//           : r
//       )
//     );

//     alert("User banned successfully");
//   } catch (err) {
//     console.error("Unexpected error:", err);
//   }
// }

//    async function fetchReports() {
//   setLoading(true);

//   const { data: reportsData, error: reportsError } = await supabase
//     .from("user_reports")
//     .select("*")
//     .order("created_at", { ascending: false });

//   if (reportsError) {
//     console.error("Error fetching reports:", reportsError);
//     setLoading(false);
//     return;
//   }

//   // Fetch banned phones
//   const { data: bannedData } = await supabase
//     .from("ban_user")
//     .select("phone_number");

//   const bannedPhones = bannedData?.map(b => b.phone_number) || [];

//   // Map reports and mark banned users
//   const mapped = (reportsData || []).map(report => ({
//     ...report,
//     priority: getPriority(report.reason),
//     status: report.status || "open",
//     isBanned: bannedPhones.includes(report.reported_phone) // check reported_phone
//   }));

//   setReports(mapped);
//   setLoading(false);
// }



//     // ---------- COUNTS ----------
//     const openCount = reports.filter(r => r.status === "open").length;
//     const investigatingCount = reports.filter(
//         r => r.status === "under_investigation"
//     ).length;
//     const resolvedCount = reports.filter(r => r.status === "resolved").length;

//     const highCount = reports.filter(r => r.priority === "high").length;

//     return (
//         <>
//             <div className="section-header">
//                 <h2>Chat Reports</h2>
//                 <p>Review and manage reported chat conversations</p>
//             </div>

//             <div className="stats-row">
//                 <div className="stat-box">
//                     <img src={alert } alt="alert" />
//                     <p>Open</p>
//                     <h3>{openCount}</h3>
//                 </div>

//                 <div className="stat-box">
//                     <p>Under Investigation</p>
//                     <h3>{investigatingCount}</h3>
//                 </div>
//                 <div className="stat-box">
//                     <p>High Priority</p>
//                     <h3>{highCount}</h3>
//                 </div>
//                 <div className="stat-box">
//                     <p>Resolved This Week</p>
//                     <h3>{resolvedCount}</h3>
//                 </div>


//             </div>

//             {loading ? (
//                 <p>Loading reports...</p>
//             ) : reports.length === 0 ? (
//                 <p>No chat reports found.</p>
//             ) : (
//                 reports.map(report => (
//                     <div key={report.id} className="chat-report-card">
//                         <div className="chat-header">
//                             <div>
//                                 <span className="dot red"></span>
//                                 <h4>{report.reason}</h4>

//                                 {/* PRIORITY BADGE */}
//                                 <span className={`badge ${report.priority}`}>
//                                     {report.priority.toUpperCase()}
//                                 </span>

//                                 {/* STATUS BADGE */}
//                                 <span className={`badge ${report.status}`}>
//                                     {report.status.replace("_", " ").toUpperCase()}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="chat-info">
//                             <div>
//                                 <p><strong>Reported by:</strong> {report.reporter_name}</p>
//                                 <p><strong>Reporter Phone:</strong> {report.reporter_phone}</p>
//                             </div>
//                             <div>
//                                 <p><strong>Reported user:</strong> {report.reported_name}</p>
//                                    <p><strong>Reported Phone:</strong> {report.reported_phone}</p>
//                                 <p><strong>Reported at:</strong> {new Date(report.created_at).toLocaleString()}</p>
//                             </div>
//                         </div>

//                         <div className="action-row">
//                             <button className="btn blue">
//                                 View Full Conversation
//                             </button>

//                            <button
//   className="btn red"
//   onClick={() => handleBanUser(report)}
//   disabled={report.isBanned} // disable if already banned
// >
//   {report.isBanned ? "Banned" : "Ban User"}
// </button>




//                             <button
//                                 className="btn gray"
//                                 onClick={() => handleInvestigate(report.id)}
//                                 disabled={report.status === "under_investigation"}
//                             >
//                                 {report.status === "under_investigation"
//                                     ? "Investigating..."
//                                     : "Investigate"}
//                             </button>

//                         </div>
//                     </div>
//                 ))
//             )}
//         </>
//     );
// };

// export default ChatReports;













import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import alert from "../../assets/alert.png"

import "./ChatReports.css"

const ChatReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReports();

        const channel = supabase
            .channel("realtime-user_reports")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "user_reports" },
                () => fetchReports()
            )
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    // ---------- PRIORITY ARRAYS ----------
    const highPriority = [
        "Harassment",
        "Threats",
        "Unsolicited Explicit Content",
        "Offensive Language"
    ];

    const mediumPriority = [
        "Catfishing",
        "AI Generated",
        "Fake Profile",
        "Other"
    ];

    const lowPriority = [
        "Spam",
        "Violation of Terms"
    ];

    function getPriority(reason) {
        if (highPriority.includes(reason)) return "high";
        if (mediumPriority.includes(reason)) return "medium";
        if (lowPriority.includes(reason)) return "low";
        return "low";
    }

    // ---------- FETCH ----------
    async function fetchReports() {
        setLoading(true);

        const { data, error } = await supabase
            .from("user_reports")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error) {
            const mapped = (data || []).map(report => ({
                ...report,
                priority: getPriority(report.reason),
                status: report.status || "open" // fallback if null
            }));

            setReports(mapped);
        }

        setLoading(false);
    }

    // ---------- INVESTIGATE ----------
    async function handleInvestigate(reportId) {
        try {
            const { data, error } = await supabase
                .from("user_reports")
                .update({ status: "under_investigation" })
                .eq("id", reportId)
                .select(); // important to confirm update

            if (error) {
                console.error("Update failed:", error.message);
                return;
            }

            // Update UI immediately
            setReports(prev =>
                prev.map(r =>
                    r.id === reportId
                        ? { ...r, status: "under_investigation" }
                        : r
                )
            );

            console.log("Status updated successfully", data);
        } catch (err) {
            console.error("Unexpected error:", err);
        }
    }

  async function handleBanUser(report) {
  try {
    // Insert into ban_user table using the reported user's phone number
    const { error } = await supabase
      .from("ban_user")
      .insert({
        phone_number: report.reported_phone // <--- use reported_phone here
      });

    if (error) {
      if (error.code === "23505") { // unique violation
        alert("User is already banned.");
        return;
      }
      console.error("Ban failed:", error.message);
      return;
    }

    // Optionally, update report status to resolved
    await supabase
      .from("user_reports")
      .update({ status: "resolved" })
      .eq("id", report.id);

    // Update UI
    setReports(prev =>
      prev.map(r =>
        r.id === report.id
          ? { ...r, status: "resolved", isBanned: true }
          : r
      )
    );

    alert("User banned successfully");
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

   async function fetchReports() {
  setLoading(true);

  const { data: reportsData, error: reportsError } = await supabase
    .from("user_reports")
    .select("*")
    .order("created_at", { ascending: false });

  if (reportsError) {
    console.error("Error fetching reports:", reportsError);
    setLoading(false);
    return;
  }

  // Fetch banned phones
  const { data: bannedData } = await supabase
    .from("ban_user")
    .select("phone_number");

  const bannedPhones = bannedData?.map(b => b.phone_number) || [];

  // Map reports and mark banned users
  const mapped = (reportsData || []).map(report => ({
    ...report,
    priority: getPriority(report.reason),
    status: report.status || "open",
    isBanned: bannedPhones.includes(report.reported_phone) // check reported_phone
  }));

  setReports(mapped);
  setLoading(false);
}



    // ---------- COUNTS ----------
    const openCount = reports.filter(r => r.status === "open").length;
    const investigatingCount = reports.filter(
        r => r.status === "under_investigation"
    ).length;
    const resolvedCount = reports.filter(r => r.status === "resolved").length;

    const highCount = reports.filter(r => r.priority === "high").length;

return (
  <>
    {/* HEADER */}
    <div className="chat-section-header">
      <h2>Chat Reports</h2>
      <p>Review and manage reported chat conversations</p>
    </div>

    {/* STATS ROW */}
    <div className="chat-stats-row">
<div
  style={{
    flex: 1,
    background: "#f3f4f6",
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
  }}
>
  {/* TOP ROW */}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      color: "#6b7280",
      fontSize: "15px",
      fontWeight: 500,
    }}
  >
    <span>Open Reports</span>

    <img
      src={alert}
      alt="alert"
      style={{
        width: "20px",
        height: "20px",
      }}
    />
  </div>

  {/* COUNT */}
  <h3
    style={{
      margin: 0,
      fontSize: "24px",
      fontWeight: "700",
      color: "#111827",
    }}
  >
    {openCount}
  </h3>
</div>


      <div className="chat-stat-card">
        <div className="stat-title">
          <span>High Priority</span>
          <span className="stat-dot red"></span>
        </div>
        <h3>{highCount}</h3>
      </div>

      <div className="chat-stat-card">
        <div className="stat-title">
          <span>Under Investigation</span>
          <span className="stat-dot blue"></span>
        </div>
        <h3>{investigatingCount}</h3>
      </div>

      <div className="chat-stat-card">
        <div className="stat-title">
          <span>Resolved This Week</span>
          <span className="stat-dot green"></span>
        </div>
        <h3>{resolvedCount}</h3>
      </div>
    </div>

    {/* REPORT LIST */}
    {loading ? (
      <p>Loading reports...</p>
    ) : reports.length === 0 ? (
      <p>No chat reports found.</p>
    ) : (
      reports.map((report) => (
        <div key={report.id} className="chat-report-card">

          {/* TOP ROW */}
          <div className="report-header">
            <div className="left">
              <span
                className={`priority-dot ${
                  report.priority === "high"
                    ? "red"
                    : report.priority === "medium"
                    ? "orange"
                    : "gray"
                }`}
              ></span>

              <h4>{report.reason}</h4>

              <span className="status-badge">
                {report.status.replace("_", " ").toUpperCase()}
              </span>
            </div>
          </div>

          {/* INFO SECTION */}
          <div className="report-info">
            <div>
              <p>Reported by: <strong>{report.reporter_name}</strong></p>
              <p>Messages in thread: {report.message_count}</p>
            </div>

            <div>
              <p>Reported user: <strong>{report.reported_name}</strong></p>
              <p>
                Reported at:{" "}
                {new Date(report.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          {/* MESSAGE CONTEXT */}
          <div className="message-context">
            <span>Last Message Context:</span>
            <p>{report.last_message || "No message available"}</p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="report-actions">
            <button className="btn-blue">
              View Full Conversation
            </button>

            <button
              className="btn-red"
              onClick={() => handleBanUser(report)}
              disabled={report.isBanned}
            >
              {report.isBanned ? "Banned" : "Ban User"}
            </button>

          

                            <button
                                className="btn-gray"
                                onClick={() => handleInvestigate(report.id)}
                                disabled={report.status === "under_investigation"}
                            >
                                {report.status === "under_investigation"
                                    ? "Investigating..."
                                    : "Investigate"}
                            </button>

          </div>
        </div>
      ))
    )}
  </>
);

};

export default ChatReports;