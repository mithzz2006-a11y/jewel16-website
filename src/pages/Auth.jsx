import { useState } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Auth({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, password);
    setPage("home");
  };

  const signup = async () => {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    // 🔐 SAVE USER ROLE
    await setDoc(doc(db, "users", res.user.uid), {
      email,
      role: "user"
    });

    setPage("home");
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>JEWEL16 💎</h1>

      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} /><br/><br/>

      <button onClick={login}>Login</button>
      <button onClick={signup}>Signup</button>
    </div>
  );
}
