"use client";
import {  useState, useEffect, useRef } from "react";
import {
  signIn,
  confirmSignIn,
  signUp,
  confirmSignUp,
  resendSignUpCode,
  signOut,
  resetPassword,
  confirmResetPassword,
} from "aws-amplify/auth";
import { fetchAuthSession } from "aws-amplify/auth";
import { post } from "aws-amplify/api";
import { getCurrentUser } from "aws-amplify/auth";
import {Form, Button, Alert } from "react-bootstrap";

export default function AuthPopup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [mode, setMode] = useState("login"); // login | signup | confirm | mfa
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userSession, setUserSession] = useState(null);
 //forget password
  //const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState('login'); // login | forgot | reset
  const popupRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);

 //get current user
    useEffect(() => {
    checkUser();
    }, []);
    //Auto clear msg
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
  
  // --- LOGIN ---
  
//    const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     // Step 1: Sign in user with Cognito
//     const signInResult = await signIn({
//       username: email.trim(),
//       password,
//     });

//     console.log("Sign in tracking:", signInResult);

//     // Guard rail: Stop if Cognito requires extra steps (like MFA or Force Change Password)
//     if (signInResult.nextStep.signInStep !== 'DONE') {
//       console.warn("Additional authentication steps required:", signInResult.nextStep);
//       return;
//     }

//     // Optional Step 2: Session retrieval
//     // Note: Since your /v1/auth/login API has "Authorization: NONE", you don't strictly 
//     // need this token for this specific call. Keep it if your backend code manually 
//     // parses headers despite API Gateway's settings, otherwise you can remove this step.
//     const session = await fetchAuthSession();
//     const token = session.tokens?.idToken?.toString();

//     // Step 3: Call API Gateway (Matching image_567ba3.jpg & image_567c3d.jpg specifications)
//     const restOperation = post({
//       apiName: "myApi",
//       path: "/v1/auth/login",
//       options: {
//         headers: {
//           "Content-Type": "application/json",
//           // Only include Authorization if your underlying Lambda/Backend code parses it manually
//           ...(token && { "Authorization": `Bearer ${token}` }) 
//         },
//         body: {
//           username: email.trim(),
//         },
//       },
//     });

//     // Handle and parse the response safely
//     const response = await restOperation.response;
//     const data = await response.body.json();

//     console.log("API response:", data);

//   } catch (error) {
//     console.error("AUTH OR API ERROR:", error);
//   }
// };
    
    const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await signIn({
      username: email,
      password,
    });

    if (
      response.nextStep.signInStep ===
        "CONFIRM_SIGN_IN_WITH_SMS_CODE" ||
      response.nextStep.signInStep ===
        "CONFIRM_SIGN_IN_WITH_TOTP_CODE"
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
  //checkuser
     
  const checkUser = async () => {
  try {
    const user = await getCurrentUser();

    console.log("CURRENT USER:", user);

    setUserSession(user);
  } catch (error) {
    console.log("AUTH ERROR:", error);
  }
};
  // --- MFA ---
  const handleMfaSubmit = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await confirmSignIn({challengeResponse: mfaCode,});
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
       }});
       if (result.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
         setSuccess("Account created! Please check your email for confirmation.");
         setMode("confirm"); // switch to confirm step
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

  //forgot password
  // async function handleForgotPassword() {
  //   try {
  //    await resetPassword({ username: email });
  //     alert('Verification code sent to your email.');
  //     setStep('reset');
  //   } catch (error) {
  //     console.error('Error sending reset code:', error);
  //   }
  // }
  //handle forgot password
  async function handleForgotPassword() {
  try {
    const output = await resetPassword({ username: email.trim() });
    console.log("Code delivery details:", output.nextStep.codeDeliveryDetails);
    
    // This will print something like: 
    // { deliveryMedium: "EMAIL", destination: "j***@d***.com" }
    
    alert('Verification code sent to your email.');
    setStep("reset");
    
  } catch (error) {
  // 1. Logs the full error object structure to the console
  console.error('Full Amplify Error Object:', error); 
  
  // 2. Grabs the specific Cognito message (e.g., "UserNotFoundException")
  console.error('Cognito Error Name:', error.name);
  console.error('Cognito Error Message:', error.message);
}
}
  //handle reset password
  async function handleResetPassword() {
  try {
    await confirmResetPassword({
      username: email.trim(),
      confirmationCode: code.trim(),
      newPassword: newPassword.trim(), // optional: trim for safety
    });
    
    alert("Password successfully reset!");
    setStep("login");
  } catch (error) {
    console.error("Error resetting password:", error);
    if (error.name === "CodeMismatchException") {
      alert("Invalid or expired code. Please request a new one.");
    } else {
      alert(error.message); // show other errors like InvalidPasswordException
    }
  }
}
  return (
    <div className="position-relative d-inline-block ">
      {/* Trigger button */}
      <Button variant="primary" 
      className="btn btn-primary fw-bold rounded-pill position-relative bottom-0 end-0 m-4 px-4 py-2 shadow-lg "
      onClick={() => setShowPopup(!showPopup)}>
        Login
      </Button>
      {/* User icon */}
        <i className="bi bi-person-circle fs-3 text-primary rounded-circle p-2 me-4 icon-down"
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

          {/* LOGIN FORM */}
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
  
  {/* Wrap input and icon in a relative container */}
  <div className="position-relative">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control pe-5" // pe-5 adds padding-right so text doesn't overlap the eye
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <i
      className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3 text-muted`}
      style={{ cursor: "pointer", zIndex: 10 }}
      onClick={() => setShowPassword(!showPassword)}
    ></i>
  </div>
</div>
                <br></br>
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

          {/* forgot password */}
          <>
      {step === 'login' && (
        <div>
          {/* your existing login form */}
          <button onClick={() => setStep('forgot')}>Forgot Password?</button>
          
        </div>
      )}

      {step === 'forgot' && (
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleForgotPassword}>Send Code</button>
        </div>
      )}

      {step === 'reset' && (
  <div>
    <input
      type="text"
      placeholder="Enter code"
      value={code}
      onChange={(e) => setCode(e.target.value)}
    />

    <div className="position-relative">
      <input
        type={showPassword ? "text" : "password"}
        placeholder="New password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="form-control"
      />
      <i
        className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-4`}
        style={{ cursor: "pointer" }}
        onClick={() => setShowPassword(!showPassword)}
      ></i>
    </div>

    <button onClick={handleResetPassword}>Reset Password</button>
  </div>
)}
    </>
          {/* SIGNUP FORM */}
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
        autoFocus
      />
    </Form.Group>

    <Form.Group className="mb-2">
      <div className="password-field mb-3">
  <label className="form-label">Password</label>
  
  {/* Wrap input and icon in a relative container */}
  <div className="position-relative">
    <input
      type={showPassword ? "text" : "password"}
      className="form-control pe-5" // pe-5 adds padding-right so text doesn't overlap the eye
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <i
      className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3 text-muted`}
      style={{ cursor: "pointer", zIndex: 10 }}
      onClick={() => setShowPassword(!showPassword)}
    ></i>
  </div>
</div>
      {/* <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        
      /> */}
       
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

          {/* CONFIRM SIGNUP FORM */}
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
              <Button
                variant="link"
                className="w-100 mt-2"
                onClick={handleResendCode}
              >
                Resend Code
              </Button>
              <Button
                variant="link"
                className="w-100 mt-2"
                onClick={() => setMode("login")}
              >
                Back to Login
              </Button>
            </Form>
          )}

          {/* MFA FORM */}
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
// try {
//     const response = await fetch(
//       'https://dn5wcoauce.execute-api.us-east-2.amazonaws.com/dev/v1/auth/login',
//      {
//         method: 'POST',
//          headers: { 'Content-Type': 'application/json' },
//          body: JSON.stringify({username: email, password }),
//        }
//      );
//      console.log("Payload:", { email, password });
//      if (!response.ok) {
//        throw new Error(`HTTP error! Status: ${response.status}`);
//      }
//      const data = await response.json();
//      console.log('Login response:', data);
//    } catch (error) {
//      console.error('AUTH ERROR:', error);
//    }