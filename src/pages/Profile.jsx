import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Profile({ user }) {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setWishlist(snap.data().wishlist || []);
      }
    });

    return () => unsub();
  }, [user]);

  return (
    <div style={container}>

      <h2>👤 Profile</h2>
      <p>{user.email}</p>

      <h3 style={{ marginTop: "20px" }}>❤️ Wishlist</h3>

      {wishlist.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div style={grid}>
          {wishlist.map((item, i) => (
            <div key={i} style={card}>
              <img src={item.image} style={img} />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

/* styles */

const container = {
  padding: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))",
  gap: "15px",
};

const card = {
  border: "1px solid #eee",
  padding: "10px",
  textAlign: "center",
};

const img = {
  width: "100%",
  height: "120px",
  objectFit: "cover",
};
