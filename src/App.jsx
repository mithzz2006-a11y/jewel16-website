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

  // 🔁 PAGE ROUTING
  if (!user) return <Login setPage={setPage} />;

  if (page === "home") return <Layout><Home setPage={setPage} /></Layout>;
  if (page === "products") return <Layout><Products setPage={setPage} setCart={setCart} cart={cart} /></Layout>;
  if (page === "cart") return <Layout><Cart cart={cart} setPage={setPage} /></Layout>;
  if (page === "checkout") return <Layout><Checkout cart={cart} setPage={setPage} /></Layout>;
  if (page === "orders") return <Layout><MyOrders /></Layout>;
  if (page === "admin") return <Layout><Admin setPage={setPage} /></Layout>;
  if (page === "profile") return <Layout><Profile /></Layout>;

  return <Layout><Home setPage={setPage} /></Layout>;
}

/* 🔥 LAYOUT + NAVBAR */

function Layout({ children }) {
  return (
    <div>
      <nav style={nav}>
        <h2 style={{ color: "maroon" }}>JEWEL16 💎</h2>

        <div>
          <button onClick={() => location.reload()}>Home</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent("nav", { detail: "products" }))}>Products</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent("nav", { detail: "cart" }))}>Cart</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent("nav", { detail: "orders" }))}>Orders</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent("nav", { detail: "profile" }))}>Profile</button>
          <button onClick={() => window.dispatchEvent(new CustomEvent("nav", { detail: "admin" }))}>Admin</button>

          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      </nav>

      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px",
  borderBottom: "2px solid black",
  background: "white"
};
