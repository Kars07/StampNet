import React from "react";
import "../styles/styles.css"; // Import CSS file
import { motion } from "framer-motion";

const FirstSection = () => {
  return (
    <motion.div 
     initial={{opacity:0 ,translateY:"100%"}}
      whileInView={{opacity:1, translateY:0}}
      transition={{duration:1}}
     className="first-container">
      <div className="first-content">
        <h1>
          Explore Digital Security with <span className="first-highlight">StampNet</span>
        </h1>
        <p>
          Start with StampNet to enhance your digital data's security and authenticity.
          Transform your data management with blockchain technology today!
        </p>
      </div>
      <button className="first-button">Discover More</button>
    </motion.div>
  );
};

export default FirstSection;
