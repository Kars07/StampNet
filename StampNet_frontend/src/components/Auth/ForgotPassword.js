import React from "react";
import "../../styles/authstyle.css"; // Ensure correct path

const ForgotPassword = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Forgot Password</h2>
        <p className="auth-description">
          Enter your email address below, and we’ll send you a reset link.
        </p>
        <form>
          <input
            type="email"
            placeholder="Enter your email"
            className="auth-input"
            name="email"
            required
          />
          <button type="submit" className="auth-button">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
