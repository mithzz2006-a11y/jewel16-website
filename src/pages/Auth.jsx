import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { motion } from "framer-motion";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={outer}>

      {/* 💎 BRAND */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={brand}
      >
        <h1 style={logo}>JEWEL16</h1>
        <p style={slogan}>Crafted for Timeless Elegance</p>
      </motion.div>

      {/* 🔐 LOGIN BOX */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={box}
      >
        <h2 style={{ marginBottom: "20px", color: "white" }}>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={input}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={input}
        />

        <button onClick={handleAuth} style={btn}>
          {isLogin ? "Login" : "Signup"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)} style={switchText}>
          {isLogin ? "New user? Create account" : "Already have account? Login"}
        </p>
      </motion.div>

    </div>
  );
}

/* 💎 STYLES */

const outer = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "radial-gradient(circle at top, #1a1a1a, #000000)"
};

const brand = {
  textAlign: "center",
  marginBottom: "40px"
};

const logo = {
  fontSize: "48px",
  fontWeight: "bold",
  letterSpacing: "3px",
  background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 0 20px rgba(255,215,0,0.4)"
};

const slogan = {
  color: "#ccc",
  fontSize: "14px",
  marginTop: "8px",
  letterSpacing: "1px"
};

const box = {
  background: "rgba(20,20,20,0.9)",
  padding: "40px",
  borderRadius: "15px",
  border: "1px solid rgba(255,215,0,0.3)",
  width: "340px",
  textAlign: "center",
  backdropFilter: "blur(10px)",
  boxShadow: "0 0 40px rgba(255,215,0,0.15)"
};

const input = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  background: "#111",
  color: "white",
  border: "1px solid rgba(255,215,0,0.3)",
  borderRadius: "6px"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "linear-gradient(90deg, #FFD700, #FFA500)",
  color: "black",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "15px",
  boxShadow: "0 0 15px rgba(255,215,0,0.4)"
};

const switchText = {
  marginTop: "14px",
  fontSize: "13px",
  color: "#aaa",
  cursor: "pointer"
};
