import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header_module.css";

const DashboardHeader = () => {
  const [userEmail, setUserEmail] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserEmail(userData.email);
    }
    const storedWallet = localStorage.getItem("walletAddress");
    if (storedWallet) {
      setWalletAddress(storedWallet);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".user-dropdown")) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  async function connectMetaMask() {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        localStorage.setItem("walletAddress", accounts[0]);
        alert(`Connected: ${accounts[0]}`);
      }
    } catch (error) {
      console.error("Error connecting MetaMask:", error);
      alert("Failed to connect to MetaMask.");
    }
  }

  function handleLogout() {
    localStorage.removeItem("user");
    localStorage.removeItem("walletAddress");
    navigate("/register");
  }

  // Truncate the wallet address for better display
  const getDisplayAddress = (address) => {
    return address && address.length > 10 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address;
  };

  return (
    <div className="dashboard-header">
      <div className="left-section">
        {/* <a href="/"><i className="bx bx-menu menu-icon"></i></a> */}
        <a href="/"><img src="/android-chrome-512x512.png"></img></a>
        <h1 className="dashboard-title">Dashboard</h1>
      </div>

      <div className="right-section">
        <div className="notification">
          <i className="bx bx-bell bell-icon"></i>
        </div>

        <div className="user-dropdown" onClick={() => setShowDropdown(!showDropdown)}>
          <span className="user-name">{walletAddress ? getDisplayAddress(walletAddress) : userEmail || "User"}</span>
          <i className="bx bx-chevron-down chevron-down"></i>

          {showDropdown && (
            <ul className="dropdown-menu">
              <p className="dropdown-header">
                Signed in as <strong>{userEmail || getDisplayAddress(walletAddress)}</strong>
              </p>
              {!walletAddress ? (
                <li onClick={connectMetaMask}>🔌 Connect Wallet</li>
              ) : (
                <li onClick={() => navigate("/my-timestamps")}>📜 My Timestamps</li>
              )}
              <li className="bx bx-log-out" onClick={handleLogout}>Sign out</li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
