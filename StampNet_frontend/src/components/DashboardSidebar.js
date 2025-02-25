import React from "react";
import "../styles/dashboard_module.css"; // Ensure this file contains styles for the sidebar

const DashboardSidebar = () => {
  return (
    <aside className="dashboard-sidebar">
      <nav>
        <ul className="sidebar-nav-links">
          <li><a href="#"><i className="bx bx-home"></i> Overview</a></li>
          <li><a href="#"><i className="bx bxs-time-five"></i> My Timestamps</a></li>
          <li><a href="#"><i className="bx bx-dialpad"></i> Integrations</a></li>
          <li><a href="#"><i className="bx bx-cog"></i> Automate & API</a></li>
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
