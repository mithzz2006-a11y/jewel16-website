import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar({ setPage, cart, user }) {
  const [menu, setMenu] = useState(false);

  const ADMIN_EMAIL = "mithzz2006@gmail.com";

  return (
    <div style={nav}>
      <h2 style={logo} onClick={() => setPage("home")}>
        JEWEL16 💎
      </h2>

      {/* DESKTOP MENU */}
      <div style={desktop}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>
          Cart ({cart.length})
        </button>

        {user?.email === ADMIN_EMAIL && (
          <button onClick={() => setPage("admin")}>Admin</button>
        )}

        <button onClick={() => signOut(auth)}>Logout</button>
      </div>

      {/* MOBILE MENU ICON */}
      <div style={mobileIcon} onClick={() => setMenu(!menu)}>
        ☰
      </div>

      {/* MOBILE DROPDOWN */}
      {menu && (
        <div style={mobileMenu}>
          <p onClick={() => setPage("home")}>Home</p>
          <p onClick={() => setPage("products")}>Products</p>
          <p onClick={() => setPage("cart")}>Cart</p>
          <p onClick={() => setPage("orders")}>Orders</p>
          <p onClick={() => setPage("profile")}>Profile</p>

          {user?.email === ADMIN_EMAIL && (
            <p onClick={() => setPage("admin")}>Admin</p>
          )}

          <p onClick={() => signOut(auth)}>Logout</p>
        </div>
      )}
    </div>
  );
}

/* 🎨 STYLES */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  borderBottom: "1px solid #ddd",
  position: "relative",
};

const logo = {
  color: "maroon",
  cursor: "pointer",
};

const desktop = {
  display: window.innerWidth > 768 ? "flex" : "none",
  gap: "10px",
};

const mobileIcon = {
  display: window.innerWidth <= 768 ? "block" : "none",
  fontSize: "22px",
  cursor: "pointer",
};

const mobileMenu = {
  position: "absolute",
  top: "60px",
  right: "10px",
  background: "white",
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "8px",
};
