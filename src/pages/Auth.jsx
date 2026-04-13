import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

export default function Auth({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    setPage("products");
  };

  const signup = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
    setPage("products");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1 style={{ color: "maroon" }}>JEWEL16 💎</h1>

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} /><br/><br/>

      <button onClick={login}>Login</button>
      <button onClick={signup}>Signup</button>
    </div>
  );
}
