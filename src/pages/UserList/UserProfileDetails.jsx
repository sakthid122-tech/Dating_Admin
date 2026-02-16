// import React, { useEffect, useState } from "react";
// import "./UserProfileDetails.css";
// import { FaHeart, FaUserFriends, FaStar } from "react-icons/fa";
// import { useLocation, useNavigate } from "react-router-dom";
// import defaultAvatar from "../../assets/Housing_Post Property.png";
// import ReportDetailModal from "./ReportDetailModal";

// import {
//     getLikesReceivedCount,
//     getMatchesCount,
//     getUserReportsCount,
//     getUserReportsList,
//     suspendUser,
//     sendWarningUser,
//     getResolvedReportsCount,
//     getThisWeekUsersCount,
//     getLastWeekUsersCount,
//     getThisWeekPremiumUsersCount,
//     getLastWeekPremiumUsersCount,
//     getThisWeekActiveUsersCount,
//     getLastWeekActiveUsersCount,
//     getThisWeekVerifiedUsersCount,
//     getLastWeekVerifiedUsersCount,
// } from "../../services/adminApi";

// export default function UserProfile() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const user = location.state?.user;

//     const [activeTab, setActiveTab] = useState("overview");
//     const [likesReceived, setLikesReceived] = useState(0);
//     const [matchesCount, setMatchesCount] = useState(0);
//     const [totalReports, setTotalReports] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const [reportsList, setReportsList] = useState([]);
//     const [selectedReport, setSelectedReport] = useState(null);
//     const [warningLoading, setWarningLoading] = useState(false);
//     const [resolvedCount, setResolvedCount] = useState(0);
//     const [totalUsers, setTotalUsers] = useState(0);

//     const calculatePercentage = (current, previous) => {
//         if (previous === 0 && current > 0) return 100;
//         if (previous === 0 && current === 0) return 0;

//         return Number((((current - previous) / previous) * 100).toFixed(1));
//     };

//     const percent = calculatePercentage(7, 6);

//     const [totalUsersPercent, setTotalUsersPercent] = useState(0);
//     const [premiumUsersPercent, setPremiumUsersPercent] = useState(0);
//     const [activeTodayPercent, setActiveTodayPercent] = useState(0);
//     const [verifiedUsersPercent, setVerifiedUsersPercent] = useState(0);
//     useEffect(() => {
//         if (!user) return;

//         async function loadAllStats() {
//             setLoading(true);

//             try {
//                 const [
//                     likes,
//                     matches,
//                     reportsCount,
//                     reportsData,
//                     resolved,

//                     thisWeekUsers,
//                     lastWeekUsers,

//                     thisWeekPremium,
//                     lastWeekPremium,

//                     thisWeekActive,
//                     lastWeekActive,

//                     thisWeekVerified,
//                     lastWeekVerified,
//                 ] = await Promise.all([
//                     getLikesReceivedCount(user.email),
//                     getMatchesCount(user.email),
//                     getUserReportsCount(user.email),
//                     getUserReportsList(user.email),
//                     getResolvedReportsCount(user.email),

//                     getThisWeekUsersCount(),
//                     getLastWeekUsersCount(),

//                     getThisWeekPremiumUsersCount(),
//                     getLastWeekPremiumUsersCount(),

//                     getThisWeekActiveUsersCount(),
//                     getLastWeekActiveUsersCount(),

//                     getThisWeekVerifiedUsersCount(),
//                     getLastWeekVerifiedUsersCount(),
//                 ]);

//                 setLikesReceived(likes);
//                 setMatchesCount(matches);
//                 setTotalReports(reportsCount);
//                 setReportsList(reportsData);
//                 setResolvedCount(resolved);
//                 setTotalUsers(thisWeekUsers);


//                 // set percentages
//                 setTotalUsersPercent(calculatePercentage(thisWeekUsers, lastWeekUsers));
//                 setPremiumUsersPercent(calculatePercentage(thisWeekPremium, lastWeekPremium));
//                 setActiveTodayPercent(calculatePercentage(thisWeekActive, lastWeekActive));
//                 setVerifiedUsersPercent(calculatePercentage(thisWeekVerified, lastWeekVerified));

//             } catch (error) {
//                 console.error("Error loading stats:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         loadAllStats();
//     }, [user]);


//     console.log(percent); // +16.7%

//     // Fetch real-time data - SINGLE useEffect
//     useEffect(() => {
//         if (!user) return;

//         async function loadUserStats() {
//             setLoading(true);
//             try {
//                 const [likes, matches, reportsCount, reportsData, resolved] =
//                     await Promise.all([
//                         getLikesReceivedCount(user.email),
//                         getMatchesCount(user.email),
//                         getUserReportsCount(user.email),
//                         getUserReportsList(user.email),
//                         getResolvedReportsCount(user.email),
//                     ]);

//                 setLikesReceived(likes);
//                 setMatchesCount(matches);
//                 setTotalReports(reportsCount);
//                 setReportsList(reportsData);
//                 setResolvedCount(resolved);
//             } catch (error) {
//                 console.error("Error loading user stats:", error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         loadUserStats();
//     }, [user]);

//     function formatTimeAgo(dateString) {
//         if (!dateString) return "Never";

//         const date = new Date(dateString);
//         const now = new Date();
//         const diffMs = now - date;

//         const minutes = Math.floor(diffMs / (1000 * 60));
//         const hours = Math.floor(diffMs / (1000 * 60 * 60));
//         const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//         if (minutes < 60) return `${minutes} minutes ago`;
//         if (hours < 24) return `${hours} hours ago`;
//         return `${days} days ago`;
//     }

//     function formatDate(dateString) {
//         if (!dateString) return "--";
//         return new Date(dateString).toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "short",
//             day: "numeric",
//         });
//     }

//     async function handleSuspend() {
//         const confirmSuspend = window.confirm(
//             "Are you sure you want to suspend this account for 7 days?"
//         );

//         if (!confirmSuspend) return;

//         const success = await suspendUser(user.email);

//         if (success) {
//             alert("User suspended for 7 days.");
//             window.location.reload();
//         } else {
//             alert("Failed to suspend user.");
//         }
//     }

//     async function handleSendWarning() {
//         const confirmWarning = window.confirm(
//             "Send warning to this user? Warning will stay TRUE for 5 seconds."
//         );

//         if (!confirmWarning) return;

//         setWarningLoading(true);

//         const success = await sendWarningUser(user.email);

//         if (success) {
//             alert("Warning sent successfully (5 seconds).");
//         } else {
//             alert("Failed to send warning.");
//         }

//         setWarningLoading(false);
//     }

//     function getUserStatus(user) {
//         if (user.is_suspended) return "SUSPENDED";

//         if (!user.last_seen) return "INACTIVE";

//         const lastSeenDate = new Date(user.last_seen);
//         const sevenDaysAgo = new Date();
//         sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//         return lastSeenDate >= sevenDaysAgo ? "ACTIVE" : "INACTIVE";
//     }

//     // Helper function to determine priority
//     const getPriorityFromReason = (reason) => {
//         if (!reason) return { label: "Medium", className: "medium" };

//         const highPriority = [
//             "Harassment",
//             "Threats",
//             "Unsolicited Explicit Content",
//             "Offensive Language",
//         ];

//         const mediumPriority = [
//             "Catfishing",
//             "AI Generated",
//             "Fake Profile",
//             "Other",
//         ];

//         const lowPriority = ["Spam", "Violation of Terms"];

//         if (highPriority.includes(reason)) {
//             return { label: "High", className: "high" };
//         }

//         if (mediumPriority.includes(reason)) {
//             return { label: "Medium", className: "medium" };
//         }

//         if (lowPriority.includes(reason)) {
//             return { label: "Low", className: "low" };
//         }

//         return { label: "Medium", className: "medium" };
//     };

//     if (!user) {
//         return (
//             <div className="page">
//                 <div className="error-container">
//                     <h2>No User Data Found</h2>
//                     <button
//                         className="btn-primary"
//                         onClick={() => navigate("/users")}
//                     >
//                         Go Back to Users
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // Critical (High) Reports Count
//     const criticalReportsCount = reportsList.filter((report) => {
//         const priority = getPriorityFromReason(report.reason);
//         return priority.label === "High";
//     }).length;

//     const profileImage =
//         Array.isArray(user.photos) && user.photos.length > 0
//             ? user.photos[0]
//             : user.photos || defaultAvatar;


//     return (
//         <div className="page">
//             {/* Breadcrumb */}
//             <div className="breadcrumb">Users List &gt; {user.nickname}</div>

//             {/* Top Profile Card */}
//             <div className="profile-card">
//                 <div className="profile-left">
//                     <div className="avatar-wrapper">
//                         <img
//                             src={profileImage}
//                             alt="profile"
//                             className="avatar"
//                             onError={(e) => {
//                                 e.target.src = defaultAvatar;
//                             }}
//                         />
//                         <span className="online-dot"></span>
//                     </div>

//                     <div className="profile-info">
//                         <h2 className="name">{user.nickname || "Unknown User"}</h2>

//                         <div className="badges-row">
//                             <span
//                                 className={`status-badge ${getUserStatus(user).toLowerCase()}`}
//                             >
//                                 {getUserStatus(user)}
//                             </span>
//                             {user.subscription === "premium" && (
//                                 <span className="premium-badge">★ PREMIUM</span>
//                             )}
//                         </div>

//                         <p className="email">
//                             ✉ {user.email} <span className="divider">|</span>{" "}
//                             {user.verified ? "Verified Member" : "Not Verified"}
//                         </p>

//                         <p className="meta">
//                             Account created: {formatDate(user.created_at)} · Last
//                             active: {formatTimeAgo(user.last_seen)}
//                         </p>
//                     </div>
//                 </div>

//                 <div className="profile-actions">
//                     <button
//                         className="btn light"
//                         onClick={handleSendWarning}
//                         disabled={warningLoading}
//                     >
//                         {warningLoading ? "Sending..." : "⚠ Send Warning"}
//                     </button>
//                     <button className="btn danger" onClick={handleSuspend}>
//                         ⛔ Suspend Account
//                     </button>
//                 </div>
//             </div>

//             {/* Tabs */}
//             <div className="tabs">
//                 <span
//                     className={activeTab === "overview" ? "active-tab" : ""}
//                     onClick={() => setActiveTab("overview")}
//                 >
//                     Overview
//                 </span>
//                 <span
//                     className={activeTab === "photos" ? "active-tab" : ""}
//                     onClick={() => setActiveTab("photos")}
//                 >
//                     Profile Photos
//                 </span>
//                 <span
//                     className={activeTab === "logs" ? "active-tab" : ""}
//                     onClick={() => setActiveTab("logs")}
//                 >
//                     Reports & Logs
//                 </span>
//             </div>

//             <div className="content">
//                 {/* LEFT SECTION */}
//                 <div className="left-section">
//                     {/* Personal Details Card */}
//                     {activeTab === "overview" && (
//                         <div className="personal-card">
//                             <div className="card-header">
//                                 <div className="title">Personal Details</div>
//                                 <div className="edit">
//                                     <span className="edit-icon">✏</span>
//                                     Edit Details
//                                 </div>
//                             </div>

//                             <div className="divider"></div>

//                             <div className="details-grid">
//                                 <div className="detail-item">
//                                     <div className="label">AGE & GENDER</div>
//                                     <div className="value">
//                                         {user.age ?? "--"}, {user.gender ?? "--"}
//                                     </div>
//                                 </div>

//                                 <div className="detail-item">
//                                     <div className="label">LOCATION</div>
//                                     <div className="value">{user.location ?? "--"}</div>
//                                 </div>

//                                 <div className="detail-item">
//                                     <div className="label">OCCUPATION</div>
//                                     <div className="value">{user.job ?? "--"}</div>
//                                 </div>

//                                 <div className="detail-item">
//                                     <div className="label">EDUCATION</div>
//                                     <div className="value">{user.education ?? "--"}</div>
//                                 </div>
//                             </div>

//                             <div className="bio-section">
//                                 <div className="label">BIO</div>
//                                 <div className="bio-box">
//                                     {user.about ?? "No bio available"}
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Photo Moderation Tab */}
//                     {activeTab === "photos" && (
//                         <div className="photo-moderation-card">
//                             <div className="photo-header">
//                                 <h3>Photo Moderation</h3>
//                                 <span className="total-text">
//                                     Total{" "}
//                                     {Array.isArray(user.photos) ? user.photos.length : 0}{" "}
//                                     photos
//                                 </span>
//                             </div>

//                             <div className="photo-grid">
//                                 {Array.isArray(user.photos) &&
//                                     user.photos.map((photo, index) => (
//                                         <div
//                                             key={index}
//                                             className={`photo-box ${index === 0 ? "approved" : "pending"
//                                                 }`}
//                                         >
//                                             <img
//                                                 src={photo}
//                                                 alt={`User photo ${index + 1}`}
//                                                 onError={(e) => {
//                                                     e.target.src = defaultAvatar;
//                                                 }}
//                                             />
//                                             {index === 0 && (
//                                                 <span className="approved-badge">
//                                                     APPROVED
//                                                 </span>
//                                             )}
//                                         </div>
//                                     ))}

//                                 {/* Empty slots */}
//                                 {[
//                                     ...Array(
//                                         Math.max(0, 6 - (user.photos?.length || 0))
//                                     ),
//                                 ].map((_, i) => (
//                                     <div key={`empty-${i}`} className="photo-box empty">
//                                         <div className="empty-icon">📷</div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     {/* Reports & Logs Tab */}
//                     {activeTab === "logs" && (
//                         <div className="reports-container">
//                             <div className="reports-header">
//                                 <div>
//                                     <h2>Reports & Logs</h2>
//                                     <p>
//                                         Reviewing {totalReports} incidents associated with
//                                         this account.
//                                     </p>
//                                 </div>
//                                 <div className="header-actions">
//                                     <button className="filter-btn">Filter</button>
//                                     <button className="export-btn">Export PDF</button>
//                                 </div>
//                             </div>

//                             {/* Stats Row */}
//                             <div className="report-stats">
//                                 <div className="stat-card">
//                                     <span className={`percent ${totalUsersPercent >= 0 ? "green" : "red"}`}>
//                                         {totalUsersPercent > 0 ? "+" : ""}
//                                         {totalUsersPercent}%
//                                     </span>
//                                     <h2>{totalUsers}</h2>
//                                     <p>Total Users</p>
//                                 </div>


//                                 <div className="stat-card pending">
//                                     <h4>Pending Review</h4>
//                                     <h2>{totalReports}</h2>
//                                 </div>

//                                 <div className="stat-card resolved">
//                                     <h4>Resolved</h4>
//                                     <h2>{loading ? "..." : resolvedCount}</h2>
//                                 </div>

//                                 <div className="stat-card critical">
//                                     <h4>Critical Reports</h4>
//                                     <h2>{loading ? "..." : criticalReportsCount}</h2>
//                                 </div>
//                             </div>

//                             <div className="reports-table">
//                                 <div className="table-header">
//                                     <span>Report ID</span>
//                                     <span>Reported By</span>
//                                     <span>Reason</span>
//                                     <span>Message</span>
//                                     <span>Date</span>
//                                     <span>Status</span>
//                                     <span>Priority</span>
//                                     <span>Action</span>
//                                 </div>

//                                 {loading ? (
//                                     <div className="table-row">
//                                         <span colSpan="8">Loading reports...</span>
//                                     </div>
//                                 ) : reportsList.length === 0 ? (
//                                     <div className="table-row">
//                                         <span colSpan="8">No reports found</span>
//                                     </div>
//                                 ) : (
//                                     reportsList.map((report, index) => {
//                                         const priority =
//                                             getPriorityFromReason(report.reason);

//                                         return (
//                                             <div className="table-row" key={report.id}>
//                                                 <span>#REP-{index + 1}</span>
//                                                 <span>
//                                                     {report.reporter_phone || "Unknown"}
//                                                 </span>
//                                                 <span className="badge red">
//                                                     {report.reason || "N/A"}
//                                                 </span>
//                                                 <span>
//                                                     {report.message ?? "No Message"}
//                                                 </span>
//                                                 <span>
//                                                     {report.created_at
//                                                         ? new Date(
//                                                             report.created_at
//                                                         ).toLocaleDateString()
//                                                         : "--"}
//                                                 </span>
//                                                 <span className="status pending-dot">
//                                                     Pending
//                                                 </span>

//                                                 {/* Priority Badge */}
//                                                 <span
//                                                     className={`badge ${priority.className}`}
//                                                 >
//                                                     {priority.label}
//                                                 </span>

//                                                 <span
//                                                     className="eye"
//                                                     onClick={() =>
//                                                         setSelectedReport(report)
//                                                     }
//                                                     style={{ cursor: "pointer" }}
//                                                 >
//                                                     👁
//                                                 </span>
//                                             </div>
//                                         );
//                                     })
//                                 )}
//                             </div>

//                             {/* Pagination */}
//                             <div className="pagination">
//                                 <button className="page active">1</button>
//                                 <button className="page">2</button>
//                                 <button className="page">3</button>
//                             </div>

//                             {/* Footer */}
//                             <div className="reports-footer">
//                                 <span>Moderated by 3 team members today.</span>
//                                 <div className="trust-score">
//                                     Account Trust Score: <strong>94/100</strong>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* RIGHT SECTION */}
//                 <div className="right-section">
//                     <div className="card">
//                         <h4>ENGAGEMENT OVERVIEW</h4>

//                         <div className="stat">
//                             <FaHeart className="icon pink" />
//                             <div>
//                                 <h3>{loading ? "..." : likesReceived}</h3>
//                                 <p>Likes Received</p>
//                             </div>
//                         </div>

//                         <div className="stat">
//                             <FaUserFriends className="icon blue" />
//                             <div>
//                                 <h3>{loading ? "..." : matchesCount}</h3>
//                                 <p>Matches</p>
//                             </div>
//                         </div>

//                         <div className="stat">
//                             <FaStar className="icon gold" />
//                             <div>
//                                 <h3>{user.subscription || "Free"}</h3>
//                                 <p>Subscription Tier</p>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="trust-card">
//                         <h4>VERIFICATION</h4>
//                         <h2>{user.verified ? "✓ Verified" : "✗ Not Verified"}</h2>
//                         <p>User verification status from Supabase.</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Report Detail Modal */}
//             {selectedReport && (
//                 <ReportDetailModal
//                     report={selectedReport}
//                     onClose={() => setSelectedReport(null)}
//                 />
//             )}
//         </div>
//     );
// }




import React, { useEffect, useState } from "react";
import "./UserProfileDetails.css";
import { FaHeart, FaUserFriends, FaStar } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import defaultAvatar from "../../assets/Housing_Post Property.png";
import ReportDetailModal from "./ReportDetailModal";

import {
    getLikesReceivedCount,
    getMatchesCount,
    getUserReportsCount,
    getUserReportsList,
    suspendUser,
    sendWarningUser,
    getResolvedReportsCount,
    getThisWeekUsersCount,
    getLastWeekUsersCount,
    getThisWeekPremiumUsersCount,
    getLastWeekPremiumUsersCount,
    getThisWeekActiveUsersCount,
    getLastWeekActiveUsersCount,
    getThisWeekVerifiedUsersCount,
    getLastWeekVerifiedUsersCount,
} from "../../services/adminApi";

export default function UserProfile() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state?.user;

    const [activeTab, setActiveTab] = useState("overview");
    const [likesReceived, setLikesReceived] = useState(0);
    const [matchesCount, setMatchesCount] = useState(0);
    const [totalReports, setTotalReports] = useState(0);
    const [loading, setLoading] = useState(true);
    const [reportsList, setReportsList] = useState([]);
    const [selectedReport, setSelectedReport] = useState(null);
    const [warningLoading, setWarningLoading] = useState(false);
    const [resolvedCount, setResolvedCount] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);

    const calculatePercentage = (current, previous) => {
        if (previous === 0 && current > 0) return 100;
        if (previous === 0 && current === 0) return 0;

        return Number((((current - previous) / previous) * 100).toFixed(1));
    };

    const [totalUsersPercent, setTotalUsersPercent] = useState(0);
    const [premiumUsersPercent, setPremiumUsersPercent] = useState(0);
    const [activeTodayPercent, setActiveTodayPercent] = useState(0);
    const [verifiedUsersPercent, setVerifiedUsersPercent] = useState(0);

    useEffect(() => {
        if (!user) return;

        async function loadAllStats() {
            setLoading(true);

            try {
                const [
                    likes,
                    matches,
                    reportsCount,
                    reportsData,
                    resolved,
                    thisWeekUsers,
                    lastWeekUsers,
                    thisWeekPremium,
                    lastWeekPremium,
                    thisWeekActive,
                    lastWeekActive,
                    thisWeekVerified,
                    lastWeekVerified,
                ] = await Promise.all([
                    getLikesReceivedCount(user.email),
                    getMatchesCount(user.email),
                    getUserReportsCount(user.email),
                    getUserReportsList(user.email),
                    getResolvedReportsCount(user.email),
                    getThisWeekUsersCount(),
                    getLastWeekUsersCount(),
                    getThisWeekPremiumUsersCount(),
                    getLastWeekPremiumUsersCount(),
                    getThisWeekActiveUsersCount(),
                    getLastWeekActiveUsersCount(),
                    getThisWeekVerifiedUsersCount(),
                    getLastWeekVerifiedUsersCount(),
                ]);

                setLikesReceived(likes);
                setMatchesCount(matches);
                setTotalReports(reportsCount);
                setReportsList(reportsData);
                setResolvedCount(resolved);
                setTotalUsers(thisWeekUsers);

                setTotalUsersPercent(calculatePercentage(thisWeekUsers, lastWeekUsers));
                setPremiumUsersPercent(calculatePercentage(thisWeekPremium, lastWeekPremium));
                setActiveTodayPercent(calculatePercentage(thisWeekActive, lastWeekActive));
                setVerifiedUsersPercent(calculatePercentage(thisWeekVerified, lastWeekVerified));
            } catch (error) {
                console.error("Error loading stats:", error);
            } finally {
                setLoading(false);
            }
        }

        loadAllStats();
    }, [user]);

    function formatTimeAgo(dateString) {
        if (!dateString) return "Never";

        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;

        const minutes = Math.floor(diffMs / (1000 * 60));
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (minutes < 60) return `${minutes} minutes ago`;
        if (hours < 24) return `${hours} hours ago`;
        return `${days} days ago`;
    }

    function formatDate(dateString) {
        if (!dateString) return "--";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }

    async function handleSuspend() {
        const confirmSuspend = window.confirm(
            "Are you sure you want to suspend this account for 7 days?"
        );

        if (!confirmSuspend) return;

        const success = await suspendUser(user.email);

        if (success) {
            alert("User suspended for 7 days.");
            window.location.reload();
        } else {
            alert("Failed to suspend user.");
        }
    }

    async function handleSendWarning() {
        const confirmWarning = window.confirm(
            "Send warning to this user? Warning will stay TRUE for 5 seconds."
        );

        if (!confirmWarning) return;

        setWarningLoading(true);

        const success = await sendWarningUser(user.email);

        if (success) {
            alert("Warning sent successfully (5 seconds).");
        } else {
            alert("Failed to send warning.");
        }

        setWarningLoading(false);
    }

    function getUserStatus(user) {
        if (user.is_suspended) return "SUSPENDED";

        if (!user.last_seen) return "INACTIVE";

        const lastSeenDate = new Date(user.last_seen);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        return lastSeenDate >= sevenDaysAgo ? "ACTIVE" : "INACTIVE";
    }

    const getPriorityFromReason = (reason) => {
        if (!reason) return { label: "Medium", className: "medium" };

        const highPriority = [
            "Harassment",
            "Threats",
            "Unsolicited Explicit Content",
            "Offensive Language",
        ];

        const mediumPriority = [
            "Catfishing",
            "AI Generated",
            "Fake Profile",
            "Other",
        ];

        const lowPriority = ["Spam", "Violation of Terms"];

        if (highPriority.includes(reason)) {
            return { label: "High", className: "high" };
        }

        if (mediumPriority.includes(reason)) {
            return { label: "Medium", className: "medium" };
        }

        if (lowPriority.includes(reason)) {
            return { label: "Low", className: "low" };
        }

        return { label: "Medium", className: "medium" };
    };

    if (!user) {
        return (
            <div className="page">
                <div className="error-container">
                    <h2>No User Data Found</h2>
                    <button
                        className="btn-primary"
                        onClick={() => navigate("/users")}
                    >
                        Go Back to Users
                    </button>
                </div>
            </div>
        );
    }

    const criticalReportsCount = reportsList.filter((report) => {
        const priority = getPriorityFromReason(report.reason);
        return priority.label === "High";
    }).length;

    const profileImage =
        Array.isArray(user.photos) && user.photos.length > 0
            ? user.photos[0]
            : user.photos || defaultAvatar;

    return (
        <div className="user-profile-page">
            {/* Breadcrumb */}
            <div className="breadcrumb">
                <span className="breadcrumb-link">Users List</span>
                <span className="breadcrumb-separator">›</span>
                <span className="breadcrumb-current">{user.nickname}</span>
            </div>

            {/* Profile Header Card */}
            <div className="profile-header-card">
                <div className="profile-header-left">
                    <div className="avatar-container">
                        <img
                            src={profileImage}
                            alt="profile"
                            className="profile-avatar"
                            onError={(e) => {
                                e.target.src = defaultAvatar;
                            }}
                        />
                        <span className="online-indicator"></span>
                    </div>

                    <div className="profile-header-info">
                        <h1 className="profile-name">{user.nickname || "Unknown User"}</h1>

                        <div className="profile-badges">
                            <span className={`status-badge status-${getUserStatus(user).toLowerCase()}`}>
                                {getUserStatus(user)}
                            </span>
                            {user.subscription === "premium" && (
                                <span className="premium-badge">
                                    <span className="premium-star">★</span> PREMIUM
                                </span>
                            )}
                        </div>

                        <div className="profile-email-row">
                            <span className="email-text">✉ {user.email}</span>
                            <span className="divider-dot">|</span>
                            <span className="verification-text">
                                {user.verified ? "✓ Verified Member" : "Verified"}
                            </span>
                        </div>

                        <div className="profile-meta-text">
                            Account created {formatDate(user.created_at)} · Last active {formatTimeAgo(user.last_seen)}
                        </div>
                    </div>
                </div>

                <div className="profile-header-actions">
                    <button
                        className="action-btn warni-btn"
                        onClick={handleSendWarning}
                        disabled={warningLoading}
                    >
                        <span className="btn-ion">⚠</span>
                        {warningLoading ? "Sending..." : "Send Warning"}
                    </button>

                    <button className="action-btn suspend-btn" onClick={handleSuspend}>
                        <span className="btn-icon">⛔</span>
                        Suspend Account
                    </button>
                </div>
            </div>

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "40px",
    padding: "14px 24px",
    backgroundColor: "#f3f4f6",
    borderBottom: "1px solid #e5e7eb",
  }}
>
  {/* Overview */}
  <button
    onClick={() => setActiveTab("overview")}
    style={{
      background: "none",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "15px",
      fontWeight: activeTab === "overview" ? "600" : "500",
      color: activeTab === "overview" ? "#111827" : "#6b7280",
      paddingBottom: "10px",
      borderBottom:
        activeTab === "overview"
          ? "3px solid #111827"
          : "3px solid transparent",
      cursor: "pointer",
    }}
  >
    <span style={{ fontSize: "18px" }}>👤</span>
    Overview
  </button>

  {/* Profile Photos */}
  <button
    onClick={() => setActiveTab("photos")}
    style={{
      background: "none",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "15px",
      fontWeight: activeTab === "photos" ? "600" : "500",
      color: activeTab === "photos" ? "#111827" : "#6b7280",
      paddingBottom: "10px",
      borderBottom:
        activeTab === "photos"
          ? "3px solid #111827"
          : "3px solid transparent",
      cursor: "pointer",
    }}
  >
    <span style={{ fontSize: "18px" }}>🖼</span>
    Profile Photos
    <span
      style={{
        backgroundColor: "#e5e7eb",
        color: "#374151",
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "999px",
        fontWeight: "600",
      }}
    >
      {Array.isArray(user.photos) ? user.photos.length : 0} 
    </span>
  </button>

  {/* Reports & Logs */}
  <button
    onClick={() => setActiveTab("logs")}
    style={{
      background: "none",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "15px",
      fontWeight: activeTab === "logs" ? "600" : "500",
      color: activeTab === "logs" ? "#111827" : "#6b7280",
      paddingBottom: "10px",
      borderBottom:
        activeTab === "logs"
          ? "3px solid #111827"
          : "3px solid transparent",
      cursor: "pointer",
    }}
  >
    <span style={{ fontSize: "18px" }}>📋</span>
    Reports & Logs
    <span
      style={{
        backgroundColor: "#fecaca",
        color: "#b91c1c",
        fontSize: "12px",
        padding: "2px 8px",
        borderRadius: "999px",
        fontWeight: "600",
      }}
    >
      {totalReports}
    </span>
  </button>
</div>
            {/* Main Content Grid */}
            <div className="profile-content-grid">
                {/* LEFT COLUMN */}
                <div className="profile-left-column">
                    {/* OVERVIEW TAB */}
                    {activeTab === "overview" && (
                        <div className="details-card">
                            <div className="card-header-row">
                                <h3 className="card-title">Personal Details</h3>
                                <button className="edit-details-btn">
                                    <span className="edit-icon">✏</span>
                                    Edit Details
                                </button>
                            </div>

                            <div className="details-grid">
                                <div className="detail-group">
                                    <div className="detail-label">AGE & GENDER</div>
                                    <div className="detail-value">
                                        {user.age ?? "--"}, {user.gender ?? "--"}
                                    </div>
                                </div>

                                <div className="detail-group">
                                    <div className="detail-label">LOCATION</div>
                                    <div className="detail-value">{user.location ?? "--"}</div>
                                </div>

                                <div className="detail-group">
                                    <div className="detail-label">OCCUPATION</div>
                                    <div className="detail-value">{user.job ?? "--"}</div>
                                </div>

                                <div className="detail-group">
                                    <div className="detail-label">EDUCATION</div>
                                    <div className="detail-value">{user.education ?? "--"}</div>
                                </div>
                            </div>

                            <div className="bio-section">
                                <div className="detail-label">BIO</div>
                                <div className="bio-content">
                                    {user.about ?? "No bio available"}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* PHOTOS TAB */}
                    {activeTab === "photos" && (
                        <div className="photos-card">
                            <div className="card-header-row">
                                <h3 className="card-title">Photo Moderation</h3>
                                <span className="photos-count-text">
                                    Total {Array.isArray(user.photos) ? user.photos.length : 0} photos
                                </span>
                            </div>

                            <div className="photos-grid">
                                {Array.isArray(user.photos) &&
                                    user.photos.map((photo, index) => (
                                        <div key={index} className="photo-slot">
                                            <img
                                                src={photo}
                                                alt={`User photo ${index + 1}`}
                                                className="photo-image"
                                                onError={(e) => {
                                                    e.target.src = defaultAvatar;
                                                }}
                                            />
                                            {index === 0 && (
                                                <div className="approved-badge">APPROVED</div>
                                            )}
                                        </div>
                                    ))}

                                {[...Array(Math.max(0, 6 - (user.photos?.length || 0)))].map((_, i) => (
                                    <div key={`empty-${i}`} className="photo-slot photo-empty">
                                        <div className="empty-photo-icon">🖼</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* REPORTS TAB */}
                    {activeTab === "logs" && (
                        <div className="reports-section">
                            <div className="reports-header">
                                <div className="reports-header-text">
                                    <h2 className="reports-title">Reports & Logs</h2>
                                    <p className="reports-subtitle">
                                        Reviewing {totalReports} incidents associated with this account.
                                    </p>
                                </div>
                                <div className="reports-header-actions">
                                    <button className="reports-action-btn">
                                        <span className="btn-icon">⚙</span>
                                        Filter
                                    </button>
                                    <button className="reports-action-btn">
                                        <span className="btn-icon">⬇</span>
                                        Export PDF
                                    </button>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="reports-stats-grid">
                                <div className="stat-box">
                                    <div className="stat-header">Total Reports</div>
                                    <div className="stat-number">{totalReports}</div>
                                    <div className="stat-icon stat-icon-blue">📄</div>
                                </div>

                                <div className="stat-box">
                                    <div className="stat-header">Pending Review</div>
                                    <div className="stat-number stat-number-orange">{totalReports - resolvedCount}</div>
                                    <div className="stat-icon stat-icon-orange">⏳</div>
                                </div>

                                <div className="stat-box">
                                    <div className="stat-header">Resolved</div>
                                    <div className="stat-number stat-number-green">{loading ? "..." : resolvedCount}</div>
                                    <div className="stat-icon stat-icon-green">✓</div>
                                </div>

                                <div className="stat-box">
                                    <div className="stat-header">Critical Reports</div>
                                    <div className="stat-number stat-number-red">{loading ? "..." : criticalReportsCount}</div>
                                    <div className="stat-icon stat-icon-red">⚠</div>
                                </div>
                            </div>

                            {/* Reports Table */}
                            <div className="reports-table-container">
                                <div className="reports-table">
                                    <div className="table-header-row">
                                        <div className="table-cell">Report ID</div>
                                        <div className="table-cell">Reported By</div>
                                        <div className="table-cell">Reason</div>
                                        <div className="table-cell">Content Type</div>
                                        <div className="table-cell">Date</div>
                                        <div className="table-cell">Status</div>
                                        <div className="table-cell">Priority</div>
                                        <div className="table-cell">Action</div>
                                    </div>

                                    {loading ? (
                                        <div className="table-empty-row">Loading reports...</div>
                                    ) : reportsList.length === 0 ? (
                                        <div className="table-empty-row">No reports found</div>
                                    ) : (
                                        reportsList.map((report, index) => {
                                            const priority = getPriorityFromReason(report.reason);

                                            return (
                                                <div className="table-data-row" key={report.id}>
                                                    <div className="table-cell">
                                                        <span className="report-id">#REP-{String(8821 + index).padStart(4, '0')}</span>
                                                    </div>
                                                    <div className="table-cell">
                                                        <div className="reporter-info">
                                                            <div className="reporter-avatar">
                                                                {(report.reporter_phone || "U").substring(0, 2).toUpperCase()}
                                                            </div>
                                                            <span className="reporter-name">
                                                                {report.reporter_phone || "Unknown"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="table-cell">
                                                        <span className={`reason-badge reason-${priority.className}`}>
                                                            {report.reason || "N/A"}
                                                        </span>
                                                    </div>
                                                    <div className="table-cell">
                                                        <div className="content-type">
                                                            <span className="content-icon">💬</span>
                                                            {report.message ? "Chat Message" : "Profile Bio"}
                                                        </div>
                                                    </div>
                                                    <div className="table-cell">
                                                        <div className="date-info">
                                                            {report.created_at
                                                                ? new Date(report.created_at).toLocaleDateString("en-US", {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    year: "numeric"
                                                                })
                                                                : "--"}
                                                            <div className="time-info">
                                                                {report.created_at
                                                                    ? new Date(report.created_at).toLocaleTimeString("en-US", {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit"
                                                                    })
                                                                    : ""}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="table-cell">
                                                        <span className="status-badge-table status-pending">
                                                            <span className="status-dot"></span>
                                                            Pending
                                                        </span>
                                                    </div>
                                                    <div className="table-cell">
                                                        <span className={`priority-badge priority-${priority.className}`}>
                                                            {priority.label}
                                                        </span>
                                                    </div>
                                                    <div className="table-cell">
                                                        <button
                                                            className="view-action-btn"
                                                            onClick={() => setSelectedReport(report)}
                                                        >
                                                            👁
                                                        </button>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            </div>

                           
                        </div>
                    )}
                </div>

{/* RIGHT COLUMN */}
{activeTab !== "logs" && (
  <div className="profile-right-column">
    <div className="engagement-card">
      <h4 className="engagement-title">ENGAGEMENT OVERVIEW</h4>

      <div className="engagement-stat">
        <div className="engagement-icon-wrapper pink-icon">
          <FaHeart className="engagement-icon" />
        </div>
        <div className="engagement-stat-info">
          <div className="engagement-number">
            {loading ? "..." : likesReceived.toLocaleString()}
          </div>
          <div className="engagement-label">Likes Received</div>
          <div className="engagement-percent positive">+12%</div>
        </div>
      </div>

      <div className="engagement-stat">
        <div className="engagement-icon-wrapper blue-icon">
          <FaUserFriends className="engagement-icon" />
        </div>
        <div className="engagement-stat-info">
          <div className="engagement-number">{loading ? "..." : matchesCount}</div>
          <div className="engagement-label">Matches</div>
          <div className="engagement-percent positive">+5%</div>
        </div>
      </div>

      <div className="engagement-stat">
        <div className="engagement-icon-wrapper gold-icon">
          <FaStar className="engagement-icon" />
        </div>
        <div className="engagement-stat-info">
          <div className="engagement-number">Gold</div>
          <div className="engagement-label">Subscription Tier</div>
          <div className="engagement-date">Ends 12/24</div>
        </div>
      </div>
    </div>

    <div className="preferences-card">
      <h4 className="preferences-title">DISCOVERY PREFERENCES</h4>

      <div className="preference-section">
        <div className="preference-label-small">Interested in</div>
        <div className="preference-pills">
          <span className="preference-pill">Men</span>
          <span className="preference-pill">Age 25-35</span>
        </div>
      </div>

      <div className="preference-section">
        <div className="preference-label-small">Distance Range</div>
        <div className="distance-slider">
          <div className="slider-track">
            <div className="slider-fill" style={{ width: "60%" }}></div>
            <div className="slider-thumb" style={{ left: "60%" }}></div>
          </div>
          <div className="distance-value">30 mi</div>
        </div>
      </div>

      <div className="preference-section">
        <div className="preference-label-small">Hobbies</div>
        <div className="hobby-pills">
          <span className="hobby-pill">HIKING</span>
          <span className="hobby-pill">PHOTOGRAPHY</span>
          <span className="hobby-pill">COOKING</span>
          <span className="hobby-pill">TRAVEL</span>
        </div>
      </div>
    </div>
  </div>
)}

            </div>

            {/* Report Detail Modal */}
            {selectedReport && (
                <ReportDetailModal
                    report={selectedReport}
                    onClose={() => setSelectedReport(null)}
                />
            )}
        </div>
    );
}