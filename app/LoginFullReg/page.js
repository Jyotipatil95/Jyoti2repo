"use client";
import { useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateAccountPopup from "../Component/CreateAccountPopup";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const loginRef = useRef(null);

  return (
    <main className="container my-5 mb-4">
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light position-relative">
        <div className="card shadow p-4" style={{ width: "400px" }}>
          {/* Logo + Title */}
          <h2 className="text-center mb-3 fw-bold">Let’s Go Vacation</h2>
          <h4 className="text-center mb-4">Login</h4>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email *</label>
            <input type="email" className="form-control" placeholder="Enter your email" />
          </div>

          {/* Password */}
          <div className="mb-3 position-relative">
            <label className="form-label">Password *</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Enter your password"
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="mb-3 text-end">
            <a href="#" className="text-decoration-none">FORGOT YOUR PASSWORD?</a>
          </div>

          {/* Login Button */}
          <button className="btn btn-warning w-100 mb-3 fw-bold">LOGIN</button>

          {/* Divider */}
          <div className="d-flex align-items-center my-3">
            <hr className="flex-grow-1" />
            <span className="mx-2 text-muted">either</span>
            <hr className="flex-grow-1" />
          </div>

          {/* Create Account Link */}
          <div className="text-center mt-3">
            <a
              href="#"
              className="text-primary d-block mb-2"
              onClick={(e) => {
                e.preventDefault();
                setOpenCreate(true); // show signup popup
              }}
            >
              Don’t have an account? Sign up
            </a>
          </div>
        </div>

        {/* Render Create Account Popup when openCreate is true */}
        {openCreate && (
          <div
            className="position-absolute"
            style={{ top: "20px", left: "420px", width: "400px", zIndex: 1050 }}
          >
            <CreateAccountPopup onClose={() => setOpenCreate(false)} />
          </div>
        )}
      </div>
    </main>
  );
}