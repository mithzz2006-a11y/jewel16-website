import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function Profile() {

  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const snap = await getDoc(doc(db, "users", user.uid));

    if (snap.exists()) {
      setProfile(snap.data());
    }
  };

  const saveProfile = async () => {
    const user = auth.currentUser;

    await setDoc(doc(db, "users", user.uid), {
      ...profile,
      email: user.email
    });

    alert("Profile saved ✅");
  };

  return (
    <div style={container}>
      <h1 style={title}>My Profile</h1>

      <input
        placeholder="Full Name"
        value={profile.name}
        onChange={(e)=>setProfile({...profile,name:e.target.value})}
      />

      <input
        placeholder="Phone Number"
        value={profile.phone}
        onChange={(e)=>setProfile({...profile,phone:e.target.value})}
      />

      <textarea
        placeholder="Full Address"
        value={profile.address}
        onChange={(e)=>setProfile({...profile,address:e.target.value})}
      />

      <button onClick={saveProfile}>Save Profile</button>
    </div>
  );
}

/* 🎨 PREMIUM STYLE */

const container = {
  maxWidth: "400px",
  margin: "50px auto",
  padding: "20px",
  background: "white",
  border: "2px solid black",
  textAlign: "center"
};

const title = {
  color: "maroon"
};
