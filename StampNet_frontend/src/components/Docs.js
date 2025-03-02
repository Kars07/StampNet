import React from "react";
import "../styles/Doc.css";

const Docs = () => {
  return (
    <div className="docs-container">
      <h1 className="docs-title">📄 StampNet Documentation 📄 </h1>
      <div className="docs-content">
        <p>Welcome to the StampNet documentation page. Here you'll find all the necessary information about our platform.</p>
        <h2>Getting Started</h2>
        <p>To use StampNet, you need to create an account. You can choose to either use our system by signing in with Google or MetaMask.</p>
        <h2>Features</h2>
        <ul>
          <li>Timestamp documents on Arbitrum</li>
          <li>Secure and decentralized proof of existence</li>
          <li>User-friendly dashboard</li>
          <li>User-Authencity</li>
          <li>Abtrium Technology</li>
          <li>Tamper-proof Blockchain app</li>
        </ul>
        <h2>API Reference</h2>
        <p>Developers can integrate StampNet using our API endpoints.</p>
        <p id="notice">Note:Users should take note that when hashing a document the process is slower on Andriod and Apple Os than Windows and MACOS</p>
      </div>
      <a href='/'><button className="demo-btn">Back to Home Page</button></a>
    </div>
  );
};

export default Docs;
