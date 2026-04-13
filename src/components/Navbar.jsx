import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar({ setPage, cart, user }) {
  const [menu, setMenu] = useState(false);

  return (
    <div style={nav}>
      <h2 style={{ color: "maroon" }}>JEWEL16 💎</h2>

      <div style={right}>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>
          Cart ({cart.length})
        </button>

        <button onClick={() => setMenu(!menu)}>⋮</button>

        {menu && (
          <div style={dropdown}>
            <p onClick={() => setPage("profile")}>Profile</p>
            <p onClick={() => setPage("orders")}>My Orders</p>
            <p onClick={() => signOut(auth)}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 25px",
  borderBottom: "1px solid #ddd",
};

const right = {
  display: "flex",
  gap: "10px",
  alignItems: "center",
};

const dropdown = {
  position: "absolute",
  top: "60px",
  right: "20px",
  background: "white",
  border: "1px solid #ccc",
  padding: "10px",
};
