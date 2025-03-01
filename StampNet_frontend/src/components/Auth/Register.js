import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; // To decode user info
import { ethers } from "ethers";
import "../../styles/authstyle.css";
import "boxicons/css/boxicons.min.css";
import { useNavigate } from "react-router-dom";
import metamaskLogo from "../../assest/metamask-logo.jpg";


const Register = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Google User Info:", decoded);

    // Store user details in local storage or context (optional)
    localStorage.setItem("user", JSON.stringify(decoded));

    // Redirect to dashboard
    navigate("/dashboard");
  };

  const handleGoogleFailure = () => {
    console.error("Google login failed. Please try again.");
  };

  const connectMetaMask = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed. Please install it to continue.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      // Optional: Sign a message for verification
      const message = "Sign this message to confirm your registration.";
      const signature = await signer.signMessage(message);

      console.log("Wallet Address:", address);
      console.log("Signature:", signature);

      setWalletAddress(address);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("MetaMask connection error:", error);
      alert("Failed to connect MetaMask.");
    }
  };

  return (
    <GoogleOAuthProvider clientId="928054430273-posucfe5csj0rqjfiph4duebglhbfu3s.apps.googleusercontent.com">
      <div className="Authregister-container">
        <div className="Authregister-box">
          <h2 className="Authregister-title">Sign In</h2>
          <p className="Authregister-subtitle">Choose a sign-up method</p>

          {/* Google Sign-In */}
          <div className="Authregister-google">
            <GoogleLogin 
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleFailure}
            />
          </div>

          {/* MetaMask Sign-In Styled Like Google Button */}
          <button onClick={connectMetaMask} className="Authregister-button metamask">
            <img src={metamaskLogo} alt="MetaMask Logo" className="Authregister-logo" />
            Sign in with MetaMask
          </button>

          {walletAddress && <p className="Authregister-wallet">Connected Wallet: {walletAddress}</p>}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Register;