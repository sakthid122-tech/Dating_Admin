import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Sidebar() {
  const location = useLocation();

  const isUsersActive =
    location.pathname === "/users" ||
    location.pathname === "/userProfileDetails";

  const isModerationActive =
    location.pathname === "/ModeratioReports" ||
    location.pathname === "/reports";

  return (
    <>
      <div className="sidebar">
        <h2 className="logo" style={{ marginTop: "10px", paddingBottom: "20px" }}>
          <img
            src={logo}
            alt="logo"
            style={{ width: "180px", height: "32px", display: "block" }}
          />
        </h2>

        <ul className="menu">
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>

          <li>
            <NavLink to="/users" className={isUsersActive ? "active" : ""}>
              Users
            </NavLink>
          </li>

          <li>
            <NavLink to="/userslegacy">Users(Legacy)</NavLink>
          </li>

          <li>
            <NavLink
              to="/ModeratioReports"
              className={isModerationActive ? "active" : ""}
            >
              Moderation & Reports
            </NavLink>
          </li>

          <li>
            <NavLink to="/payments">Payments</NavLink>
          </li>
        </ul>

        <p className="version">v1.0.0</p>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          font-family: Inter, sans-serif;
        }

        .dashboard-layout, .app-layout {
          display: flex;
          height: 100vh;
          background: #f4f5f7;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 100vh;
          color: white;
          padding: 20px;
          overflow-y: auto;
          z-index: 1000;
        }

        .logo {
          color: #b6ff00;
          font-size: 20px;
          margin-bottom: 30px;
        }

        .menu {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .menu li {
          padding: 20px;
          cursor: pointer;
          opacity: 0.8;
          margin-bottom: 5px;
        }

        .menu li a {
          color: white;
          text-decoration: none;
          display: block;
        }

        .menu li a.active {
          background: #b6ff00;
          color: black;
          border-radius: 6px;
          padding: 10px;
        }

        .version {
          position: absolute;
          bottom: 20px;
          font-size: 12px;
        }

        .main {
          margin-left: 260px;
          flex: 1;
          padding: 20px 30px;
        }
      `}</style>
    </>
  );
}
