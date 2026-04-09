import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  return (
    <div>
      {/* 🔥 NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        background: "#111",
        borderBottom: "1px solid gold"
      }}>
        <h2 style={{ color: "gold" }}>JEWEL16 💎</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
        </div>
      </div>

      {/* 🔥 FLOATING CART ICON */}
      <div
        onClick={() => setPage("cart")}
        style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          background: "gold",
          color: "black",
          padding: "12px 15px",
          borderRadius: "50%",
          cursor: "pointer",
          fontWeight: "bold",
          zIndex: 1000,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)"
        }}
      >
        🛒 {cart.length}
      </div>

      {/* 🔥 PAGES */}
      {page === "home" && <Home setPage={setPage} />}

      {page === "products" && (
        <Products
          cart={cart}
          setCart={setCart}
          setPage={setPage}
        />
      )}

      {page === "cart" && (
        <Cart
          cart={cart}
          setCart={setCart}
          setPage={setPage}
        />
      )}
    </div>
  );
}
