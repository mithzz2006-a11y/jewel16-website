import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

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
      <div style={brand}>
        <h1 style={logo}>JEWEL16 💎</h1>
        <p style={slogan}>Elegance that defines you</p>
      </div>

      {/* 🔐 LOGIN BOX */}
      <div style={box}>
        <h2 style={{ marginBottom: "20px" }}>
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
      </div>

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
  background: "#0a0a0a"
};

const brand = {
  textAlign: "center",
  marginBottom: "30px"
};

const logo = {
  fontSize: "36px",
  fontWeight: "bold",
  letterSpacing: "2px",
  color: "white"
};

const slogan = {
  color: "#aaa",
  fontSize: "14px",
  marginTop: "5px",
  fontStyle: "italic"
};

const box = {
  background: "#111",
  padding: "40px",
  borderRadius: "12px",
  border: "1px solid maroon",
  width: "320px",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(128,0,0,0.3)"
};

const input = {
  display: "block",
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  background: "#1a1a1a",
  color: "white",
  border: "1px solid maroon",
  borderRadius: "6px"
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "maroon",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px"
};

const switchText = {
  marginTop: "12px",
  fontSize: "13px",
  color: "#ccc",
  cursor: "pointer"
};
