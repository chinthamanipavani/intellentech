// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await axios.post(
//         "https://intellentech-3lxa.onrender.com/api/users/forgot-password",
//         { email }
//       );

//       alert("Go to your email to reset your password.");
//       navigate("/login");
//     } catch (err) {
//       alert(
//         err.response?.data?.message ||
//           "Failed to send reset email. Try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <style>
//         {`
//         .fp-container {
//           min-height: 100vh;
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           background: #f3f4f6;
//           font-family: Arial;
//         }
//         .fp-card {
//           background: white;
//           padding: 30px;
//           border-radius: 12px;
//           box-shadow: 0 5px 20px rgba(0,0,0,.1);
//           width: 100%;
//           max-width: 400px;
//         }
//         .fp-title {
//           text-align: center;
//           font-size: 22px;
//           font-weight: 700;
//           margin-bottom: 10px;
//         }
//         .fp-sub {
//           text-align: center;
//           color: gray;
//           margin-bottom: 20px;
//         }
//         .fp-input {
//           width: 100%;
//           padding: 10px;
//           border-radius: 6px;
//           border: 1px solid #ccc;
//           margin-bottom: 15px;
//         }
//         .fp-btn {
//           width: 100%;
//           padding: 10px;
//           border: none;
//           border-radius: 6px;
//           background: #3b82f6;
//           color: white;
//           font-weight: 600;
//           cursor: pointer;
//         }
//         .fp-btn:disabled {
//           background: #93c5fd;
//         }
//         `}
//       </style>

//       <div className="fp-container">
//         <div className="fp-card">
//           <h2 className="fp-title">Forgot Password</h2>
//           <p className="fp-sub">Enter your email to reset your password</p>

//           <form onSubmit={handleSubmit}>
//             <input
//               type="email"
//               className="fp-input"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <button className="fp-btn" disabled={loading}>
//               {loading ? "Sending..." : "Send Reset Link"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;
import React from 'react'

const ForgotPassword = () => {
  return (
    <div>ForgotPassword</div>
  )
}

export default ForgotPassword