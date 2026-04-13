import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Navbar setPage={setPage} cart={cart} />

      {page === "home" && <Home setPage={setPage} />}
      {page === "products" && (
        <Products cart={cart} setCart={setCart} />
      )}
      {page === "cart" && (
        <Cart cart={cart} setPage={setPage} />
      )}
      {page === "checkout" && (
        <Checkout cart={cart} />
      )}
      {page === "profile" && <Profile />}
    </div>
  );
}

/* NAVBAR */
function Navbar({ setPage, cart }) {
  return (
    <div style={nav}>
      <h2 style={{ color: "maroon" }}>JEWEL16 💎</h2>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>
          Cart ({cart.length})
        </button>
        <button onClick={() => setPage("profile")}>Profile</button>
      </div>
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 30px",
  borderBottom: "1px solid #ddd",
};
