"use client";
import { useState, useRef, useEffect } from "react";
import CreateAccountPopup from "../Component/CreateAccountPopup"; // check path

import Link from "next/link";
export default function LoginPopup() {
  const [openLogin, setOpenLogin] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const loginRef = useRef(null);

  // Close login popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setOpenLogin(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="position-relative d-inline-block">
      {/* Login Button */}
      <button
        type="button"
        className="btn btn-primary fw-bold"
        onClick={() => setOpenLogin(!openLogin)}
      >
        Login
      </button>

      {/* Login Popup */}
      {openLogin && (
        <div
          ref={loginRef}
          className="card shadow-sm p-4 position-absolute"
          style={{ top: "100%", left: "0", width: "300px", zIndex: 1050 }}
        >
          <h5 className="text-center text-primary fw-bold mb-4">Login</h5>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-semibold">
                Email <span className="text-danger">*</span>
              </label>
              <input type="email" id="email" className="form-control" required autoFocus />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-semibold">
                Password <span className="text-danger">*</span>
              </label>
              <input type="password" id="password" className="form-control" required />
            </div>
            <button type="submit" className="btn btn-warning w-100 fw-bold">Login</button>
          </form>
          {/* sign up */}
          <div className="text-center mt-3">
            <a
              href="#"
              className="text-primary d-block mb-2"
              onClick={(e) => {
                e.preventDefault();
                setOpenLogin(false);
                setOpenCreate(true); // open signup popup
              }}
            >
              Don’t have an account? Sign up
            </a>
          </div>
          {/* B2B access */}
          <div className="text-center mt-3">
            <Link href="/TravelAgentReg" className="text-primary d-block mb-2">
        Are you an agency? B2B access
      </Link>
          </div>
          {/* login access form */}
            <div className="text-center mt-3">
                <Link href="/LoginFullReg" className="text-primary d-block mb-2">
                 Do you prefer a full page?Go to login page
                </Link>
            </div>
        </div>
      )}

      {/* Separate Create Account Popup */}
      {openCreate && (
        <CreateAccountPopup
          onClose={() => setOpenCreate(false)}
          onSwitchToLogin={() => {
            setOpenCreate(false);
            setOpenLogin(true); // switch back to login popup
          }}
        />
      )}
    </div>
  );
}