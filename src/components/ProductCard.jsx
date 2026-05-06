import { useState } from "react";

import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { db, auth } from "../firebase";

export default function ProductCard({
  product,
  setCart,
}) {

  const [liked, setLiked] =
    useState(false);

  /* ❤️ WISHLIST */
  const toggleWishlist = async (
    e
  ) => {

    e.stopPropagation();

    try {

      const user =
        auth.currentUser;

      if (!user) {

        alert(
          "Please login first"
        );

        return;

      }

      const ref = doc(
        db,
        "users",
        user.uid
      );

      if (liked) {

        await updateDoc(ref, {

          wishlist:
            arrayRemove(product),

        });

        setLiked(false);

      } else {

        await updateDoc(ref, {

          wishlist:
            arrayUnion(product),

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

      const existing =
        prev.find(
          (i) =>
            i.id === product.id
        );

      if (existing) {

        return prev.map((i) =>
          i.id === product.id
            ? {
                ...i,
                qty:
                  (i.qty || 1) + 1,
              }
            : i
        );

      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
        },
      ];

    });

  };

  return (
    <div
      style={card}
      onMouseEnter={(e) => {

        e.currentTarget.style.transform =
          "translateY(-8px) scale(1.02)";

        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(0,0,0,0.35)";

      }}
      onMouseLeave={(e) => {

        e.currentTarget.style.transform =
          "translateY(0) scale(1)";

        e.currentTarget.style.boxShadow =
          "0 8px 25px rgba(0,0,0,0.18)";

      }}
    >

      {/* ✨ GLOW */}
      <div style={glow}></div>

      {/* ❤️ WISHLIST */}
      <div
        style={heart}
        onClick={toggleWishlist}
      >
        {liked
          ? "❤️"
          : "🤍"}
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

        <h3 style={name}>
          {product?.name}
        </h3>

        <p style={price}>
          ₹
          {product?.price || 0}
        </p>

        {/* ✨ PREMIUM TAG */}
        <div style={tag}>
          Luxury Collection
        </div>

        <button
          style={btn}
          onClick={addToCart}
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}

/* 🎨 ULTRA PREMIUM GLASS STYLES */

const card = {
  position: "relative",

  overflow: "hidden",

  borderRadius: "28px",

  background:
    "rgba(20,20,20,0.82)",

  backdropFilter:
    "blur(18px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 8px 25px rgba(0,0,0,0.18)",

  transition: "0.35s",

  cursor: "pointer",
};

const glow = {
  position: "absolute",

  width: "180px",

  height: "180px",

  top: "-60px",

  right: "-60px",

  background:
    "radial-gradient(circle, rgba(128,0,0,0.45), transparent)",

  filter: "blur(40px)",

  zIndex: 0,
};

/* ❤️ HEART */
const heart = {
  position: "absolute",

  top: "14px",

  right: "14px",

  zIndex: 5,

  width: "42px",

  height: "42px",

  borderRadius: "50%",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  fontSize: "22px",

  cursor: "pointer",

  background:
    "rgba(255,255,255,0.12)",

  backdropFilter:
    "blur(12px)",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

/* 🖼 IMAGE */
const imgWrap = {
  width: "100%",

  height: "240px",

  overflow: "hidden",
};

const img = {
  width: "100%",

  height: "100%",

  objectFit: "cover",

  transition: "0.5s",
};

/* 💎 CONTENT */
const content = {
  position: "relative",

  zIndex: 2,

  padding: "18px",
};

const name = {
  color: "white",

  fontSize: "16px",

  fontWeight: "700",

  marginBottom: "8px",

  lineHeight: "1.4",
};

const price = {
  color: "#ffcccc",

  fontWeight: "700",

  fontSize: "22px",
};

const tag = {
  display: "inline-block",

  marginTop: "10px",

  padding: "6px 12px",

  borderRadius: "30px",

  background:
    "rgba(255,255,255,0.08)",

  color: "#ddd",

  fontSize: "12px",

  border:
    "1px solid rgba(255,255,255,0.08)",
};

/* 🛒 BUTTON */
const btn = {
  marginTop: "18px",

  width: "100%",

  padding: "13px",

  border: "none",

  borderRadius: "16px",

  background:
    "linear-gradient(to right, #2b0000, maroon)",

  color: "white",

  fontWeight: "700",

  cursor: "pointer",

  fontSize: "14px",

  boxShadow:
    "0 8px 20px rgba(128,0,0,0.35)",
};
