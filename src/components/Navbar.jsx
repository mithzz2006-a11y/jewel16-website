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

      <div style={right}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>
          Cart ({cart.length})
        </button>

        {user?.email === ADMIN_EMAIL && (
          <button onClick={() => setPage("admin")}>Admin</button>
        )}

        <div style={{ position: "relative" }}>
          <button onClick={() => setMenu(!menu)}>⋮</button>

          {menu && (
            <div style={dropdown}>
              <p><b>{user.email}</b></p>
              <hr />
              <p onClick={() => setPage("profile")}>Profile</p>
              <p onClick={() => setPage("orders")}>My Orders</p>
              <hr />
              <p onClick={() => signOut(auth)}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 15px",
  borderBottom: "1px solid #ddd",
  flexWrap: "wrap",
};

const logo = {
  color: "maroon",
  cursor: "pointer",
};

const right = {
  display: "flex",
  gap: "8px",
  alignItems: "center",
  flexWrap: "wrap",
};

const dropdown = {
  position: "absolute",
  top: "40px",
  right: "0",
  background: "white",
  border: "1px solid #ccc",
  padding: "10px",
  borderRadius: "8px",
  width: "180px",
};
