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
        alert("Login successful");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Account created");
      }

      setPage("home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "40px", color: "white", background: "#0a0a0a" }}>
      <h1>{isLogin ? "Login" : "Signup"}</h1>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <button onClick={handleAuth}>
        {isLogin ? "Login" : "Signup"}
      </button>

      <p onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Create account" : "Already have account?"}
      </p>
    </div>
  );
}
