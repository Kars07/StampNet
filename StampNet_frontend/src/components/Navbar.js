import React, { useState, useEffect } from "react";
import "../styles/styles.css"; // Import CSS file

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile view for width <= 768px
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    handleResize(); // Initial check on page load

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo">
            <img className="navbar_logo" src="images/navbar_logo.png" alt="Logo" />
          </div>

          {/* Hamburger Menu Icon (Only on Mobile) */}
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={menuOpen ? "bx bx-x" : "bx bx-menu"}></i>
          </div>

          {/* Navigation Links */}
          <ul className={`nav-links ${isMobile ? (menuOpen ? "open" : "closed") : ""}`}>
            <li><a href="#">Products <i className="bx bx-chevron-down"></i></a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Case Studies <i className="bx bx-chevron-down"></i></a></li>
            <li><a href="/about-us">About</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#" className="pass">Get a Pass</a></li>
          </ul>

          {/* Social Icons (Always visible) */}
          <div className="social-icons">
            <i className="bx bxl-linkedin"></i>
            <i className="bx bxl-github"></i>
            <i className="bx bxl-youtube"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
