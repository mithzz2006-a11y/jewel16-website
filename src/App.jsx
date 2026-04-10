import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";
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
          padding: "15px 40px",
          background: "#111",
          borderBottom: "1px solid maroon",
        }}
      >
        {/* 🔐 SECRET ADMIN */}
        <h2
          style={{ color: "white", cursor: "pointer" }}
          onDoubleClick={() => {
            const pass = prompt("Enter Admin Password");
            if (pass === "jewel16admin") {
              setPage("admin");
            } else {
              alert("Access denied ❌");
            }
          }}
        >
          JEWEL16 💎
        </h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setPage("orders")}>
            My Orders
          </button>
        </div>
      </div>

      {/* 🛒 FLOATING CART */}
      <div
        onClick={() => setPage("cart")}
        style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          background: "maroon",
          color: "black",
          padding: "12px 15px",
          borderRadius: "50%",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        🛒 {cart.length}
      </div>

      {/* 🔥 PAGES */}
      <AnimatePresence mode="wait">
        {page === "home" && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Home setPage={setPage} />
          </motion.div>
        )}

        {page === "products" && (
          <motion.div key="products" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Products cart={cart} setCart={setCart} setPage={setPage} />
          </motion.div>
        )}

        {page === "cart" && (
          <motion.div key="cart" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Cart cart={cart} setCart={setCart} setPage={setPage} />
          </motion.div>
        )}

        {page === "orders" && (
          <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <MyOrders setPage={setPage} />
          </motion.div>
        )}

        {page === "admin" && (
          <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Admin setPage={setPage} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
