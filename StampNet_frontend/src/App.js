import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LastSection from "./components/LastSection";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AboutUs from "./pages/AboutUs";
import Slider from "./components/Slider";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import DashboardHeader from "./components/DashboardHeader";
import FAQ from "./components/FAQ";
import Docs from "./components/Docs";
import "./styles/global.css";
import MyTimestamps from "./pages/MyTimestamps";
import FirstSection from "./components/FirstSection";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation();
  const authPages = ["/register", "/login", "/forgot-password"];
  const isAuthPage = authPages.includes(location.pathname);
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isMyTimestamps = location.pathname === "/my-timestamps";
  const isDocsPage = location.pathname === "/docs";

  return (
    <>
      {/* Show Navbar for non-auth, non-dashboard, non-my-timestamps, and non-docs pages */}
      {!isAuthPage && !isDashboard && !isMyTimestamps && !isDocsPage && <Navbar />}

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <FirstSection />
                <Slider />
                <LastSection />
                <FAQ />
                <Footer />
              </>
            }
          />

          <Route
            path="/about-us"
            element={
              <>
                <AboutUs />
                <Footer />
              </>
            }
          />

          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <DashboardHeader />
                <DashboardPage />
              </DashboardLayout>
            }
          />
          
          <Route path="/my-timestamps" element={<MyTimestamps />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
