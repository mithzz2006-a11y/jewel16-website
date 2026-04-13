import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Auth({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    setUser(res.user);
  };

  const signup = async () => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    setUser(res.user);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>JEWEL16 💎</h1>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={login}>Login</button>
      <button onClick={signup}>Signup</button>
    </div>
  );
}
