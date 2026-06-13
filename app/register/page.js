// "use client";
// import { useState } from "react";

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
   
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/register", {
//       method: "POST",
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     alert(data.message);
//   };

//   return (
//     <div className="container mt-5">
//       <h2>User Registration</h2>

//       <form onSubmit={handleSubmit} className="col-md-4">

//         <input
//           type="text"
//           name="name"
//           placeholder="Enter Name"
//           className="form-control mb-3"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Email"
//           className="form-control mb-3"
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Enter Password"
//           className="form-control mb-3"
//           onChange={handleChange}
//           required
//         />
//         {/* <input
//           type="text"
//           name="Address"
//           placeholder="Enter address"
//           className="form-control mb-3"
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="string"
//           name="Contact Number"
//           placeholder="Enter Contact Number"
//           className="form-control mb-3"
//           onChange={handleChange}
//           required
//         /> */}

//         <button className="btn btn-success w-100">
//           Register
//         </button>

//       </form>
//     </div>
//   );
// }
// "use client";
// import { useState } from "react";
// import { Amplify } from "aws-amplify";
// import "../amplifyClient";
// import { signUp } from "aws-amplify/auth"; // Amplify v6 import

// export default function Register() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [message, setMessage] = useState("");
//   //const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const result = await signUp({
//         username:form.email,
//       password:form.password,
//       options: {
//         userAttributes: {
//           email:form.email,
//           given_name:form.name,
//           family_name: form.name,
          
//          },
//        }});
      
//        if (result.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
//          setSuccess("Account created! Please check your email for confirmation.");
      
//        } else {
//          setSuccess("User registered successfully!");
//        }
//        setError("");
//      } catch (err) {
//       setMessage("Error: " + err.message);
//        setError(err.message);
//        setSuccess("");
//      }
//    };
//    return (
//     <div className="container mt-5">
//       <h2>User Registration</h2>

//       <form onSubmit={handleSubmit} className="col-md-4">
//         <input
//           type="text"
//           name="name"
//           placeholder="Enter Name"
//           className="form-control mb-3"
//           onChange={handleChange}
//           required
//         />
//      <label className="form-label">Email</label>
//         <input
//           type="email"
//           name="email"
//           placeholder="Enter Email"
//           className="form-control mb-3"
//           onChange={handleChange}
//           required
//         />

//         <div className="password-field mb-3">
//   <label className="form-label">Password</label>
  
//   {/* Wrap input and icon in a relative container */}
//       <div className="position-relative">
//       <input
//       type={showPassword ? "text" : "password"}
//       name="password"
//       className="form-control pe-5"
//       placeholder="Password"
//       value={form.password}
//       onChange={handleChange}
//     />
//     <i
//       className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3 text-muted`}
//       style={{ cursor: "pointer", zIndex: 10 }}
//       onClick={() => setShowPassword(!showPassword)}
//     ></i>
//   </div>
// </div>

//         <button className="btn btn-success w-100">Register</button>
//       </form>

//       {message && <p className="mt-3">{message}</p>}
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { signUp, confirmSignUp, resendSignUpCode, resetPassword, confirmResetPassword } from "aws-amplify/auth";
import "../amplifyClient";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [step, setStep] = useState("register"); // register | confirm | forgot | reset

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signUp({
        username: form.email,
        password: form.password,
        options: {
          userAttributes: {
            email: form.email,
            given_name: form.name,
            family_name: form.name,
          },
        },
      });

      if (result.nextStep.signUpStep === "CONFIRM_SIGN_UP") {
        setMessage("Account created! Check your email for the confirmation code.");
        setStep("confirm");
      } else {
        setMessage("User registered successfully!");
      }
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await confirmSignUp({ username: form.email, confirmationCode: code });
      setMessage("Account confirmed successfully! You can now log in.");
      setStep("register");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: form.email });
      setMessage("Confirmation code resent to your email.");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await resetPassword({ username: form.email });
      setMessage("Password reset code sent to your email.");
      setStep("reset");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await confirmResetPassword({
        username: form.email,
        confirmationCode: code,
        newPassword: form.password,
      });
      setMessage("Password reset successfully! You can now log in.");
      setStep("register");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>User Registration</h2>

      {step === "register" && (
        <form onSubmit={handleSubmit} className="col-md-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <div className="position-relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              className="form-control pe-5"
              onChange={handleChange}
              required
            />
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} position-absolute top-50 end-0 translate-middle-y me-3 text-muted`}
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <button className="btn btn-success w-100 mb-2">Register</button>
          <button
            type="button"
            className="btn btn-link w-100"
            onClick={() => setStep("forgot")}
          >
            Forgot Password?
          </button>
        </form>
      )}

      {step === "confirm" && (
        <form onSubmit={handleConfirm} className="col-md-4">
          <input
            type="text"
            placeholder="Enter Confirmation Code"
            className="form-control mb-3"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button className="btn btn-primary w-100 mb-2">Confirm Account</button>
          <button
            type="button"
            className="btn btn-link w-100"
            onClick={handleResendCode}
          >
            Resend Code
          </button>
        </form>
      )}

      {step === "forgot" && (
        <form onSubmit={handleForgotPassword} className="col-md-4">
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <button className="btn btn-warning w-100">Send Reset Code</button>
        </form>
      )}

      {step === "reset" && (
        <form onSubmit={handleResetPassword} className="col-md-4">
          <input
            type="text"
            placeholder="Enter Reset Code"
            className="form-control mb-3"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter New Password"
            className="form-control mb-3"
            onChange={handleChange}
            required
          />
          <button className="btn btn-success w-100">Reset Password</button>
        </form>
      )}

      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}