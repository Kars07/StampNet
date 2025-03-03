import React from "react";
import "../styles/styles.css"; // Import CSS file
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer class="footer">
        <hr className="footer-separator" />
        <motion.div 
         initial={{opacity:0 ,translateX:"100%"}}
         whileInView={{opacity:1, translateX:0}}
         transition={{duration:1}}class="subscribe">
            <div class="input-container">
                <i class='bx bx-envelope'></i>
                <input type="email" placeholder="Email address"/>
            </div>
            <button class="join-btn">Join us</button>
        </motion.div>
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
                <a href="https://x.com/TeamAlphaDev" target="_blank" rel="noopener noreferrer" ><i className="bx bxl-twitter"></i></a>
                <a href="https://github.com/Kars07/StampNet" target="_blank" rel="noopener noreferrer"><i className="bx bxl-github"></i></a>
                <a href="https://www.youtube.com/watch?v=sScVIg0nfC4&t=9s" target="_blank" rel="noopener noreferrer"><i className="bx bxl-youtube"></i></a>
                <i class='bx bxl-linkedin'></i>
            </div>
        </div>
    </footer> 
  );

};

export default Footer;
