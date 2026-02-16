// import { useEffect, useState } from "react"
// import { createClient } from '@supabase/supabase-js'
// import "./Dashboard.css"

// import Dollar from "../assets/Dollar.png";
// import flag from "../assets/flag.png";
// import heart from "../assets/heart.png";
// import person from "../assets/person.png";

// // Initialize Supabase client (replace with your credentials)
// const supabase = createClient(
//   "https://xybvntejftsnbzsjwqal.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5YnZudGVqZnRzbmJ6c2p3cWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NDUwNDIsImV4cCI6MjA4NDMyMTA0Mn0.0mzi4V_73L0hE87LZChonoUjQGxHZ2598fBic8HGqoM"
// )



// // ==================== UTILITY FUNCTIONS ====================
// function getDateDaysAgo(days) {
//   const date = new Date()
//   date.setDate(date.getDate() - days)
//   date.setHours(0, 0, 0, 0)
//   return date
// }

// const calculatePercentage = (currentTotal, previousTotal) => {
//   if (previousTotal === 0) return 0
//   return Number(
//     (((currentTotal - previousTotal) / previousTotal) * 10).toFixed(2)
//   )
// }

// // ==================== API FUNCTIONS ====================
// async function getTotalUsers() {
//   const sevenDaysAgo = getDateDaysAgo(7)
//   const fourteenDaysAgo = getDateDaysAgo(14)

//   const { count: total } = await supabase
//     .from("users")
//     .select("*", { count: "exact", head: true })

//   const { count: current } = await supabase
//     .from("users")
//     .select("*", { count: "exact", head: true })
//     .gte("created_at", sevenDaysAgo.toISOString())

//   const { count: previous } = await supabase
//     .from("users")
//     .select("*", { count: "exact", head: true })
//     .gte("created_at", fourteenDaysAgo.toISOString())
//     .lt("created_at", sevenDaysAgo.toISOString())

//   return {
//     total: total || 0,
//     current: current || 0,
//     previous: previous || 0,
//   }
// }

// async function getActiveMatches() {
//   const sevenDaysAgo = getDateDaysAgo(7)
//   const fourteenDaysAgo = getDateDaysAgo(14)

//   const { count: total } = await supabase
//     .from("matches")
//     .select("*", { count: "exact", head: true })

//   const { count: current } = await supabase
//     .from("matches")
//     .select("*", { count: "exact", head: true })
//     .gte("created_at", sevenDaysAgo.toISOString())

//   const { count: previous } = await supabase
//     .from("matches")
//     .select("*", { count: "exact", head: true })
//     .gte("created_at", fourteenDaysAgo.toISOString())
//     .lt("created_at", sevenDaysAgo.toISOString())

//   return {
//     total: total || 0,
//     current: current || 0,
//     previous: previous || 0,
//   }
// }

// async function getTotalReports() {
//   const sevenDaysAgo = getDateDaysAgo(7)
//   const fourteenDaysAgo = getDateDaysAgo(14)

//   const { count: total } = await supabase
//     .from("user_reports")
//     .select("*", { count: "exact", head: true })

//   const { count: current } = await supabase
//     .from("user_reports")
//     .select("*", { count: "exact", head: true })
//     .gte("created_at", sevenDaysAgo.toISOString())

//   const { count: previous } = await supabase
//     .from("user_reports")
//     .select("*", { count: "exact", head: true })
//     .gte("created_at", fourteenDaysAgo.toISOString())
//     .lt("created_at", sevenDaysAgo.toISOString())

//   return {
//     total: total || 0,
//     current: current || 0,
//     previous: previous || 0,
//   }
// }

// async function getRecentActivity() {
//   const today = new Date()
//   today.setHours(0, 0, 0, 0)

//   const { data, error } = await supabase
//     .from("app_activity")
//     .select(`
//       id,
//       activity_type,
//       device_info,
//       created_at,
//       users(nickname)
//     `)
//     .gte("created_at", today.toISOString())
//     .order("created_at", { ascending: false })

//   if (error) {
//     console.error(error)
//     return []
//   }

//   return data
// }

// // ==================== COMPONENTS ====================

// // StatCard Component
// function StatCard({ title, value, change, img, bgColor }) {
//   const isPositive = change >= 0
  
//   return (
//     <div className="stat-card" >
//       <div className="stat-card-header">
//         <div className="stat-icon-wrapper" style={{ backgroundColor: bgColor }}>
//           <img src={img} alt={title} className="stat-icon"  />
//         </div>
//         <div className={`stat-change ${isPositive ? 'positive' : 'negative'}`}>
//           <span className="stat-arrow">{isPositive ? '↗' : '↘'}</span>
//           <span>{isPositive ? '+' : ''}{change}%</span>
//         </div>
//       </div>
//       <div className="stat-value">{value.toLocaleString()}</div>
//       <div className="stat-title">{title}</div>
//     </div>
//   )
// }

// // ActivityList Component
// function ActivityList() {
//   const [activities, setActivities] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function loadActivities() {
//       setLoading(true)
//       const data = await getRecentActivity()
//       setActivities(data)
//       setLoading(false)
//     }
//     loadActivities()
//   }, [])

//   const formatTime = (timestamp) => {
//     const now = new Date()
//     const activityTime = new Date(timestamp)
//     const diffMs = now - activityTime
//     const diffMins = Math.floor(diffMs / 60000)
    
//     if (diffMins < 60) {
//       return `${diffMins} min ago`
//     } else if (diffMins < 1440) {
//       const hours = Math.floor(diffMins / 60)
//       return `${hours} hour${hours > 1 ? 's' : ''} ago`
//     } else {
//       return activityTime.toLocaleDateString()
//     }
//   }

//   const getActivityDotColor = (type) => {
//     const colors = {
//       'user_signup': '#3b82f6',      // Blue
//       'match_created': '#10b981',    // Green
//       'message_sent': '#10b981',     // Green
//       'profile_update': '#10b981',   // Green
//       'report_submitted': '#f59e0b', // Orange
//       'login': '#10b981',            // Green
//     }
//     return colors[type] || '#3b82f6'
//   }

//   const getActivityText = (activity) => {
//     const nickname = activity.users?.nickname || 'User'
//     const typeMap = {
//       'user_signup': 'New user registration',
//       'match_created': 'got a new match',
//       'message_sent': 'sent a message',
//       'profile_update': 'Photo verification approved',
//       'report_submitted': 'Reported inappropriate content',
//       'login': 'logged in',
//     }
//     return {
//       name: nickname,
//       action: typeMap[activity.activity_type] || 'performed an action'
//     }
//   }

//   return (
//     <div className="activity-section">
//       <h2>Recent Activity</h2>
//       {loading ? (
//         <p className="loading-text">Loading activities...</p>
//       ) : activities.length === 0 ? (
//         <p className="no-activity">No activity today yet</p>
//       ) : (
//         <div className="activity-list">
//           {activities.map((activity) => {
//             const { name, action } = getActivityText(activity)
//             return (
//               <div key={activity.id} className="activity-item">
//                 <div 
//                   className="activity-dot" 
//                   style={{ backgroundColor: getActivityDotColor(activity.activity_type) }}
//                 />
//                 <div className="activity-details">
//                   <p className="activity-name">{name}</p>
//                   <p className="activity-action">{action}</p>
//                 </div>
//                 <p className="activity-time">{formatTime(activity.created_at)}</p>
//               </div>
//             )
//           })}
//         </div>
//       )}
//     </div>
//   )
// }

// // ==================== MAIN DASHBOARD COMPONENT ====================
// export default function Dashboard() {
//   const [totalUsers, setTotalUsers] = useState({
//     total: 0,
//     current: 0,
//     previous: 0,
//   })
//   const [activeMatches, setActiveMatches] = useState({
//     total: 0,
//     current: 0,
//     previous: 0,
//   })
//   const [totalReports, setTotalReports] = useState({
//     total: 0,
//     current: 0,
//     previous: 0,
//   })
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function loadStats() {
//       setLoading(true)
//       const [users, matches, reports] = await Promise.all([
//         getTotalUsers(),
//         getActiveMatches(),
//         getTotalReports(),
//       ])

//       // Debug logs
//       console.log("===== DASHBOARD DATA =====")
//       console.log("USERS OBJECT:", users)
//       console.log("Total Users (All Time):", users.total)
//       console.log("Users Last 7 Days:", users.current)
//       console.log("Users Previous 7 Days:", users.previous)
//       console.log(
//         "User 7-Day Growth:",
//         calculatePercentage(users.current, users.previous) + "%"
//       )
//       console.log("ACTIVE MATCHES:", matches)
//       console.log(
//         "Active Matches 7-Day Growth:",
//         calculatePercentage(matches.current, matches.previous) + "%"
//       )
//       console.log(
//         "Reports 7-Day Growth:",
//         calculatePercentage(reports.current, reports.previous) + "%"
//       )
//       console.log("==========================")

//       setTotalUsers(users)
//       setActiveMatches(matches)
//       setTotalReports(reports)
//       setLoading(false)
//     }
//     loadStats()
//   }, [])

//   return (
//     <div className="dashboard-layout"  >
//       <div className="main" >
//         <h1 style={{color:"#101828"}}>Dashboard</h1>
//         <p className="subtitle">
//           Welcome back! Here's what's happening with your dating platform today.
//         </p>
//         <div className="stats">
//           {loading ? (
//             <p>Loading stats...</p>
//           ) : (
//             <>
//               <StatCard
//                 title="Total Users"
//                 value={totalUsers.total}
//                 change={calculatePercentage(
//                   totalUsers.current,
//                   totalUsers.previous
//                 )}
//                 img={person}
//                 bgColor="#dbeafe"
//               />
//               <StatCard
//                 title="Active Matches"
//                 value={activeMatches.total}
//                 change={calculatePercentage(
//                   activeMatches.current,
//                   activeMatches.previous
//                 )}
//                 img={heart}
//                 bgColor="#fce7f3"
//               />
//               <StatCard
//                 title="Pending Reports"
//                 value={totalReports.total}
//                 change={calculatePercentage(
//                   totalReports.current,
//                   totalReports.previous
//                 )}
//                 img={flag}
//                 bgColor="#fef3c7"
//               />
//               <StatCard 
//                 title="Revenue (MTD)" 
//                 value="$48,392" 
//                 change={23.1}
//                 img={Dollar}
//                 bgColor="#d1fae5"
//               />
//             </>
//           )}
//         </div>
//         <ActivityList />
//       </div>
//     </div>
//   )
// }





import { useEffect, useState } from "react"
import { createClient } from '@supabase/supabase-js'


import { supabase } from "../supabaseClient";




// ==================== UTILITY FUNCTIONS ====================
function getDateDaysAgo(days) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  date.setHours(0, 0, 0, 0)
  return date
}

const calculatePercentage = (currentTotal, previousTotal) => {
  if (previousTotal === 0) return 0
  return Number(
    (((currentTotal - previousTotal) / previousTotal) * 100).toFixed(1)
  )
}

// ==================== API FUNCTIONS ====================
async function getTotalUsers() {
  const sevenDaysAgo = getDateDaysAgo(7)
  const fourteenDaysAgo = getDateDaysAgo(14)

  const { count: total } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })

  const { count: current } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo.toISOString())

  const { count: previous } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .gte("created_at", fourteenDaysAgo.toISOString())
    .lt("created_at", sevenDaysAgo.toISOString())

  return {
    total: total || 0,
    current: current || 0,
    previous: previous || 0,
  }
}

async function getActiveMatches() {
  const sevenDaysAgo = getDateDaysAgo(7)
  const fourteenDaysAgo = getDateDaysAgo(14)

  const { count: total } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })

  const { count: current } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo.toISOString())

  const { count: previous } = await supabase
    .from("matches")
    .select("*", { count: "exact", head: true })
    .gte("created_at", fourteenDaysAgo.toISOString())
    .lt("created_at", sevenDaysAgo.toISOString())

  return {
    total: total || 0,
    current: current || 0,
    previous: previous || 0,
  }
}

async function getTotalReports() {
  const sevenDaysAgo = getDateDaysAgo(7)
  const fourteenDaysAgo = getDateDaysAgo(14)

  const { count: total } = await supabase
    .from("user_reports")
    .select("*", { count: "exact", head: true })

  const { count: current } = await supabase
    .from("user_reports")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo.toISOString())

  const { count: previous } = await supabase
    .from("user_reports")
    .select("*", { count: "exact", head: true })
    .gte("created_at", fourteenDaysAgo.toISOString())
    .lt("created_at", sevenDaysAgo.toISOString())

  return {
    total: total || 0,
    current: current || 0,
    previous: previous || 0,
  }
}

async function getRecentActivity() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { data, error } = await supabase
    .from("app_activity")
    .select(`
      id,
      activity_type,
      device_info,
      created_at,
      users(nickname)
    `)
    .gte("created_at", today.toISOString())
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}

// ==================== ICON COMPONENTS ====================
const PersonIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 16C19.3137 16 22 13.3137 22 10C22 6.68629 19.3137 4 16 4C12.6863 4 10 6.68629 10 10C10 13.3137 12.6863 16 16 16Z" fill="#3B82F6"/>
    <path d="M16 18C10.4772 18 6 22.4772 6 28H26C26 22.4772 21.5228 18 16 18Z" fill="#3B82F6"/>
  </svg>
)

const HeartIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 28C16 28 4 21 4 12C4 8.68629 6.68629 6 10 6C12.4853 6 14.6863 7.37255 16 9.46863C17.3137 7.37255 19.5147 6 22 6C25.3137 6 28 8.68629 28 12C28 21 16 28 16 28Z" fill="#EC4899"/>
  </svg>
)

const FlagIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4V28M6 4L24 7L6 16L24 19V7" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M6 4L24 7V19L6 16V4Z" fill="#F59E0B" opacity="0.3"/>
  </svg>
)

const DollarIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4V28M12 8H18C19.6569 8 21 9.34315 21 11C21 12.6569 19.6569 14 18 14H14C12.3431 14 11 15.3431 11 17C11 18.6569 12.3431 20 14 20H18C19.6569 20 21 21.3431 21 23C21 24.6569 19.6569 26 18 26H12" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
)

// ==================== COMPONENTS ====================

// StatCard Component
function StatCard({ title, value, change, IconComponent, bgColor }) {
  const isPositive = change >= 0
  
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'pointer',
      position: 'relative',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '20px',
      }}>
        <div style={{
          backgroundColor: bgColor,
          borderRadius: '12px',
          width: '56px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <IconComponent />
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '14px',
          fontWeight: '600',
          color: isPositive ? '#10B981' : '#EF4444',
        }}>
          <span style={{
            fontSize: '18px',
            lineHeight: '1',
          }}>{isPositive ? '↗' : '↘'}</span>
          <span>{isPositive ? '+' : ''}{change}%</span>
        </div>
      </div>
      <div style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#101828',
        marginBottom: '8px',
        lineHeight: '1.2',
      }}>
        {typeof value === 'string' ? value : value.toLocaleString()}
      </div>
      <div style={{
        fontSize: '14px',
        fontWeight: '500',
        color: '#667085',
      }}>
        {title}
      </div>
    </div>
  )
}

// ActivityList Component
function ActivityList() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadActivities() {
      setLoading(true)
      const data = await getRecentActivity()
      setActivities(data)
      setLoading(false)
    }
    loadActivities()
  }, [])

  const formatTime = (timestamp) => {
    const now = new Date()
    const activityTime = new Date(timestamp)
    const diffMs = now - activityTime
    const diffMins = Math.floor(diffMs / 60000)
    
    if (diffMins < 60) {
      return `${diffMins} min ago`
    } else if (diffMins < 1440) {
      const hours = Math.floor(diffMins / 60)
      return `${hours} hour${hours > 1 ? 's' : ''} ago`
    } else {
      return activityTime.toLocaleDateString()
    }
  }

  const getActivityDotColor = (type) => {
    const colors = {
      'user_signup': '#3B82F6',      // Blue
      'match_created': '#10B981',    // Green
      'message_sent': '#10B981',     // Green
      'profile_update': '#10B981',   // Green
      'report_submitted': '#F59E0B', // Orange
      'login': '#10B981',            // Green
      'premium_subscription': '#10B981', // Green
      'account_suspended': '#EF4444', // Red
    }
    return colors[type] || '#3B82F6'
  }

  const getActivityText = (activity) => {
    const nickname = activity.users?.nickname || 'User'
    const typeMap = {
      'user_signup': 'New user registration',
      'match_created': 'got a new match',
      'message_sent': 'sent a message',
      'profile_update': 'Photo verification approved',
      'report_submitted': 'Reported inappropriate content',
      'login': 'logged in',
      'premium_subscription': 'Premium subscription activated',
      'account_suspended': 'Account suspended for TOS violation',
    }
    return {
      name: nickname,
      action: typeMap[activity.activity_type] || 'performed an action'
    }
  }

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginTop: '32px',
    }}>
      <h2 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#101828',
        marginBottom: '24px',
        margin: '0 0 24px 0',
      }}>Recent Activity</h2>
      {loading ? (
        <p style={{
          color: '#667085',
          fontSize: '14px',
        }}>Loading activities...</p>
      ) : activities.length === 0 ? (
        <p style={{
          color: '#667085',
          fontSize: '14px',
        }}>No activity today yet</p>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}>
          {activities.map((activity, index) => {
            const { name, action } = getActivityText(activity)
            return (
              <div key={activity.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: index < activities.length - 1 ? '1px solid #F3F4F6' : 'none',
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: getActivityDotColor(activity.activity_type),
                  marginRight: '16px',
                  flexShrink: 0,
                }} />
                <div style={{
                  flex: 1,
                  minWidth: 0,
                }}>
                  <p style={{
                    margin: 0,
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#101828',
                    marginBottom: '2px',
                  }}>{name}</p>
                  <p style={{
                    margin: 0,
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#667085',
                  }}>{action}</p>
                </div>
                <p style={{
                  margin: 0,
                  fontSize: '13px',
                  fontWeight: '400',
                  color: '#98A2B3',
                  whiteSpace: 'nowrap',
                  marginLeft: '16px',
                }}>{formatTime(activity.created_at)}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// ==================== MAIN DASHBOARD COMPONENT ====================
export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState({
    total: 0,
    current: 0,
    previous: 0,
  })
  const [activeMatches, setActiveMatches] = useState({
    total: 0,
    current: 0,
    previous: 0,
  })
  const [totalReports, setTotalReports] = useState({
    total: 0,
    current: 0,
    previous: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStats() {
      setLoading(true)
      const [users, matches, reports] = await Promise.all([
        getTotalUsers(),
        getActiveMatches(),
        getTotalReports(),
      ])

      setTotalUsers(users)
      setActiveMatches(matches)
      setTotalReports(reports)
      setLoading(false)
    }
    loadStats()
  }, [])

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
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#101828',
          margin: '0 0 8px 0',
          letterSpacing: '-0.02em',
        }}>Dashboard</h1>
        <p style={{
          fontSize: '16px',
          fontWeight: '400',
          color: '#667085',
          margin: '0 0 32px 0',
        }}>
          Welcome back! Here's what's happening with your dating platform today.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
          marginBottom: '0',
        }}>
          {loading ? (
            <p style={{ color: '#667085' }}>Loading stats...</p>
          ) : (
            <>
              <StatCard
                title="Total Users"
                value={totalUsers.total}
                change={calculatePercentage(
                  totalUsers.current,
                  totalUsers.previous
                )}
                IconComponent={PersonIcon}
                bgColor="#DBEAFE"
              />
              <StatCard
                title="Active Matches"
                value={activeMatches.total}
                change={calculatePercentage(
                  activeMatches.current,
                  activeMatches.previous
                )}
                IconComponent={HeartIcon}
                bgColor="#FCE7F3"
              />
              <StatCard
                title="Pending Reports"
                value={totalReports.total}
                change={calculatePercentage(
                  totalReports.current,
                  totalReports.previous
                )}
                IconComponent={FlagIcon}
                bgColor="#FEF3C7"
              />
              <StatCard 
                title="Revenue (MTD)" 
                value="0" 
                change={0}
                IconComponent={DollarIcon}
                bgColor="#D1FAE5"
              />
            </>
          )}
        </div>
        
        <ActivityList />
      </div>
    </div>
  )
}