import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar({ setPage, cart, user }) {
  const [menu, setMenu] = useState(false);

  const ADMIN_EMAIL = "mithzz2006@gmail.com";

  return (
    <div style={nav}>
      {/* LOGO */}
      <h2 style={logo} onClick={() => setPage("home")}>
        JEWEL16 💎
      </h2>

      <div style={right}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>
          Cart ({cart.length})
        </button>

        {/* 🔐 ADMIN */}
        {user?.email === ADMIN_EMAIL && (
          <button onClick={() => setPage("admin")}>
            Admin
          </button>
        )}

        {/* 🔥 3 DOT MENU */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setMenu(!menu)}>⋮</button>

          {menu && (
            <div style={dropdown}>
              {/* USER INFO */}
              <p style={userInfo}><b>{user.email}</b></p>
              <hr />

              <p onClick={() => setPage("profile")}>👤 Profile</p>
              <p onClick={() => setPage("orders")}>📦 My Orders</p>

              <hr />

              <p onClick={() => signOut(auth)}>🚪 Logout</p>
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
  padding: "15px 25px",
  borderBottom: "1px solid #ddd",
  background: "white",
};

const logo = {
  color: "maroon",
  cursor: "pointer",
};

const right = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const dropdown = {
  position: "absolute",
  top: "40px",
  right: "0px",
  background: "white",
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "8px",
  width: "200px",
  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
};

const userInfo = {
  fontSize: "12px",
  color: "gray",
};
