import React from "react";
import "../styles/styles.css"; // Import CSS file

const FirstSection = () => {
  return (
    <div className="first-container">
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
    </div>
  );
};

export default FirstSection;
