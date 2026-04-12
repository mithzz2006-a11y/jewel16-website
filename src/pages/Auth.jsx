import { useState } from "react";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    if (isLogin) {
      await signInWithEmailAndPassword(auth, email, password);
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
    }
  };

  return (
    <div style={outer}>
      <div style={box}>
        <h1 style={{ color: "maroon" }}>JEWEL16</h1>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} style={input}/>
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} style={input}/>

        <button onClick={handleAuth} style={btn}>
          {isLogin ? "Login" : "Signup"}
        </button>

        <p onClick={() => setIsLogin(!isLogin)}>Switch</p>
      </div>
    </div>
  );
}

const outer = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff"
};

const box = {
  padding: "40px",
  border: "2px solid black",
  textAlign: "center"
};

const input = {
  display: "block",
  margin: "10px 0",
  padding: "10px",
  border: "1px solid black"
};

const btn = {
  padding: "10px",
  border: "1px solid black",
  background: "#fff",
  color: "maroon",
  cursor: "pointer"
};
