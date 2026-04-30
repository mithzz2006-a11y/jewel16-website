import { useState, useEffect } from "react";

export default function BottomNav({ setPage, cart }) {
  const [active, setActive] = useState("home");

  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "products", icon: "💎", label: "Shop" },
    { id: "cart", icon: "🛒", label: "Cart" },
    { id: "profile", icon: "👤", label: "Profile" }
  ];

  const go = (page) => {
    setActive(page);
    setPage(page);

    /* 🔥 HAPTIC FEEL (VIBRATION) */
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  return (
    <div style={wrap}>

      <div style={nav}>

        {/* 🔥 SLIDING INDICATOR */}
        <div
          style={{
            ...indicator,
            transform: `translateX(${tabs.findIndex(t => t.id === active) * 100}%)`
          }}
        />

        {tabs.map((t) => (
          <div
            key={t.id}
            style={item}
            onClick={() => go(t.id)}
          >
            <span
              style={{
                ...icon,
                color: active === t.id ? "maroon" : "#555",
                transform: active === t.id ? "scale(1.2)" : "scale(1)",
              }}
            >
              {t.icon}
            </span>

            <p
              style={{
                ...text,
                color: active === t.id ? "maroon" : "#555",
              }}
            >
              {t.label}
            </p>

            {/* 🔴 CART BADGE */}
            {t.id === "cart" && cart?.length > 0 && (
              <span style={badge}>{cart.length}</span>
            )}
          </div>
        ))}

      </div>
    </div>
  );
}

/* 💎 STYLES */

/* WRAP */
const wrap = {
  position: "fixed",
  bottom: "10px",
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "center",
  zIndex: 9999,
};

/* NAV */
const nav = {
  position: "relative",
  display: "flex",
  width: "95%",
  maxWidth: "420px",
  padding: "10px",
  borderRadius: "25px",

  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(15px)",

  boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
};

/* 🔥 SLIDING INDICATOR */
const indicator = {
  position: "absolute",
  bottom: "5px",
  left: "5%",
  width: "20%",
  height: "4px",
  background: "maroon",
  borderRadius: "10px",
  transition: "0.3s ease",
};

/* ITEM */
const item = {
  flex: 1,
  textAlign: "center",
  position: "relative",
  cursor: "pointer",
};

/* ICON */
const icon = {
  fontSize: "20px",
  display: "block",
  transition: "0.2s ease",
};

/* TEXT */
const text = {
  fontSize: "11px",
  marginTop: "2px",
  transition: "0.2s ease",
};

/* BADGE */
const badge = {
  position: "absolute",
  top: "0px",
  right: "18%",
  background: "maroon",
  color: "white",
  fontSize: "10px",
  padding: "2px 6px",
  borderRadius: "50%",
};
