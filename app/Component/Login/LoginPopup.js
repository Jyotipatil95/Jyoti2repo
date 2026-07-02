"use client";
import { useState, useEffect, useRef } from "react";
import {
  signIn,
  confirmSignIn,
  signUp,
  confirmSignUp,
  resendSignUpCode,
  signOut,
  resetPassword,
  confirmResetPassword,
  getCurrentUser,
} from "aws-amplify/auth";
import { Form, Button, Alert } from "react-bootstrap";

export default function AuthPopup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  // Unified mode state: login | signup | confirm | mfa | forgot | reset
  const [mode, setMode] = useState("login"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userSession, setUserSession] = useState(null);
  
  // Forgot password specific fields
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  const popupRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  // Get current user on load
  useEffect(() => {
    checkUser();
  }, []);

  // Auto-clear success/error notifications
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  const checkUser = async () => {
    try {
      const user = await getCurrentUser();
      console.log("CURRENT USER:", user);
      setUserSession(user);
    } catch (error) {
      console.log("AUTH ERROR:", error);
    }
  };

  // --- LOGIN ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn({
        username: email,
        password,
      });

      if (
        response.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_SMS_CODE" ||
        response.nextStep.signInStep === "CONFIRM_SIGN_IN_WITH_TOTP_CODE"
      ) {
        setMode("mfa");
      } else if (response.isSignedIn) {
        const currentUser = await getCurrentUser();
        setUserSession(currentUser);
        setSuccess("Login successful");
        setShowPopup(true);
      }
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  // --- MFA ---
  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await confirmSignIn({ challengeResponse: mfaCode });
      setSuccess(`MFA verified. Welcome ${loggedUser.username}`);
      setMode("login");
      setError("");
      setMfaCode("");
      setUserSession(loggedUser);
    } catch (err) {
      setError(err.message);
    }
  };

  // --- SIGNUP ---
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            given_name: firstName,
            family_name: lastName,
          },
        },
      });
      if (result.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        setSuccess("Account created! Please check your email for confirmation.");
        setMode("confirm");
      } else {
        setSuccess("Account created successfully!");
      }
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  // --- CONFIRM SIGNUP ---
  const handleConfirmSignup = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp({ username: email, confirmationCode: confirmCode });
      setSuccess("Account confirmed! You can now log in.");
      setMode("login");
      setError("");
      setConfirmCode("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: email });
      setSuccess("Confirmation code resent. Please check your email/SMS.");
      setError("");
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  // --- LOGOUT ---
  const handleLogout = async () => {
    try {
      await signOut();
      setSuccess("Logged out successfully.");
      setUserSession(null);
      setEmail("");
      setPassword("");
      setMode("login");
      setShowPopup(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // --- FORGOT PASSWORD ---
  const handleForgotPassword = async (e) => {
  e.preventDefault();
  setError(''); // Clear previous errors
  setSuccess('');

  try {
    const output = await resetPassword({ username: email.trim() });
    console.log("Code delivery details:", output.nextStep.codeDeliveryDetails);
    setSuccess('Verification code sent to your email.');
    setMode("reset");
  } catch (err) {
    console.error("Error resetting password:", err);
    
    // Catching the limit exceeded error specifically
    if (err.name === 'LimitExceededException' || err.message.includes('Limit exceeded')) {
      setError('Too many requests. Please wait a few minutes before trying again.');
    } else {
      setError(err.message || 'An error occurred. Please try again.');
    }
  }
};
  // async function handleForgotPassword(e) {
  //   e.preventDefault();
  //   try {
  //     const output = await resetPassword({ username: email.trim() });
  //     console.log("Code delivery details:", output.nextStep.codeDeliveryDetails);
  //     setSuccess('Verification code sent to your email.');
  //     setMode("reset");
  //   } catch (error) {
  //     setError(error.message);
  //     console.error('Full Amplify Error Object:', error);
  //   }
  // }

  // --- RESET PASSWORD ---
  async function handleResetPassword(e) {
    e.preventDefault();
    try {
      await confirmResetPassword({
        username: email.trim(),
        confirmationCode: code.trim(),
        newPassword: newPassword.trim(),
      });
      setSuccess("Password successfully reset!");
      setMode("login");
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.name === "CodeMismatchException") {
        setError("Invalid or expired code. Please request a new one.");
      } else {
        setError(error.message);
      }
    }
  }

  return (
    <div className="position-relative d-flex align-items-center justify-content-end gap-2 gap-lg-4">
      {/* Trigger button */}
      <Button
        variant="primary"
        className="fw-bold rounded-pill px-3 py-1 shadow-lg"
        onClick={() => setShowPopup(!showPopup)}
      >
        Login
      </Button>

      {/* User icon */}
      <i
        className="bi bi-person-circle fs-3 text-primary rounded-circle p-2 icon-down"
        title={userSession?.signInDetails?.loginId}
      ></i>

      {/* Popup card */}
      {showPopup && (
        <div
          ref={popupRef}
          className="card shadow position-absolute p-3"
          style={{ top: "110%", left: 0, width: "300px", zIndex: 1000 }}
        >
          <h5 className="mb-3">
            {mode === "login" && "Login"}
            {mode === "signup" && "Create Account"}
            {mode === "confirm" && "Confirm Account"}
            {mode === "mfa" && "Verify MFA"}
            {mode === "forgot" && "Forgot Password"}
            {mode === "reset" && "Reset Password"}
          </h5>
          <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-2"
            aria-label="Close"
            onClick={() => setShowPopup(false)}
          ></button>

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          {/* If logged in, show logout */}
          {userSession && (
            <Button
              variant="secondary"
              className="w-100 mb-3"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}

          {/* 1. LOGIN FORM */}
          {mode === "login" && !userSession && (
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>
              <div className="password-field mb-3">
                <label className="form-label">Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control pe-5"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3 text-muted`}
                    style={{ cursor: "pointer", zIndex: 10 }}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </div>
              
              {/* Forgot password explicitly bound within the Login block */}
              <div className="text-end mb-3">
                <Button 
                  variant="link" 
                  className="p-0 text-decoration-none sm" 
                  onClick={() => setMode('forgot')}
                >
                  Forgot Password?
                </Button>
              </div>

              <Button type="submit" variant="primary" className="w-100">
                Login
              </Button>
              <Button
                variant="link"
                className="w-100 mt-2"
                onClick={() => setMode("signup")}
              >
                New user? Create Account
              </Button>
            </Form>
          )}

          {/* 2. FORGOT PASSWORD FORM */}
          {mode === 'forgot' && (
            <Form onSubmit={handleForgotPassword}>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100 mb-2">
                Send Code
              </Button>
              <Button variant="link" className="w-100" onClick={() => setMode('login')}>
                Back to Login
              </Button>
            </Form>
          )}

          {/* 3. RESET PASSWORD FORM */}
          {mode === 'reset' && (
            <Form onSubmit={handleResetPassword}>
              <Form.Group className="mb-2">
                <Form.Label>Verification Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter code"
                  autoComplete="one-time-code" // <-- Prevents email autofill
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <div className="position-relative">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    autoComplete="new-password" // <-- Tells browser this is a new password
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3 text-muted`}
                    style={{ cursor: "pointer", zIndex: 10 }}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </Form.Group>

              <Button type="submit" variant="success" className="w-100">
                Reset Password
              </Button>
            </Form>
          )}

          {/* 4. SIGNUP FORM */}
          {mode === "signup" && (
            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-2">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <label className="form-label">Password</label>
                <div className="position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control pe-5"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3 text-muted`}
                    style={{ cursor: "pointer", zIndex: 10 }}
                    onClick={() => setShowPassword(!showPassword)}
                  ></i>
                </div>
              </Form.Group>

              <Button type="submit" variant="success" className="w-100">
                Sign Up
              </Button>
              <Button
                variant="link"
                className="w-100 mt-2"
                onClick={() => setMode("login")}
              >
                Already have an account? Login
              </Button>
            </Form>
          )}

          {/* 5. CONFIRM SIGNUP FORM */}
          {mode === "confirm" && (
            <Form onSubmit={handleConfirmSignup}>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Confirmation Code</Form.Label>
                <Form.Control
                  type="text"
                  value={confirmCode}
                  onChange={(e) => setConfirmCode(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>
              <Button type="submit" variant="success" className="w-100">
                Confirm Sign Up
              </Button>
              <Button variant="link" className="w-100 mt-2" onClick={handleResendCode}>
                Resend Code
              </Button>
              <Button variant="link" className="w-100 mt-2" onClick={() => setMode("login")}>
                Back to Login
              </Button>
            </Form>
          )}

          {/* 6. MFA FORM */}
          {mode === "mfa" && (
            <Form onSubmit={handleMfaSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>MFA Code</Form.Label>
                <Form.Control
                  type="text"
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  required
                  autoFocus
                />
              </Form.Group>
              <Button type="submit" variant="success" className="w-100">
                Verify MFA
              </Button>
            </Form>
          )}
        </div>
      )}
    </div>
  );
}