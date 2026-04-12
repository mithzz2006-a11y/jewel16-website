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
      <div style={box}>
        <h1 style={{ color: "maroon" }}>
          {isLogin ? "Login" : "Create Account"}
        </h1>

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

        <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
          {isLogin ? "Create account" : "Already have account?"}
        </p>
      </div>
    </div>
  );
}

/* STYLES */

const outer = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#0a0a0a"
};

const box = {
  background: "#111",
  padding: "40px",
  borderRadius: "10px",
  border: "1px solid maroon",
  textAlign: "center",
  width: "300px"
};

const input = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  background: "#1a1a1a",
  color: "white",
  border: "1px solid maroon"
};

const btn = {
  padding: "10px",
  width: "100%",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold"
};
