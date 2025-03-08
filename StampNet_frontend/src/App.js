import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LastSection from "./components/LastSection";
import SecondSection from "./components/SecondSection";
import Features from "./components/Features";
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
import MyTimestamps from "./pages/MyTimestamps";
import FirstSection from "./components/FirstSection";
import { motion } from "framer-motion";
import useMousePosition from "./useMousePosition";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <MainContent />
    </Router>
  );
}

const MainContent = () => {
  const location = useLocation();
  const { x, y } = useMousePosition();
  const [cursorSize, setCursorSize] = useState({ width: 40, height: 40 });

  useEffect(() => {
    const cursor = document.querySelector(".custom-cursor");
    if (cursor) {
      setCursorSize({
        width: cursor.offsetWidth,
        height: cursor.offsetHeight,
      });
    }
  }, []);

  const authPages = ["/register", "/login", "/forgot-password"];
  const isAuthPage = authPages.includes(location.pathname);
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isMyTimestamps = location.pathname === "/my-timestamps";
  const isDocsPage = location.pathname === "/docs";
  const isHomePage = location.pathname === "/";

  return (
    <>
      {/* Custom Cursor */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: x - cursorSize.width / 2,
          y: y - cursorSize.height / 2,
          translateX: isHomePage ? "6px" : "0px", // Adjust transform for home page
          translateY: isHomePage ? "-170px" : "0px"
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.05 }}
      />

      {!isAuthPage && !isDashboard && !isMyTimestamps && !isDocsPage && <Navbar />}

      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <SecondSection />
                <FirstSection />
                <Slider />
                <LastSection />
                <FAQ />
                <Features />
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
