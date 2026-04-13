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

  if (!user) return <Login />;

  return (
    <div>
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

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
  borderBottom: "1px solid #ddd",
  background: "white"
};

const navLinks = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};
