// import { useEffect, useState } from "react";
// import {
  
//     getTotalUsers,
//     getTotalSubscription,
//     getVerifiedUsers,
// } from "../../services/adminApi";
// import { supabase } from "../../supabaseClient";
// import { BsEye } from "react-icons/bs";
// import { BiBlock } from "react-icons/bi";

// export default function UsersLegacy() {







//     const USERS_PER_PAGE = 10;

//     const [users, setUsers] = useState([]);
//     const [page, setPage] = useState(1);
//     const [totalUsers, setTotalUsers] = useState(0);
//     const [totalsubscription, setTotalSubscription] = useState(0);
//     const [verifiedUsers, setVerifiedUsers] = useState(0);
//     const [loading, setLoading] = useState(true);
//     const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

//     useEffect(() => {
//         async function loadData() {
//             setLoading(true);

//             const [
//                 usersData,
//                 usersCount,
//                 subscriptions,
//                 verified,
//             ] = await Promise.all([
//                 getUsersLegacy(page, USERS_PER_PAGE), // 🔥 paginated DB query
//                 getTotalUsers(),
//                 getTotalSubscription(),
//                 getVerifiedUsers(),
//             ]);

//             setUsers(usersData);
//             setTotalUsers(usersCount);
//             setTotalSubscription(subscriptions);
//             setVerifiedUsers(verified);

//             setLoading(false);
//         }

//         loadData();
//     }, [page]);




//     async function getUsersLegacy(page = 1, limit = 10) {
//         const from = (page - 1) * limit;
//         const to = from + limit - 1;

//         const { data, error } = await supabase
//             .from("users")
//             .select(`
//           id,
//           nickname,
//           age,
//        location,
          
//           last_seen,
//           is_verified
//         `)
//             .order("last_seen", { ascending: false })
//             .range(from, to);

//         if (error) {
//             console.error("Error fetching users:", error);
//             return [];
//         }

//         // ✅ Hardcoded subscription
//         return data.map((user) => ({
//             id: user.id,
//             nickname: user.nickname,
//             age: user.age,
//             location:user.location,
//             status: "active",
//             subscription: "free", // 👈 hardcoded
//             last_active: user.last_seen
//                 ? new Date(user.last_seen).toLocaleDateString()
//                 : "—",
//             verified: user.is_verified,
//         }));
//     }
//     return (
//         <div className="users-page">
//             {/* Header */}
//             <h1 className="page-title">Users Management</h1>
//             <p className="page-subtitle">
//                 view and manage all the users on the platform
//             </p>
//             <input
//                 type="text"
//                 placeholder="Search by name,phone,or location..."
//             />
//             {/* Stats */}
//             <div className="stats-grid">
//                 <StatCard label="Total Users" value={totalUsers.toLocaleString()} trend="+12.5%" />
//                 <StatCard label="Premium Users" value={totalsubscription.toLocaleString()} trend="+8.2%" />
//                 <StatCard label="Active Today" value="23,456" trend="+15.3%" />
//                 <StatCard
//                     label="Verified Users"
//                     value={(verifiedUsers ?? 0).toLocaleString()}
//                     trend="+5.7%"
//                 />


//             </div>

//             {/* Table */}
//             <div className="table-card">
//                 {loading ? (
//                     <p>Loading users...</p>
//                 ) : (
//                     <table className="users-table">
//                         <thead>
//                             <tr>
//                                 <th>USER</th>
//                                 <th>AGE</th>
//                                 <th>LOCATION</th>
//                                 <th>STATUS</th>
//                                 <th>VERIFIED</th>

//                                 <th>LAST ACTIVE</th>
//                                 <th>ACTIONS</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {users.map((user) => (

//                                 <tr key={user.id}>
//                                     <td>
//                                         <div className="user-cell">
//                                             <div className="avatar">
//                                                 {user.nickname?.[0]?.toUpperCase()}
//                                             </div>
//                                             <div>
//                                                 <div className="username">{user.nickname}</div>
//                                                 {user.verified && (
//                                                     <span className="verified">Verified</span>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </td>

//                                     <td className="muted">{user.age}</td>
//      <td className="muted">{user.location}</td>
//                                     <td>
//                                         <span className={`status ${user.status}`}>
//                                             {user.status}
//                                         </span>
//                                     </td>

//                                     <td>
//                                         {user.subscription === "premium" ? (
//                                             <span className="premium">👑 Premium</span>
//                                         ) : (
//                                             <span className="muted">Free</span>
//                                         )}
//                                     </td>

//                                     <td className="muted">{user.last_active}</td>

//                                     <td className="view-link"><BsEye/><BiBlock/></td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//                 {/* Pagination */}
//                 <div className="pagination">
//                     <span className="pagination-info">
//                         Showing {(page - 1) * USERS_PER_PAGE + 1}–
//                         {Math.min(page * USERS_PER_PAGE, totalUsers)} of {totalUsers} users
//                     </span>


//                     <div className="pagination-buttons">
//                         <button
//                             disabled={page === 1}
//                             onClick={() => setPage(page - 1)}
//                         >
//                             Previous
//                         </button>
//                         <button
//                             disabled={page === totalPages}
//                             onClick={() => setPage(page + 1)}
//                             className="primary"
//                         >
//                             Next
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// /* ---------- Stats Card ---------- */
// function StatCard({ label, value, trend }) {
//     return (
//         <div className="stat-card">
//             <span className="stat-trend">{trend}</span>
//             <h3>{value}</h3>
//             <p>{label}</p>
//         </div>
//     );
// }



import { useEffect, useState } from "react";
import {
    getTotalUsers,
    getTotalSubscription,
    getVerifiedUsers,
} from "../../services/adminApi";
import { supabase } from "../../supabaseClient";

// ==================== ICON COMPONENTS ====================
const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4C4.5 4 2 10 2 10s2.5 6 8 6 8-6 8-6-2.5-6-8-6z" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="10" cy="10" r="2.5" stroke="#667085" strokeWidth="1.5" fill="none"/>
  </svg>
);

const BlockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" stroke="#EF4444" strokeWidth="1.5" fill="none"/>
    <path d="M5 5L15 15" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MoreIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="4" r="1.5" fill="#667085"/>
    <circle cx="10" cy="10" r="1.5" fill="#667085"/>
    <circle cx="10" cy="16" r="1.5" fill="#667085"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="6" stroke="#98A2B3" strokeWidth="1.5" fill="none"/>
    <path d="M14 14L18 18" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6h14M6 10h8M8 14h4" stroke="#344054" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="8" fill="#10B981"/>
    <path d="M6 10l2.5 2.5L14 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function UsersLegacy() {
    const USERS_PER_PAGE = 10;

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalsubscription, setTotalSubscription] = useState(0);
    const [verifiedUsers, setVerifiedUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const totalPages = Math.ceil(totalUsers / USERS_PER_PAGE);

    useEffect(() => {
        async function loadData() {
            setLoading(true);

            const [
                usersData,
                usersCount,
                subscriptions,
                verified,
            ] = await Promise.all([
                getUsersLegacy(page, USERS_PER_PAGE),
                getTotalUsers(),
                getTotalSubscription(),
                getVerifiedUsers(),
            ]);

            setUsers(usersData);
            setTotalUsers(usersCount);
            setTotalSubscription(subscriptions);
            setVerifiedUsers(verified);

            setLoading(false);
        }

        loadData();
    }, [page]);

    async function getUsersLegacy(page = 1, limit = 10) {
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        const { data, error } = await supabase
            .from("users")
            .select(`
          id,
          nickname,
          age,
          location,
          last_seen,
          is_verified
        `)
            .order("last_seen", { ascending: false })
            .range(from, to);

        if (error) {
            console.error("Error fetching users:", error);
            return [];
        }

        return data.map((user) => ({
            id: user.id,
            nickname: user.nickname,
            age: user.age,
            location: user.location,
            status: "active",
            subscription: "free",
            last_active: user.last_seen
                ? new Date(user.last_seen).toLocaleDateString()
                : "—",
            verified: user.is_verified,
        }));
    }

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    const getAvatarColor = (name) => {
        const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444'];
        const index = name ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    };

    const formatLastActive = (dateString) => {
        if (dateString === "—") return dateString;
        
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        const diffWeeks = Math.floor(diffDays / 7);
        
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
    };

    return (
        <div style={{
            backgroundColor: '#F9FAFB',
            minHeight: '100vh',
            padding: '40px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        }}>
            <div style={{
                maxWidth: '1400px',
                margin: '0 auto',
            }}>
                {/* Header */}
                <h1 style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#101828',
                    margin: '0 0 8px 0',
                    letterSpacing: '-0.02em',
                }}>User Management</h1>
                <p style={{
                    fontSize: '16px',
                    fontWeight: '400',
                    color: '#667085',
                    margin: '0 0 32px 0',
                }}>
                    View and manage all users on the platform
                </p>

                {/* Search and Filter Bar */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    marginBottom: '32px',
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'center',
                }}>
                    <div style={{
                        flex: 1,
                        position: 'relative',
                    }}>
                        <div style={{
                            position: 'absolute',
                            left: '16px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                        }}>
                            <SearchIcon />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by name, email, or location..."
                            style={{
                                width: '100%',
                                padding: '12px 16px 12px 48px',
                                fontSize: '15px',
                                color: '#101828',
                                backgroundColor: '#F9FAFB',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                outline: 'none',
                                transition: 'all 0.2s',
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#3B82F6';
                                e.target.style.backgroundColor = '#FFFFFF';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#E5E7EB';
                                e.target.style.backgroundColor = '#F9FAFB';
                            }}
                        />
                    </div>
                    <button style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 20px',
                        fontSize: '15px',
                        fontWeight: '600',
                        color: '#344054',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #D0D5DD',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#F9FAFB';
                        e.target.style.borderColor = '#98A2B3';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#FFFFFF';
                        e.target.style.borderColor = '#D0D5DD';
                    }}>
                        <FilterIcon />
                        More Filters
                    </button>
                </div>

                {/* Table */}
                <div style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                }}>
                    {loading ? (
                        <div style={{
                            padding: '60px',
                            textAlign: 'center',
                            color: '#667085',
                        }}>
                            <p>Loading users...</p>
                        </div>
                    ) : (
                        <>
                            <div style={{
                                overflowX: 'auto',
                            }}>
                                <table style={{
                                    width: '100%',
                                    borderCollapse: 'collapse',
                                }}>
                                    <thead>
                                        <tr style={{
                                            backgroundColor: '#F9FAFB',
                                            borderBottom: '1px solid #E5E7EB',
                                        }}>
                                            <th style={{
                                                padding: '16px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: '#667085',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                            }}>USER</th>
                                            <th style={{
                                                padding: '16px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: '#667085',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                            }}>AGE</th>
                                            <th style={{
                                                padding: '16px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: '#667085',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                            }}>LOCATION</th>
                                            <th style={{
                                                padding: '16px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: '#667085',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                            }}>STATUS</th>
                                            <th style={{
                                                padding: '16px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: '#667085',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                            }}>VERIFIED</th>
                                            <th style={{
                                                padding: '16px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: '#667085',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                            }}>LAST ACTIVE</th>
                                            <th style={{
                                                padding: '16px 24px',
                                                textAlign: 'left',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: '#667085',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                            }}>ACTIONS</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={user.id} style={{
                                                borderBottom: index < users.length - 1 ? '1px solid #F3F4F6' : 'none',
                                                transition: 'background-color 0.2s',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                <td style={{
                                                    padding: '20px 24px',
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '12px',
                                                    }}>
                                                        <div style={{
                                                            width: '40px',
                                                            height: '40px',
                                                            borderRadius: '50%',
                                                            backgroundColor: getAvatarColor(user.nickname),
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            fontSize: '14px',
                                                            fontWeight: '600',
                                                            color: '#FFFFFF',
                                                            flexShrink: 0,
                                                        }}>
                                                            {getInitials(user.nickname)}
                                                            
                                                        </div>
                                                        <div>
                                                            <div style={{
                                                                fontSize: '14px',
                                                                fontWeight: '600',
                                                                color: '#101828',
                                                                marginBottom: '2px',
                                                            }}>{user.nickname}</div>
                                                            <div style={{
                                                                fontSize: '13px',
                                                                fontWeight: '400',
                                                                color: '#667085',
                                                            }}></div>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td style={{
                                                    padding: '20px 24px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: '#667085',
                                                }}>{user.age}</td>

                                                <td style={{
                                                    padding: '20px 24px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: '#667085',
                                                }}>{user.location}</td>

                                                <td style={{
                                                    padding: '20px 24px',
                                                }}>
                                                    <span style={{
                                                        display: 'inline-flex',
                                                        padding: '4px 12px',
                                                        fontSize: '13px',
                                                        fontWeight: '600',
                                                        color: user.status === 'active' ? '#067647' : user.status === 'suspended' ? '#B42318' : '#667085',
                                                        backgroundColor: user.status === 'active' ? '#ECFDF3' : user.status === 'suspended' ? '#FEE4E2' : '#F3F4F6',
                                                        borderRadius: '6px',
                                                        textTransform: 'capitalize',
                                                    }}>
                                                        {user.status}
                                                    </span>
                                                </td>

                                                <td style={{
                                                    padding: '20px 24px',
                                                }}>
                                                    {user.verified ? (
                                                        <CheckCircleIcon />
                                                    ) : (
                                                        <span style={{
                                                            fontSize: '13px',
                                                            fontWeight: '500',
                                                            color: '#98A2B3',
                                                        }}>Verified</span>
                                                    )}
                                                </td>

                                                <td style={{
                                                    padding: '20px 24px',
                                                    fontSize: '14px',
                                                    fontWeight: '500',
                                                    color: '#667085',
                                                }}>{formatLastActive(user.last_active)}</td>

                                                <td style={{
                                                    padding: '20px 24px',
                                                }}>
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '8px',
                                                    }}>
                                                        <button style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            padding: '6px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: '6px',
                                                            transition: 'background-color 0.2s',
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                            <EyeIcon />
                                                        </button>
                                                        <button style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            padding: '6px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: '6px',
                                                            transition: 'background-color 0.2s',
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF3F2'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                            <BlockIcon />
                                                        </button>
                                                        <button style={{
                                                            background: 'none',
                                                            border: 'none',
                                                            cursor: 'pointer',
                                                            padding: '6px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            borderRadius: '6px',
                                                            transition: 'background-color 0.2s',
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F3F4F6'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                            <MoreIcon />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '20px 24px',
                                borderTop: '1px solid #F3F4F6',
                            }}>
                                <span style={{
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    color: '#667085',
                                }}>
                                    Showing {(page - 1) * USERS_PER_PAGE + 1}–{Math.min(page * USERS_PER_PAGE, totalUsers)} of {totalUsers.toLocaleString()} users
                                </span>

                                <div style={{
                                    display: 'flex',
                                    gap: '12px',
                                }}>
                                    <button
                                        disabled={page === 1}
                                        onClick={() => setPage(page - 1)}
                                        style={{
                                            padding: '10px 16px',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: page === 1 ? '#98A2B3' : '#344054',
                                            backgroundColor: '#FFFFFF',
                                            border: '1px solid #D0D5DD',
                                            borderRadius: '8px',
                                            cursor: page === 1 ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s',
                                            opacity: page === 1 ? 0.5 : 1,
                                        }}
                                        onMouseEnter={(e) => {
                                            if (page !== 1) {
                                                e.target.style.backgroundColor = '#F9FAFB';
                                                e.target.style.borderColor = '#98A2B3';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (page !== 1) {
                                                e.target.style.backgroundColor = '#FFFFFF';
                                                e.target.style.borderColor = '#D0D5DD';
                                            }
                                        }}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        disabled={page === totalPages}
                                        onClick={() => setPage(page + 1)}
                                        style={{
                                            padding: '10px 16px',
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            color: '#FFFFFF',
                                            backgroundColor: page === totalPages ? '#93C5FD' : '#3B82F6',
                                            border: 'none',
                                            borderRadius: '8px',
                                            cursor: page === totalPages ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={(e) => {
                                            if (page !== totalPages) {
                                                e.target.style.backgroundColor = '#2563EB';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (page !== totalPages) {
                                                e.target.style.backgroundColor = '#3B82F6';
                                            }
                                        }}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}