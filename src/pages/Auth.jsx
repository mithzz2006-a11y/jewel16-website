import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Auth({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    try {
      let userCred;

      if (isLogin) {
        userCred = await signInWithEmailAndPassword(auth, email, password);
      } else {
        userCred = await createUserWithEmailAndPassword(auth, email, password);
      }

      setUser(userCred.user);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={container}>
      {/* LEFT BRAND SIDE */}
      <div style={left}>
        <h1 style={logo}>JEWEL16 💎</h1>
        <p style={tagline}>
          Luxury Jewellery. Timeless Elegance.
        </p>

        <p style={desc}>
          Discover premium collections crafted for perfection.
          Secure payments. Fast delivery. Trusted quality.
        </p>
      </div>

      {/* RIGHT FORM */}
      <div style={right}>
        <div style={card}>
          <h2 style={{ marginBottom: "20px" }}>
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />

          <button onClick={handleAuth} style={btn}>
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <p
            onClick={() => setIsLogin(!isLogin)}
            style={toggle}
          >
            {isLogin
              ? "New user? Create account"
              : "Already have account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  display: "flex",
  height: "100vh",
  fontFamily: "sans-serif",
};

const left = {
  flex: 1,
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "60px",
};

const logo = {
  fontSize: "50px",
  marginBottom: "10px",
};

const tagline = {
  fontSize: "20px",
  color: "#ddd",
};

const desc = {
  marginTop: "20px",
  color: "#bbb",
  maxWidth: "400px",
};

const right = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff",
};

const card = {
  width: "300px",
  padding: "30px",
  border: "1px solid #eee",
  borderRadius: "10px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
};

const input = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const btn = {
  width: "100%",
  padding: "12px",
  background: "maroon",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const toggle = {
  marginTop: "15px",
  color: "maroon",
  cursor: "pointer",
  fontSize: "14px",
  textAlign: "center",
};
