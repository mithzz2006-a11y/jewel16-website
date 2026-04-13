import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  const user = auth.currentUser;

  // 🔐 LOGIN CHECK
  if (!user) return <Login setPage={setPage} />;

  return (
    <div>
      <Navbar setPage={setPage} />

      <div style={{ padding: "20px" }}>
        {page === "home" && <Home setPage={setPage} />}
        {page === "products" && (
          <Products setPage={setPage} cart={cart} setCart={setCart} />
        )}
        {page === "cart" && (
          <Cart cart={cart} setPage={setPage} />
        )}
        {page === "checkout" && (
          <Checkout cart={cart} setPage={setPage} />
        )}
        {page === "orders" && <MyOrders />}
        {page === "admin" && <Admin setPage={setPage} />}
        {page === "profile" && <Profile />}
      </div>
    </div>
  );
}

/* 🔥 CLEAN NAVBAR */

function Navbar({ setPage }) {
  return (
    <nav style={nav}>
      <h2 style={{ color: "maroon" }}>JEWEL16 💎</h2>

      <div style={navLinks}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>Cart</button>
        <button onClick={() => setPage("orders")}>Orders</button>
        <button onClick={() => setPage("profile")}>Profile</button>
        <button onClick={() => setPage("admin")}>Admin</button>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </nav>
  );
}

/* 🎨 STYLES */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  borderBottom: "2px solid black",
  background: "white",
  flexWrap: "wrap"
};

const navLinks = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};
