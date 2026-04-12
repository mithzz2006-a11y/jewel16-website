import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  return (
    <div>

      {/* NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 40px",
          background: "#111",
          borderBottom: "1px solid maroon"
        }}
      >
        {/* 🔐 SECRET ADMIN ACCESS */}
        <h2
          style={{ color: "white", cursor: "pointer" }}
          onDoubleClick={() => setPage("login")}
        >
          JEWEL16 💎
        </h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setPage("orders")}>Orders</button>
        </div>
      </div>

      {/* FLOATING CART */}
      <div
        onClick={() => setPage("cart")}
        style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          background: "maroon",
          color: "white",
          padding: "12px",
          borderRadius: "50%",
          cursor: "pointer"
        }}
      >
        🛒 {cart.length}
      </div>

      {/* PAGES */}
      <AnimatePresence mode="wait">

        {page === "home" && <motion.div><Home setPage={setPage} /></motion.div>}

        {page === "products" && (
          <motion.div>
            <Products cart={cart} setCart={setCart} setPage={setPage} />
          </motion.div>
        )}

        {page === "cart" && (
          <motion.div>
            <Cart cart={cart} setCart={setCart} setPage={setPage} />
          </motion.div>
        )}

        {page === "orders" && (
          <motion.div>
            <MyOrders setPage={setPage} />
          </motion.div>
        )}

        {page === "login" && (
          <motion.div>
            <Login setPage={setPage} />
          </motion.div>
        )}

        {page === "admin" && (
          <motion.div>
            <Admin setPage={setPage} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
