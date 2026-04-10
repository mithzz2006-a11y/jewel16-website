import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  return (
    <div>
      {/* 🔥 NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "15px 40px",
          background: "#111",
          borderBottom: "1px solid white",
        }}
      >
        <h2 style={{ color: "white" }}>JEWEL16 💎</h2>

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
          background: "white",
          color: "black",
          padding: "12px 15px",
          borderRadius: "50%",
          cursor: "pointer",
          fontWeight: "bold",
          zIndex: 1000,
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        🛒 {cart.length}
      </div>

      {/* 🔥 PAGE TRANSITIONS */}
      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Home setPage={setPage} />
          </motion.div>
        )}

        {page === "products" && (
          <motion.div
            key="products"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Products cart={cart} setCart={setCart} setPage={setPage} />
          </motion.div>
        )}

        {page === "cart" && (
          <motion.div
            key="cart"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <Cart cart={cart} setCart={setCart} setPage={setPage} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
