import React from "react";
import "../styles/AboutUs.css"; // Import the CSS file
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* About Us Header Section */}
      <div className="wrap">
        <motion.div
        initial={{opacity:0 ,scale:0}}
        whileInView={{opacity:1, scale:1}}
        transition={{duration:1}}
         className="header-container">
          <div className="label1-line"></div>
          <h1 className="gradient-text">About Us</h1>
          <div className="label2-line"></div>
        </motion.div>
        <span>Trust isn't just a concept—it's proof.</span>
      </div>

      {/* Our Philosophy Section */}
      <div className="letter-content">
        <motion.h1
        initial={{opacity:0 ,scale:0}}
        whileInView={{opacity:1, scale:1}}
        transition={{duration:1}} className="gradient-text">Our Philosophy</motion.h1>
        <motion.h2
           initial={{opacity:0 ,translateY:"100%"}}
           whileInView={{opacity:1, translateY:0}}
           transition={{duration:1}}
        >
          We're building a future where verification isn't just tied to paperwork but to irrefutable proof—where timestamps serve as unquestionable evidence of authenticity, secured through blockchain technology.
        </motion.h2>
        <motion.h2
        initial={{opacity:0 ,translateY:"100%"}}
        whileInView={{opacity:1, translateY:0}}
        transition={{duration:1}}>
          At StampNet, we believe that proof of existence is a fundamental right—one that should be accessible to all. Whether it's legal documents, contracts, or academic research, everyone deserves a way to prove ownership and integrity without relying on centralized authorities.
        </motion.h2>
        <motion.h2
        initial={{opacity:0 ,translateY:"100%"}}
        whileInView={{opacity:1, translateY:0}}
        transition={{duration:1}}>
          With years of experience in decentralized verification, we are confidently shaping this future—one timestamp at a time. We know this future is possible, and we invite you to build it with us.
        </motion.h2>
      </div>

      {/* Team Members Section */}
      <div className="Teams">
        <h1 className="gradient-text">Team Members</h1>
        <div className="images">
          <motion.div 
            initial={{opacity:0 ,translateX:"-100%"}}
            whileInView={{opacity:1, translateX:0}}
            transition={{duration:1}}
          className="image-contents">
            <img src="/images/about1.jpg" alt="Oloyede Michael" />
            <h2 className="about-name">Oloyede Michael</h2>
            <h3 className="about-image">Team Leader and Full Stack Developer</h3>
          </motion.div>
          <motion.div
           initial={{opacity:0 ,translateX:"-100%"}}
           whileInView={{opacity:1, translateX:0}}
           transition={{duration:0.9}} className="image-contents">
            <img src="/images/about2.jpg" alt="Emmanuel Damilola" />
            <h2 className="about-name">Emmanuel Damilola</h2>
            <h3 className="about-image">UI/UX Designer</h3>
          </motion.div>
          <motion.div 
           initial={{opacity:0 ,translateX:"100%"}}
           whileInView={{opacity:1, translateX:0}}
           transition={{duration:0.8}}className="image-contents">
            <img src="/images/about3.jpg" alt="Eniaiyejuni Raphael" />
            <h2 className="about-name">Eniaiyejuni Raphael</h2>
            <h3 className="about-image">Smart Contract and Backend Developer</h3>
          </motion.div>
          <motion.div
           initial={{opacity:0 ,translateX:"-100%"}}
           whileInView={{opacity:1, translateX:0}}
           transition={{duration:1}} className="image-contents">
            <img src="/images/about5.jpg" alt="Omilabu Wuraola" />
            <h2 className="about-name">Omilabu Wuraola</h2>
            <h3 className="about-image">Frontend Developer</h3>
          </motion.div>
          <div 
           className="image-contents hidden">
            <img src="/images/about4.jpg" alt="Abibi Daniella" />
            <h2 className="about-name">Abibi Daniella</h2>
            <h3 className="about-image">Backend Developer</h3>
          </div>
          <motion.div 
           initial={{opacity:0 ,translateX:"100%"}}
           whileInView={{opacity:1, translateX:0}}
           transition={{duration:1}}className="image-contents">
            <img src="/images/about4.jpg" alt="Abibi Daniella" />
            <h2 className="about-name">Abibi Daniella</h2>
            <h3 className="about-image">Backend Developer</h3>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
