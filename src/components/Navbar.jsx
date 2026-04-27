import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar({ setPage, cart, user }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={nav}>

      {/* 🔥 TOP ROW */}
      <div style={topRow}>
        <h2 style={logo} onClick={() => setPage("home")}>
          JEWEL16 💎
        </h2>

        {/* 🔥 DOT MENU */}
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

      {/* 🔥 BOTTOM ROW (MAIN NAV) */}
      <div style={bottomRow}>
        <button style={btn} onClick={() => setPage("home")}>
          Home
        </button>

        <button style={btn} onClick={() => setPage("products")}>
          Products
        </button>

        <button style={btn} onClick={() => setPage("cart")}>
          Cart ({cart?.length || 0})
        </button>

        {user?.isAdmin && (
          <button style={btn} onClick={() => setPage("admin")}>
            Admin
          </button>
        )}
      </div>

    </div>
  );
}

/* 🎨 PREMIUM RESPONSIVE STYLES */

const nav = {
  display: "flex",
  flexDirection: "column",
  padding: "10px 12px",
  borderBottom: "1px solid #eee",
  background: "white",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

/* 🔥 TOP ROW */
const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

/* 🔥 BOTTOM ROW */
const bottomRow = {
  display: "flex",
  justifyContent: "space-around",
  marginTop: "8px",
};

/* LOGO */
const logo = {
  color: "maroon",
  cursor: "pointer",
  fontSize: "18px",
  fontWeight: "bold",
};

/* BUTTON */
const btn = {
  padding: "8px 10px",
  fontSize: "13px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  color: "#333",
};

/* MENU */
const menuWrap = {
  position: "relative",
};

const dots = {
  fontSize: "18px",
  background: "#f5f5f5",
  border: "none",
  cursor: "pointer",
  padding: "6px 10px",
  borderRadius: "6px",
};

/* DROPDOWN */
const dropdown = {
  position: "absolute",
  top: "40px",
  right: "0",
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "10px",
  width: "180px",
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
  wordBreak: "break-all",
};
