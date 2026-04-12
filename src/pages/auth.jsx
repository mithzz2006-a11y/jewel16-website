import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

export default function Auth({ setPage }) {
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
        alert("Login successful ✅");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created ✅");
      }

      setPage("home");

    } catch (err) {
      console.error("AUTH ERROR:", err);
      alert(err.message);
    }
  };

  return (
    <div style={container}>
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

      <p
        style={{ marginTop: "10px", cursor: "pointer" }}
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "New user? Create account"
          : "Already have account? Login"}
      </p>
    </div>
  );
}

const container = {
  padding: "40px",
  background: "#0a0a0a",
  color: "white",
  minHeight: "100vh"
};

const input = {
  display: "block",
  width: "300px",
  padding: "10px",
  marginBottom: "10px",
  background: "#111",
  color: "white",
  border: "1px solid maroon"
};

const btn = {
  padding: "10px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer"
};
