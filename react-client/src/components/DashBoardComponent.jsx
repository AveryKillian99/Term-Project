//import React from "react";
//import WorkoutListComponent from "./WorkoutListComponent";
//import QuoteComponent from "./QuoteComponent";
//import "../index.css"; // Ensure CSS is applied
//
//export default function DashboardComponent() {
//  return (
//    <div className="dashboard">
//      <h1 className="site-title">Workout Tracker</h1>
//      <QuoteComponent />
//      <WorkoutListComponent />
//    </div>
//  );
//}
//

import React from "react";
import WorkoutListComponent from "./WorkoutListComponent";
import QuoteComponent from "./QuoteComponent";
import { useAuth } from "./auth/AuthContext.jsx";
import "../index.css";

export default function DashboardComponent() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      window.location.href = "/login"; // redirect to login page
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="site-title">Workout Tracker</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <QuoteComponent />
      <WorkoutListComponent />
    </div>
  );
}
