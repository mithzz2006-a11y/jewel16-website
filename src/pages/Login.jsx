import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful ✅");
      setPage("admin");
    } catch (err) {
      console.error(err);
      alert("Invalid login ❌");
    }
  };

  return (
    <div style={{ padding: "40px", background: "#0a0a0a", color: "white", minHeight: "100vh" }}>
      <h1 style={{ color: "maroon" }}>Admin Login</h1>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />

      <button onClick={login} style={btnStyle}>
        Login
      </button>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "300px",
  padding: "10px",
  marginBottom: "10px",
  background: "#111",
  color: "white",
  border: "1px solid maroon"
};

const btnStyle = {
  padding: "10px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer"
};
