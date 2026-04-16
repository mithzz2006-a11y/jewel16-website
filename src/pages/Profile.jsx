import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Profile({ user }) {
  const [data, setData] = useState({
    name: "",
    phone: "",
    address: "",
    instruction: ""
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setData({
          name: snap.data().name || "",
          phone: snap.data().phone || "",
          address: snap.data().address || "",
          instruction: snap.data().instruction || ""
        });
      }
    };

    loadData();
  }, [user]);

  const saveProfile = async () => {
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      ...data
    }, { merge: true });

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={container}>
      <h2>👤 Your Profile</h2>

      <div style={card}>
        <p style={email}>{user.email}</p>

        <input
          placeholder="Full Name"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          placeholder="Phone Number"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />

        <textarea
          placeholder="Delivery Address"
          value={data.address}
          onChange={(e) => setData({ ...data, address: e.target.value })}
        />

        <textarea
          placeholder="Delivery Instructions (Optional)"
          value={data.instruction}
          onChange={(e) => setData({ ...data, instruction: e.target.value })}
        />

        <button onClick={saveProfile}>Save Profile</button>

        {saved && <p style={{ color: "green" }}>Saved ✔</p>}
      </div>
    </div>
  );
}

/* 🎨 PREMIUM UI */
const container = {
  padding: "20px",
  background: "linear-gradient(to right, #2c0000, #800000)",
  minHeight: "100vh",
  color: "white"
};

const card = {
  background: "white",
  color: "black",
  padding: "20px",
  borderRadius: "12px",
  maxWidth: "400px",
  margin: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};

const email = {
  fontSize: "12px",
  color: "gray"
};
