import React from "react";
import "../styles/styles.css"; // Import CSS file

const Footer = () => {
  return (
    <footer class="footer">
        <hr className="footer-separator" />
        <div class="subscribe">
            <div class="input-container">
                <i class='bx bx-envelope'></i>
                <input type="email" placeholder="Email address"/>
            </div>
            <button class="join-btn">Join us</button>
        </div>
        <div class="footer-content">
            <div class="footer-column">
                <div className="footer-logo">
                    <img className="foot_logo" src="images/navbar_logo.png" alt="Logo" />
                </div>
                <h3>Products</h3>
                <ul>
                    <li>Stamp Pass</li>
                    <li>Stamp Auth</li>
                    <li>Documentation</li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Company</h3>
                <ul>
                    <li>About</li>
                    <li>News</li>
                    <li>Team</li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Support</h3>
                <ul>
                    <li>Help Center</li>
                    <li>Bug Bounty</li>
                    <li>Press Kit</li>
                    <li>Brand Guidelines</li>
                </ul>
            </div>
            <div class="footer-column">
                <h3>Legal</h3>
                <ul>
                    <li>Legal Disclosures</li>
                    <li>Privacy Policy</li>
                    <li>Terms and Conditions</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            &copy;2025. All rights reserved.
            <div class="footer-social-icons">
                <i class='bx bx-x'></i>
                <i class='bx bxl-linkedin'></i>
                <i class='bx bxl-github'></i>
                <i class='bx bxl-youtube'></i>
            </div>
        </div>
    </footer> 
  );
};

export default Footer;
