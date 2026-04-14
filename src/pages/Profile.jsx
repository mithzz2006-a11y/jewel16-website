import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Profile({ user }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // 🔄 LOAD USER DATA
  useEffect(() => {
    const fetchData = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();
        setName(data.name || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
      }
    };

    fetchData();
  }, [user]);

  // 💾 SAVE USER DATA
  const save = async () => {
    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        phone,
        address,
        email: user.email,
      });

      alert("Profile Saved ✅");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={container}>
      <h1>My Profile 👤</h1>

      <p><b>Email:</b> {user.email}</p>

      <input
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <textarea
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button onClick={save}>Save Details</button>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  padding: "20px",
  maxWidth: "400px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
