import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar({ setPage, cart, user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={nav}>
      
      {/* LOGO */}
      <h2 style={logo} onClick={() => setPage("home")}>
        JEWEL16 💎
      </h2>

      {/* RIGHT SIDE */}
      <div style={right}>

        {/* 🔥 MAIN BUTTONS (AUTO WRAP) */}
        <button style={btn} onClick={() => setPage("home")}>
          Home
        </button>

        <button style={btn} onClick={() => setPage("products")}>
          Products
        </button>

        <button style={btn} onClick={() => setPage("cart")}>
          Cart ({cart?.length || 0})
        </button>

        {/* 🔐 ADMIN */}
        {user?.isAdmin && (
          <button style={btn} onClick={() => setPage("admin")}>
            Admin
          </button>
        )}

        {/* 🔥 MENU */}
        <div style={menuWrap}>
          <button style={dots} onClick={() => setMenuOpen(!menuOpen)}>
            ⋮
          </button>

          {menuOpen && (
            <div style={dropdown}>
              
              <p style={userInfo}>{user?.email}</p>

              <hr />

              <p style={item} onClick={() => {
                setMenuOpen(false);
                setPage("profile");
              }}>
                👤 Profile
              </p>

              <p style={item} onClick={() => {
                setMenuOpen(false);
                setPage("orders");
              }}>
                📦 My Orders
              </p>

              <hr />

              <p style={item} onClick={() => signOut(auth)}>
                🚪 Logout
              </p>

            </div>
          )}
        </div>

      </div>
    </div>
  );
}

/* 🎨 RESPONSIVE PREMIUM STYLES */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 12px",
  borderBottom: "1px solid #eee",
  background: "white",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  flexWrap: "wrap",
};

const logo = {
  color: "maroon",
  cursor: "pointer",
  fontSize: "clamp(18px, 4vw, 22px)", // 🔥 responsive
};

const right = {
  display: "flex",
  gap: "6px",
  alignItems: "center",
  flexWrap: "wrap", // 🔥 auto wrap on mobile
};

const btn = {
  padding: "8px 10px",
  fontSize: "clamp(12px, 3vw, 14px)",
  border: "none",
  background: "#f9f9f9", // 🔥 slight background for visibility
  cursor: "pointer",
  borderRadius: "6px",
};

const menuWrap = {
  position: "relative",
};

const dots = {
  fontSize: "18px",
  background: "#f9f9f9",
  border: "none",
  cursor: "pointer",
  padding: "6px 10px",
  borderRadius: "6px",
};

const dropdown = {
  position: "absolute",
  top: "40px",
  right: "0",
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "10px",
  width: "clamp(160px, 60vw, 220px)", // 🔥 mobile friendly
  padding: "10px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
};

const item = {
  padding: "10px",
  cursor: "pointer",
  borderRadius: "6px",
};

const userInfo = {
  fontSize: "12px",
  color: "gray",
  marginBottom: "5px",
  wordBreak: "break-all", // 🔥 prevent overflow
};
