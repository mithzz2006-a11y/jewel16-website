import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useState } from "react";

export default function ProductCard({ product, setCart }) {
  const [liked, setLiked] = useState(false);

  const toggleWishlist = async (e) => {
    e.stopPropagation();

    const user = auth.currentUser;
    if (!user) {
      alert("Login required");
      return;
    }

    const ref = doc(db, "users", user.uid);

    try {
      if (liked) {
        await updateDoc(ref, {
          wishlist: arrayRemove(product),
        });
        setLiked(false);
      } else {
        await updateDoc(ref, {
          wishlist: arrayUnion(product),
        });
        setLiked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = (e) => {
    e.stopPropagation();

    if ((product.stock ?? 0) <= 0) {
      alert("Out of stock ❌");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: (i.qty || 1) + 1 } : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div style={card}>
      {/* ❤️ WISHLIST */}
      <div style={heart} onClick={toggleWishlist}>
        {liked ? "❤️" : "🤍"}
      </div>

      <img src={product.image} alt={product.name} style={img} />

      <h3 style={name}>{product.name}</h3>
      <p style={price}>₹{product.price}</p>

      <button style={btn} onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  );
}

/* 🎨 STYLES */
const card = {
  position: "relative",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  background: "#fff",
  textAlign: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease",
};

const heart = {
  position: "absolute",
  top: "10px",
  right: "10px",
  cursor: "pointer",
  fontSize: "18px",
};

const img = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  borderRadius: "6px",
};

const name = {
  fontSize: "14px",
  margin: "8px 0 4px",
};

const price = {
  color: "maroon",
  fontWeight: "bold",
  marginBottom: "8px",
};

const btn = {
  background: "maroon",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};
