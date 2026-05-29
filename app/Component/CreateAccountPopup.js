"use client";
import { useRef, useEffect } from "react";

export default function CreateAccountPopup({ onClose, onSwitchToLogin }) {
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={popupRef}
      className="card shadow-sm p-4 position-absolute"
      style={{ top: "100%", left: "0", width: "300px", zIndex: 1050 }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="fw-bold text-primary mb-0">Create Account</h6>
        <button type="button" className="btn-close" onClick={onClose}></button>
      </div>

      <form>
        {/* Name + Last Name */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label fw-semibold">Name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="firstName" required />
          </div>
          <div className="col">
            <label className="form-label fw-semibold">Last name <span className="text-danger">*</span></label>
            <input type="text" className="form-control" name="lastName" required />
          </div>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email <span className="text-danger">*</span></label>
          <input type="email" className="form-control" name="email" placeholder="your@email.com" required />
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Telephone (optional)</label>
          <input type="text" className="form-control" name="phone" placeholder="+1234567890" />
          <small className="text-muted">Example: +1234567890 or 1234567890</small>
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Password <span className="text-danger">*</span></label>
          <input type="password" className="form-control" name="password" required />
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Confirm Password <span className="text-danger">*</span></label>
          <input type="password" className="form-control" name="confirmPassword" required />
        </div>

        <div className="mb-3">
          <small className="text-muted">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-primary">Terms and Conditions</a> and{" "}
            <a href="#" className="text-primary">Privacy Policy</a>.
          </small>
        </div>

        <button type="submit" className="btn btn-warning w-100 fw-bold mb-3">
          Create Account
        </button>

        {/* Switch to Login */}
        <div className="text-center mb-3">
          <hr />
          <p className="text-muted">Do you already have an account?</p>
          <button
            type="button"
            className="btn btn-outline-primary w-100"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </div>

        <div className="mt-3 pt-3 border-top">
          <p className="text-muted small">
            After registration, you will be redirected to the login page to log in and then verify your account.
          </p>
        </div>
      </form>
    </div>
  );
}