import { useState } from "react";

export default function BottomNav({ setPage, cart }) {
  const [active, setActive] = useState("home");

  const go = (page) => {
    setActive(page);
    setPage(page);
  };

  return (
    <div style={wrap}>

      {/* 🔥 FLOATING BAR */}
      <div style={nav}>

        {/* HOME */}
        <div
          style={{
            ...item,
            ...(active === "home" ? activeItem : {})
          }}
          onClick={() => go("home")}
        >
          <span style={icon}>🏠</span>
          <p style={text}>Home</p>
        </div>

        {/* PRODUCTS */}
        <div
          style={{
            ...item,
            ...(active === "products" ? activeItem : {})
          }}
          onClick={() => go("products")}
        >
          <span style={icon}>💎</span>
          <p style={text}>Products</p>
        </div>

        {/* CART */}
        <div
          style={{
            ...item,
            ...(active === "cart" ? activeItem : {})
          }}
          onClick={() => go("cart")}
        >
          <span style={icon}>🛒</span>
          <p style={text}>Cart</p>

          {cart?.length > 0 && (
            <span style={badge}>{cart.length}</span>
          )}
        </div>

        {/* PROFILE */}
        <div
          style={{
            ...item,
            ...(active === "profile" ? activeItem : {})
          }}
          onClick={() => go("profile")}
        >
          <span style={icon}>👤</span>
          <p style={text}>Profile</p>
        </div>

      </div>
    </div>
  );
}

/* 💎 STYLES */

const wrap = {
  position: "fixed",
  bottom: "10px",
  left: "0",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  zIndex: 9999,
};

/* 🔥 GLASS EFFECT NAV */
const nav = {
  display: "flex",
  justifyContent: "space-around",
  width: "95%",
  maxWidth: "420px",
  padding: "10px",
  borderRadius: "20px",

  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(10px)",

  boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
};

/* 🔥 ITEM */
const item = {
  flex: 1,
  textAlign: "center",
  position: "relative",
  padding: "6px 0",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

/* 🔥 ACTIVE ITEM */
const activeItem = {
  transform: "translateY(-6px) scale(1.05)",
};

/* ICON */
const icon = {
  fontSize: "20px",
  display: "block",
};

/* TEXT */
const text = {
  fontSize: "11px",
  marginTop: "2px",
};

/* 🔴 CART BADGE */
const badge = {
  position: "absolute",
  top: "0px",
  right: "20%",
  background: "maroon",
  color: "white",
  fontSize: "10px",
  padding: "2px 6px",
  borderRadius: "50%",
};
