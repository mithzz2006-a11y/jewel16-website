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

        <button style={btn} onClick={() => setPage("home")}>
          Home
        </button>

        <button style={btn} onClick={() => setPage("products")}>
          Products
        </button>

        <button style={btn} onClick={() => setPage("cart")}>
          Cart ({cart?.length || 0})
        </button>

        {/* 🔐 ADMIN ONLY */}
        {user?.isAdmin && (
          <button style={btn} onClick={() => setPage("admin")}>
            Admin
          </button>
        )}

        {/* 🔥 3 DOT MENU */}
        <div style={{ position: "relative" }}>
          <button style={dots} onClick={() => setMenuOpen(!menuOpen)}>
            ⋮
          </button>

          {menuOpen && (
            <div style={dropdown}>
              
              <p style={userInfo}>
                {user?.email}
              </p>

              <hr />

              <p style={item} onClick={() => setPage("profile")}>
                👤 Profile
              </p>

              <p style={item} onClick={() => setPage("orders")}>
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

/* 🎨 STYLES */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "12px 15px",
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
  fontSize: "20px",
};

const right = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
  flexWrap: "wrap",
};

const btn = {
  padding: "8px 12px",
  border: "none",
  background: "white",
  cursor: "pointer",
  fontWeight: "500",
};

const dots = {
  fontSize: "18px",
  background: "white",
  border: "none",
  cursor: "pointer",
};

const dropdown = {
  position: "absolute",
  top: "35px",
  right: "0",
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "8px",
  width: "200px",
  padding: "10px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

const item = {
  padding: "8px",
  cursor: "pointer",
};

const userInfo = {
  fontSize: "12px",
  color: "gray",
  marginBottom: "5px",
};
