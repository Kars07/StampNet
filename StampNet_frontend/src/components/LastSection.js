import React from "react";
import "../styles/styles.css"; // Import CSS file
import { motion } from "framer-motion";

const LastSection = () => {
  return (
    <motion.div
      initial={{opacity:0 ,translateY:"100%"}}
      whileInView={{opacity:1, translateY:0}}
      transition={{duration:1}}
      className="last-container">
      <h1>Secure Your Digital Data with StampNet</h1>
      <p>
        Experience the next level of digital security and authenticity with StampNet.
        Begin your journey towards tamper-proof data integrity.
      </p>
      <a href="/register"><button className="last-button">Try StampNet Now</button></a>
    </motion.div>
  );
};

export default LastSection;
