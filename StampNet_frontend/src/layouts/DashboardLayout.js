import React from "react";
import DashboardFooter from "../components/DashboardFooter";
import DashboardHeader from "../components/DashboardHeader";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <DashboardHeader />
      <main>{children}</main>
      <DashboardFooter /> 
    </>
  );
};

export default DashboardLayout;
