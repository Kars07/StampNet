import { useState, useEffect } from "react";
import "../styles/Doc.css";

export default function StampNetDocs() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    if (isMobile) setMenuOpen(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      `POST /api/timestamp\n{\n  "file_hash": "abc123xyz",\n  "timestamp": "2025-03-02T12:00:00Z"\n}`
    );
  };

  return (
    <div className="doc-container">
      {isMobile && (
        <button className="menu-icon" onClick={toggleMenu}>☰</button>
      )}

      {/* Sidebar Navigation */}
      <nav className={`sidebar ${menuOpen || !isMobile ? "open" : ""}`}>
        {isMobile && (
          <button className="close-icon" onClick={toggleMenu}>✖</button>
        )}
        <div className="logo">
            <a href="/"><img className="navbar_logo" src="images/navbar_logo.png" alt="Logo" /></a>
         </div>
        <ul>
          <li onClick={() => scrollToSection("introduction")}>Introduction</li>
          <li onClick={() => scrollToSection("authentication")}>User Authentication</li>
          <li onClick={() => scrollToSection("getting-started")}>Getting Started</li>
          <li onClick={() => scrollToSection("features")}>Features</li>
          <li onClick={() => scrollToSection("api-reference")}>API Reference</li>
          <li onClick={() => scrollToSection("faqs")}>FAQs</li>
          <li onClick={() => scrollToSection("contact")}>Contact & Support</li>
        </ul>
      </nav>

      <div className="doc-content">
        <h1 className="doc-title gradient-text-big">StampNet Documentation</h1>
        <p className="doc-intro">
          Welcome to the StampNet documentation page. Here you'll find all the necessary information about our platform.
        </p>
        
        <h2 id="introduction" className="doc-section gradient-text">Introduction</h2>
        <p className="doc-text">
          StampNet is a decentralized platform for timestamping documents. It allows users to securely generate a
          blockchain-backed proof of existence without storing sensitive data.
        </p>
        <hr></hr>
        <h2 id="authentication" className="doc-section gradient-text">User Authentication</h2>
        <ul className="doc-list">
          <li><strong>Google Authentication:</strong> A quick and easy way to sign in.</li>
          <li><strong>MetaMask:</strong> A decentralized wallet necessary for storing and managing uploaded files.</li>
        </ul>
        <hr></hr>
        
        <h2 id="getting-started" className="doc-section gradient-text">Getting Started</h2>
        <ol className="doc-list">
          <li>Sign in using Google or MetaMask.</li>
          <li>Upload a file or enter text.</li>
          <li>Generate a timestamp.</li>
          <li>Save the timestamp receipt.</li>
        </ol>
        <hr></hr>
        <h2 id="features" className="doc-section gradient-text">Features</h2>
        <ul className="doc-list">
          <li>Decentralized Timestamping on Arbitrum</li>
          <li>Secure and Tamper-proof Blockchain Storage</li>
          <li>User-friendly Dashboard</li>
          <li>Document Integrity Verification</li>
        </ul>
        <hr></hr>
        <h2 id="api-reference" className="doc-section gradient-text">API Reference</h2>
        <div className="api-container">
          <img src="/images/carbon.jpeg" alt="API Example" className="api-image" />
         
        </div>
        <hr></hr>
        <h2 id="faqs" className="doc-section gradient-text">FAQs</h2>
        <div className="doc-faq">
          <p><strong>Is my file stored on the blockchain?</strong></p>
          <p>No, only the cryptographic hash of your file is stored, ensuring privacy.</p>
        </div>
        <div className="doc-faq">
          <p><strong>How do I verify a timestamp?</strong></p>
          <p>Re-upload your document to the platform, and it will check if a matching hash exists on the blockchain.</p>
        </div>
        <div className="doc-faq">
          <p><strong>Why do I need a MetaMask account?</strong></p>
          <p>MetaMask is required for securely managing document hashes and ensuring full decentralization.</p>
        </div>
        <hr></hr>
        <h2 id="contact" className="doc-section gradient-text">Contact & Support</h2>
        <p>
          For assistance, please reach out via our handle <div class="footer-social-icons">
                <a href="https://x.com/TeamAlphaDev" target="_blank" rel="noopener noreferrer" ><i className="bx bxl-twitter"></i></a>
                <a href="https://github.com/Kars07/StampNet" target="_blank" rel="noopener noreferrer"><i className="bx bxl-github"></i></a>
                <a href="https://www.youtube.com/watch?v=sScVIg0nfC4&t=9s" target="_blank" rel="noopener noreferrer"><i className="bx bxl-youtube"></i></a>
                <i class='bx bxl-linkedin'></i>
            </div>
        </p>
      </div>
    </div>
  );
}
