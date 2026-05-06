import { useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { db, auth } from "../firebase";

export default function ProductCard({ product, setCart }) {

  const [liked, setLiked] = useState(false);

  /* ❤️ WISHLIST */
  const toggleWishlist = async (e) => {
    e.stopPropagation();

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first");
        return;
      }

      const ref = doc(db, "users", user.uid);

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

  /* 🛒 ADD TO CART */
  const addToCart = (e) => {
    e.stopPropagation();

    setCart((prev = []) => {

      const existing = prev.find(
        (i) => i.id === product.id
      );

      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: (i.qty || 1) + 1 }
            : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div
      style={card}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform =
          "translateY(-5px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform =
          "translateY(0)")
      }
    >

      {/* ❤️ WISHLIST */}
      <div style={heart} onClick={toggleWishlist}>
        {liked ? "❤️" : "🤍"}
      </div>

      {/* 🖼 IMAGE */}
      <div style={imgWrap}>
        <img
          src={
            product?.image ||
            "https://via.placeholder.com/300"
          }
          alt={product?.name}
          style={img}
        />
      </div>

      {/* 💎 CONTENT */}
      <div style={content}>
        <h3 style={name}>{product?.name}</h3>

        <p style={price}>
          ₹{product?.price || 0}
        </p>

        <button style={btn} onClick={addToCart}>
          Add to Cart
        </button>
      </div>

    </div>
  );
}

/* 🎨 PREMIUM STYLES */

const card = {
  position: "relative",
  background: "#fff",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  transition: "0.3s",
  cursor: "pointer",
};

const heart = {
  position: "absolute",
  top: "12px",
  right: "12px",
  zIndex: 5,
  fontSize: "22px",
  cursor: "pointer",
  background: "rgba(255,255,255,0.9)",
  borderRadius: "50%",
  width: "38px",
  height: "38px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backdropFilter: "blur(10px)",
};

const imgWrap = {
  width: "100%",
  height: "220px",
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "0.4s",
};

const content = {
  padding: "14px",
};

const name = {
  fontSize: "15px",
  fontWeight: "600",
  marginBottom: "6px",
};

const price = {
  color: "maroon",
  fontWeight: "bold",
  fontSize: "17px",
};

const btn = {
  marginTop: "12px",
  width: "100%",
  padding: "11px",
  border: "none",
  borderRadius: "10px",
  background: "linear-gradient(to right, #4b0000, maroon)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "14px",
};
