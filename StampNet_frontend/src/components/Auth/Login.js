import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";
import "../../styles/authstyle.css"; // Ensure correct path

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="authLogin-container">
      <div className="authLogin-box">
        <h2 className="authLogin-title">Hello Again!</h2>
        <p className="authLogin-description">
          Let's get started with uploading your media.
        </p>
        <form>
          <div className="authLogin-input-container">
            <input type="email" name="email" placeholder="Email" className="authLogin-input" required />
            <i className="bx bx-envelope"></i>
          </div>
          <div className="authLogin-input-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="authLogin-input"
              required
            />
            <i
              className={`bx ${showPassword ? "bx-show" : "bx-hide"}`}
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer" }}
            ></i>
          </div>
          <a href="/forgot-password" className="authLogin-recovery">Forgot Password?</a>
          <button type="submit" className="authLogin-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
