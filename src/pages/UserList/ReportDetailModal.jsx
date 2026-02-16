// import React from "react";
// import "./ReportDetailModal.css";
// import { FaTimes, FaExclamationTriangle, FaTrash, FaCheck } from "react-icons/fa";

// export default function ReportDetailModal({ report, onClose }) {
//   if (!report) return null;

//   const formattedDate = report.created_at
//     ? new Date(report.created_at).toLocaleDateString()
//     : "--";

//   return (
//     <div className="report-overlay">
//       <div className="report-modal">

//         {/* HEADER */}
//         <div className="report-header">
//           <div>
//             <h2>
//               Report Detail{" "}
//               <span className="status-badge">PENDING REVIEW</span>
//             </h2>
//             <p className="report-id">
//               ID: #{report.id} · Reported on {formattedDate}
//             </p>
//           </div>
//           <FaTimes className="close-icon" onClick={onClose} />
//         </div>

//         {/* Reporter Details */}
//         <div className="section">
//           <h4 className="section-title">Reporter Details</h4>
//           <div className="user-card">
//             <div className="avatar"></div>
//             <div className="user-info">
//               <h3>{report.reporter_name || "Unknown"}</h3>
//             </div>
//           </div>
//         </div>

//         {/* Reason Section */}
//         <div className="section">
//           <h4 className="section-title">Reason & Description</h4>

//           <div className="label">Report Category</div>
//           <p className="category">
//             {report.reason || "Not Specified"}
//           </p>

//           <div className="reason-box">
//             <span className="reason-title">
//               Reported Message / Reason
//             </span>
//             <p>
//               {report.message || "No message provided"}
//             </p>
//           </div>
//         </div>

//         {/* Evidence Section */}
//         {report.image_url && (
//           <div className="section">
//             <div className="evidence-header">
//               <h4 className="section-title">Evidence Preview</h4>
//               <span className="attachment">1 ATTACHMENT</span>
//             </div>

//             <div className="image-preview">
//               <img
//                 src={report.image_url}
//                 alt="evidence"
//               />
//             </div>
//           </div>
//         )}

//         {/* Account Being Reported */}
//         <div className="section">
//           <h4 className="section-title">Account Being Reported</h4>
//           <div className="user-card">
//             <div className="avatar"></div>
//             <div className="user-info">
//               <h3>{report.reported_name || "Unknown User"}</h3>
//             </div>
//           </div>
//         </div>

//         {/* Admin Notes */}
//         <div className="section">
//           <h4 className="section-title">Admin Notes</h4>
//           <textarea
//             placeholder="Add internal notes about this case..."
//             className="admin-notes"
//           />
//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="action-row">
//           <button className="btn light">
//             <FaExclamationTriangle /> Send Warning
//           </button>

//           <button className="btn danger-outline">
//             <FaTrash /> Remove Content
//           </button>
//         </div>

//         <button className="btn suspend">
//           ⛔ Suspend Account
//         </button>

//         <button className="btn resolve">
//           <FaCheck /> Mark as Resolved
//         </button>

//         <p className="audit-text">
//           Action will be logged in the Audit Trail permanently.
//         </p>

//       </div>
//     </div>
//   );
// }




// import React, { useState } from "react";
// import "./ReportDetailModal.css";
// import {
//   FaTimes,
//   FaExclamationTriangle,
//   FaTrash,
//   FaCheck,
// } from "react-icons/fa";

// import { supabase } from "../../supabaseClient";

// export default function ReportDetailModal({ report, onClose }) {
//   const [loading, setLoading] = useState(false);

//   if (!report) return null;

//   const formattedDate = report.created_at
//     ? new Date(report.created_at).toLocaleDateString()
//     : "--";

//   // ✅ MARK AS RESOLVED FUNCTION
//   const handleResolve = async () => {
//     setLoading(true);

//     try {
//       // 1️⃣ Insert into resolved_user table
//       const { error: insertError } = await supabase
//         .from("resolved_user")
//         .insert([
//           {
//             reporter_name: report.reporter_name,
//             reported_name: report.reported_name,
//             reporter_phone: report.reporter_phone,
//             reported_phone: report.reported_phone,
//             evidence_urls: report.evidence_urls || [],
//             image_url: report.image_url,
//             reason: report.reason,
//             resolved_count: 1,
//           },
//         ]);

//       if (insertError) throw insertError;

//       // 2️⃣ Delete from reports table
//       const { error: deleteError } = await supabase
//         .from("reports")
//         .delete()
//         .eq("id", report.id);

//       if (deleteError) throw deleteError;

//       alert("Report moved to resolved successfully ✅");

//       onClose(); // close modal
//       window.location.reload(); // refresh page

//     } catch (error) {
//       console.error("Resolve error:", error);
//       alert("Something went wrong ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="report-overlay">
//       <div className="report-modal">

//         {/* HEADER */}
//         <div className="report-header">
//           <div>
//             <h2>
//               Report Detail{" "}
//               <span className="status-badge">PENDING REVIEW</span>
//             </h2>
//             <p className="report-id">
//               ID: #{report.id} · Reported on {formattedDate}
//             </p>
//           </div>
//           <FaTimes className="close-icon" onClick={onClose} />
//         </div>

//         {/* Reporter Details */}
//         <div className="section">
//           <h4 className="section-title">Reporter Details</h4>
//           <div className="user-card">
//             <div className="avatar"></div>
//             <div className="user-info">
//               <h3>{report.reporter_name || "Unknown"}</h3>
//             </div>
//           </div>
//         </div>

//         {/* Reason */}
//         <div className="section">
//           <h4 className="section-title">Reason & Description</h4>

//           <div className="label">Report Category</div>
//           <p className="category">
//             {report.reason || "Not Specified"}
//           </p>

//           <div className="reason-box">
//             <span className="reason-title">
//               Reported Message / Reason
//             </span>
//             <p>
//               {report.message || "No message provided"}
//             </p>
//           </div>
//         </div>

//         {/* Evidence */}
//         {report.image_url && (
//           <div className="section">
//             <div className="evidence-header">
//               <h4 className="section-title">Evidence Preview</h4>
//               <span className="attachment">1 ATTACHMENT</span>
//             </div>

//             <div className="image-preview">
//               <img src={report.image_url} alt="evidence" />
//             </div>
//           </div>
//         )}

//         {/* Reported Account */}
//         <div className="section">
//           <h4 className="section-title">Account Being Reported</h4>
//           <div className="user-card">
//             <div className="avatar"></div>
//             <div className="user-info">
//               <h3>{report.reported_name || "Unknown User"}</h3>
//             </div>
//           </div>
//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="action-row">
//           <button className="btn light">
//             <FaExclamationTriangle /> Send Warning
//           </button>

//           <button className="btn danger-outline">
//             <FaTrash /> Remove Content
//           </button>
//         </div>

//         {/* ✅ REAL WORKING RESOLVE BUTTON */}
//         <button
//           className="btn resolve"
//           onClick={handleResolve}
//           disabled={loading}
//         >
//           <FaCheck />
//           {loading ? " Processing..." : " Mark as Resolved"}
//         </button>

//         <p className="audit-text">
//           Action will be logged in the Audit Trail permanently.
//         </p>

//       </div>
//     </div>
//   );
// }





// import React, { useState } from "react";
// import "./ReportDetailModal.css";
// import {
//   FaTimes,
//   FaExclamationTriangle,
//   FaTrash,
//   FaCheck,
// } from "react-icons/fa";

// import { supabase } from "../../supabaseClient";
// import {
//   sendWarningUser
// } from "../../services/adminApi";


// export default function ReportDetailModal({ report, onClose }) {
//   const [loading, setLoading] = useState(false);
//   const [warningLoading, setWarningLoading] = useState(false);


//   async function handleSendWarning() {
//     const confirmWarning = window.confirm(
//       "Send warning to this user? Warning will stay TRUE for 5 seconds."
//     );

//     if (!confirmWarning) return;

//     setWarningLoading(true);

//     const success = await sendWarningUser(user.email);

//     if (success) {
//       alert("Warning sent successfully (5 seconds).");
//     } else {
//       alert("Failed to send warning.");
//     }

//     setWarningLoading(false);
//   }



//   if (!report) return null;

//   const formattedDate = report.created_at
//     ? new Date(report.created_at).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     })
//     : "--";

//   // ✅ MARK AS RESOLVED FUNCTION - CORRECTED VERSION
//   const handleResolve = async () => {
//     if (!window.confirm("Are you sure you want to mark this report as resolved?")) {
//       return;
//     }

//     setLoading(true);

//     try {
//       // 🔥 STEP 1: Get FULL report data from user_reports table
//       const { data: fullReport, error: fetchError } = await supabase
//         .from("user_reports")
//         .select("*")
//         .eq("id", report.id)
//         .single();

//       if (fetchError) {
//         console.error("Error fetching full report:", fetchError);
//         throw new Error("Failed to fetch report details");
//       }

//       if (!fullReport) {
//         throw new Error("Report not found");
//       }

//       // 🔥 STEP 2: Insert into resolved_user table
//       const { error: insertError } = await supabase
//         .from("resolved_user")
//         .insert([
//           {
//             reporter_name:
//               fullReport.reporter_name ||
//               fullReport.reporter_phone ||
//               "Unknown Reporter",
//             reported_name:
//               fullReport.reported_name ||
//               fullReport.reported_phone ||
//               "Unknown User",
//             reporter_phone: fullReport.reporter_phone,
//             reported_phone: fullReport.reported_phone,
//             evidence_urls: fullReport.evidence_urls || [],
//             image_url: fullReport.image_url || null,
//             reason: fullReport.reason || "Not Specified",
//             message: fullReport.message || "No message provided",
//             resolved_count: 1,
//             resolved_at: new Date().toISOString(),
//           },
//         ]);

//       if (insertError) {
//         console.error("Error inserting into resolved_user:", insertError);
//         throw new Error("Failed to move report to resolved");
//       }

//       // 🔥 STEP 3: Delete from user_reports table
//       const { error: deleteError } = await supabase
//         .from("user_reports")
//         .delete()
//         .eq("id", report.id);

//       if (deleteError) {
//         console.error("Error deleting report:", deleteError);
//         throw new Error("Failed to delete report from pending");
//       }

//       alert("✅ Report successfully resolved and moved to archive!");

//       // Close modal and reload to refresh data
//       onClose();
//       window.location.reload();
//     } catch (error) {
//       console.error("Resolve error:", error);
//       alert(`❌ Error: ${error.message || "Something went wrong"}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveContent = async () => {
//   if (!window.confirm("Are you sure you want to delete this report permanently?")) {
//     return;
//   }

//   setLoading(true);

//   try {
//     const { error } = await supabase
//       .from("user_reports")
//       .delete()
//       .eq("id", report.id);

//     if (error) {
//       console.error("Error deleting report:", error);
//       alert("❌ Failed to delete report");
//       return;
//     }

//     alert("✅ Report deleted successfully!");
//     onClose();
//     window.location.reload();
//   } catch (err) {
//     console.error("Delete error:", err);
//     alert("❌ Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };


//   return (
//     <div className="report-overlay">
//       <div className="report-modal">
//         {/* HEADER */}
//         <div className="report-header">
//           <div>
//             <h2>
//               Report Detail{" "}
//               <span className="status-badge">PENDING REVIEW</span>
//             </h2>
//             <p className="report-id">
//               ID: #{report.id} · Reported on {formattedDate}
//             </p>
//           </div>
//           <FaTimes className="close-icon" onClick={onClose} />
//         </div>

//         {/* Reporter Details */}
//         <div className="section">
//           <h4 className="section-title">Reporter Details</h4>
//           <div className="user-card">
//             <div className="avatar">
//               {(report.reporter_name || report.reporter_phone || "?")[0].toUpperCase()}
//             </div>
//             <div className="user-info">
//               <h3>{report.reporter_name || report.reporter_phone || "Unknown Reporter"}</h3>
//               <p className="user-meta">{report.reporter_phone || "--"}</p>
//             </div>
//           </div>
//         </div>

//         {/* Reason & Description */}
//         <div className="section">
//           <h4 className="section-title">Reason & Description</h4>

//           <div className="label">Report Category</div>
//           <p className="category">{report.reason || "Not Specified"}</p>

//           <div className="reason-box">
//             <span className="reason-title">Reported Message / Reason</span>
//             <p>{report.message || "No message provided"}</p>
//           </div>
//         </div>

//         {/* Evidence Preview */}
//         {report.image_url && (
//           <div className="section">
//             <div className="evidence-header">
//               <h4 className="section-title">Evidence Preview</h4>
//               <span className="attachment">1 ATTACHMENT</span>
//             </div>

//             <div className="image-preview">
//               <img
//                 src={report.image_url}
//                 alt="evidence"
//                 onError={(e) => {
//                   e.target.style.display = 'none';
//                   e.target.nextElementSibling.style.display = 'flex';
//                 }}
//               />
//               <div style={{ display: 'none', alignItems: 'center', justifyContent: 'center', height: '200px', background: '#f5f5f5' }}>
//                 <p>Image failed to load</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Reported Account */}
//         <div className="section">
//           <h4 className="section-title">Account Being Reported</h4>
//           <div className="user-card">
//             <div className="avatar">
//               {(report.reported_name || report.reported_phone || "?")[0].toUpperCase()}
//             </div>
//             <div className="user-info">
//               <h3>{report.reported_name || report.reported_phone || "Unknown User"}</h3>
//               <p className="user-meta">{report.reported_phone || "--"}</p>
//             </div>
//           </div>
//         </div>

//         {/* ACTION BUTTONS */}
//         <div className="action-row">
//           <button
//             className={`btn warning-btn ${warningLoading ? "warning-active" : ""}`}
//             onClick={handleSendWarning}
//             disabled={warningLoading}
//           >
//             {warningLoading ? "⚠ Warning Sent" : "⚠ Send Warning"}
//           </button>



//          <button
//   className="btn danger-outline"
//   onClick={handleRemoveContent}
//   disabled={loading}
// >
//   <FaTrash /> {loading ? "Removing..." : "Remove Content"}
// </button>

//         </div>

//         {/* ✅ RESOLVE BUTTON */}
//         <button
//           className="btn resolve"
//           onClick={handleResolve}
//           disabled={loading}
//         >
//           <FaCheck />
//           {loading ? " Processing..." : " Mark as Resolved"}
//         </button>

//         <p className="audit-text">
//           Action will be logged in the Audit Trail permanently.
//         </p>
//       </div>
//     </div>
//   );
// }



















import React, { useState } from "react";
import "./ReportDetailModal.css";
import {
  FaTimes,
  FaExclamationTriangle,
  FaTrash,
  FaCheck,
} from "react-icons/fa";

import { supabase } from "../../supabaseClient";
import { sendWarningUser } from "../../services/adminApi";

export default function ReportDetailModal({ report, onClose }) {
  const [loading, setLoading] = useState(false);
  const [warningLoading, setWarningLoading] = useState(false);
  const [signedUrl, setSignedUrl] = useState(null);

  async function handleSendWarning() {
    const confirmWarning = window.confirm(
      "Send warning to this user? Warning will stay TRUE for 5 seconds."
    );

    if (!confirmWarning) return;

    setWarningLoading(true);

    const success = await sendWarningUser(report.reported_phone);

    if (success) {
      alert("Warning sent successfully (5 seconds).");
    } else {
      alert("Failed to send warning.");
    }

    setWarningLoading(false);
  }

  if (!report) return null;

  const formattedDate = report.created_at
    ? new Date(report.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "--";

  // ✅ MARK AS RESOLVED FUNCTION - FIXED VERSION (NO MESSAGE COLUMN)
  const handleResolve = async () => {
    if (
      !window.confirm(
        "Are you sure you want to mark this report as resolved?"
      )
    ) {
      return;
    }

    setLoading(true);

    try {
      // 1️⃣ Fetch full report data
      const { data: fullReport, error: fetchError } = await supabase
        .from("user_reports")
        .select("*")
        .eq("id", report.id)
        .single();

      if (fetchError || !fullReport) {
        console.error("Fetch error:", fetchError);
        alert("❌ Failed to fetch report details");
        return;
      }

      // 2️⃣ Prepare payload WITHOUT message column
      const payload = {
        reporter_name: fullReport.reporter_name ?? null,
        reported_name: fullReport.reported_name ?? null,
        reporter_phone: fullReport.reporter_phone ?? null,
        reported_phone: fullReport.reported_phone ?? null,
        reason: fullReport.reason ? fullReport.reason : "Other",
        evidence_urls: Array.isArray(fullReport.evidence_urls)
          ? fullReport.evidence_urls
          : [],
        image_url: fullReport.image_url ?? null,
        resolved_count: 1,
      };

      // 3️⃣ Insert into resolved_user table
      const { error: insertError } = await supabase
        .from("resolved_user")
        .insert(payload);

      if (insertError) {
        console.error("INSERT ERROR =>", insertError);
        alert("❌ Insert failed: " + insertError.message);
        return;
      }

      // 4️⃣ Delete from user_reports table
      const { error: deleteError } = await supabase
        .from("user_reports")
        .delete()
        .eq("id", report.id);

      if (deleteError) {
        console.error("DELETE ERROR =>", deleteError);
        alert("❌ Delete failed: " + deleteError.message);
        return;
      }

      alert("✅ Report moved to resolved_user successfully!");
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Resolve error:", err);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveContent = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete this report permanently?"
      )
    ) {
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("user_reports")
        .delete()
        .eq("id", report.id);

      if (error) {
        console.error("Error deleting report:", error);
        alert("❌ Failed to delete report");
        return;
      }

      alert("✅ Report deleted successfully!");
      onClose();
      window.location.reload();
    } catch (err) {
      console.error("Delete error:", err);
      alert("❌ Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  
  React.useEffect(() => {
  async function loadSignedUrl() {
    if (!report?.image_url) return;

    const filePath = report.image_url.split("/object/public/")[1]; 
    // OR correct split based on your stored value

    const { data, error } = await supabase.storage
      .from("your_bucket_name")
      .createSignedUrl(filePath, 60);

    if (!error) setSignedUrl(data.signedUrl);
  }

  loadSignedUrl();
}, [report]);

return (
  <div className="report-overlay" onClick={onClose}>
    <div
      className="report-modal"
      onClick={(e) => e.stopPropagation()}
    >
        {/* HEADER */}
        <div className="report-header">
          <div>
            <h2>
              Report Detail <span className="status-badge">PENDING REVIEW</span>
            </h2>
            <p className="report-id">
              ID: #{report.id} · Reported on {formattedDate}
            </p>
          </div>
          <FaTimes className="close-icon" onClick={onClose} />
        </div>

        {/* Reporter Details */}
        <div className="section">
          <h4 className="section-title">Reporter Details</h4>
          <div className="user-card">
            <div className="avatar">
              {(
                report.reporter_name ||
                report.reporter_phone ||
                "?"
              )[0].toUpperCase()}
            </div>
            <div className="user-info">
              <h3>
                {report.reporter_name ||
                  report.reporter_phone ||
                  "Unknown Reporter"}
              </h3>
              <p className="user-meta">{report.reporter_phone || "--"}</p>
            </div>
          </div>
        </div>

{/* Reason & Description */}
<div className="section">
  <h4 className="section-title">Reason & Description</h4>

  {/* ✅ SHOW IMAGE ABOVE CATEGORY */}
  {report.image_url && (
    <div className="image-preview" style={{ marginBottom: "15px" }}>
      <img
        src={report.image_url}
        alt="evidence"
        style={{
          width: "100%",
          height: "220px",
          objectFit: "cover",
          borderRadius: "12px",
        }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    </div>
  )}

  <div className="label">Report Category</div>
  <p className="category">{report.reason || "Not Specified"}</p>

  <div className="reason-box">
    <span className="reason-title">Reported Message / Reason</span>
    <p>{report.message || "No message provided"}</p>
  </div>
</div>


        {/* Evidence Preview */}
        {report.image_url && (
          <div className="section">
            <div className="evidence-header">
              <h4 className="section-title">Evidence Preview</h4>
              <span className="attachment">1 ATTACHMENT</span>
            </div>

            <div className="image-preview">
              <img
                src={report.image_url}
                alt="evidence"
                onError={(e) => {
                  e.target.style.display = "none";
                  if (e.target.nextElementSibling) {
                    e.target.nextElementSibling.style.display = "flex";
                  }
                }}
              />
              <div
                style={{
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  background: "#f5f5f5",
                }}
              >
                <p>Image failed to load</p>
              </div>
            </div>
          </div>
        )}

        {/* Reported Account */}
        <div className="section">
          <h4 className="section-title">Account Being Reported</h4>
          <div className="user-card">
            <div className="avatar">
              {(
                report.reported_name ||
                report.reported_phone ||
                "?"
              )[0].toUpperCase()}
            </div>
            <div className="user-info">
              <h3>
                {report.reported_name ||
                  report.reported_phone ||
                  "Unknown User"}
              </h3>
              <p className="user-meta">{report.reported_phone || "--"}</p>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="action-row">
          <button
            className={`btn warning-btn ${warningLoading ? "warning-active" : ""}`}
            onClick={handleSendWarning}
            disabled={warningLoading}
          >
            <FaExclamationTriangle />
            {warningLoading ? " Warning Sent" : " Send Warning"}
          </button>

          <button
            className="btn danger-outline"
            onClick={handleRemoveContent}
            disabled={loading}
          >
            <FaTrash /> {loading ? "Removing..." : "Remove Content"}
          </button>
        </div>

        {/* ✅ RESOLVE BUTTON */}
        <button
          className="btn resolve"
          onClick={handleResolve}
          disabled={loading}
        >
          <FaCheck />
          {loading ? " Processing..." : " Mark as Resolved"}
        </button>

        <p className="audit-text">
          Action will be logged in the Audit Trail permanently.
        </p>
      </div>
    </div>
  );
}


