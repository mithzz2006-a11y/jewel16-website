import { useState } from "react";

export default function Profile({ user }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const save = () => {
    localStorage.setItem(
      "profile",
      JSON.stringify({ name, phone, address })
    );
    alert("Saved ✅");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Profile 👤</h1>

      <p>Email: {user.email}</p>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <br />
      <input placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
      <br />
      <textarea placeholder="Address" onChange={(e) => setAddress(e.target.value)} />

      <br />
      <button onClick={save}>Save Details</button>
    </div>
  );
}
