import React, { useState, useEffect } from "react";
import "../styles/styles.css"; // Import CSS file

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-content">
          <div className="logo">
            <img className="navbar_logo" src="images/navbar_logo.png" alt="Logo" />
          </div>
          <ul className="nav-links">
            <li><a href="#">Products <i className="bx bx-chevron-down"></i></a></li>
            <li><a href="#">Docs</a></li>
            <li><a href="#">Case Studies <i className="bx bx-chevron-down"></i></a></li>
            <li><a href="/about-us">About</a></li>
            <li><a href="#">News</a></li>
            <li><a href="#" className="pass">Get a Pass</a></li>
          </ul>
          <div className="social-icons">
            <i className="bx bx-x"></i>
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
