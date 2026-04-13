import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

import { auth } from "./firebase";
import { signOut } from "firebase/auth";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  const user = auth.currentUser;

  if (!user) return <Login setPage={setPage} />;

  return (
    <div>
      <Navbar setPage={setPage} cart={cart} />

      <div style={{ padding: "20px" }}>
        {page === "home" && <Home setPage={setPage} />}
        {page === "products" && (
          <Products cart={cart} setCart={setCart} />
        )}
        {page === "cart" && (
          <Cart cart={cart} setPage={setPage} />
        )}
        {page === "checkout" && (
          <Checkout cart={cart} setPage={setPage} />
        )}
        {page === "orders" && <MyOrders />}
        {page === "profile" && <Profile />}
        {page === "admin" && <Admin setPage={setPage} />}
      </div>
    </div>
  );
}

/* 💎 PREMIUM NAVBAR */
function Navbar({ setPage, cart }) {
  return (
    <div style={nav}>
      <h2 style={logo}>JEWEL16 💎</h2>

      <div style={links}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("products")}>Shop</button>
        <button onClick={() => setPage("cart")}>
          Cart ({cart.length})
        </button>
        <button onClick={() => setPage("orders")}>Orders</button>
        <button onClick={() => setPage("profile")}>Profile</button>
        <button onClick={() => setPage("admin")}>Admin</button>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 40px",
  borderBottom: "1px solid #eee",
  background: "white",
  position: "sticky",
  top: 0,
  zIndex: 1000
};

const logo = {
  color: "maroon",
  fontSize: "22px",
  letterSpacing: "2px"
};

const links = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};
