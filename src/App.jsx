import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import MyOrders from "./pages/MyOrders";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";

// 🔖 PAGE CONSTANTS
const PAGES = {
  HOME: "home",
  PRODUCTS: "products",
  CART: "cart",
  AUTH: "auth",
  ORDERS: "orders",
  ADMIN: "admin",
};

export default function App() {
  const [page, setPage] = useState(PAGES.HOME);
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // 🔐 TRACK USER LOGIN
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    console.log("✅ Logged out successfully");
    setPage(PAGES.HOME);
  };

  // 🎬 Animation settings
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh" }}>
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
        <h2 style={{ color: "white" }}>JEWEL16 💎</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setPage(PAGES.HOME)}>Home</button>
          <button onClick={() => setPage(PAGES.PRODUCTS)}>Products</button>
          <button onClick={() => setPage(PAGES.CART)}>
            Cart ({cart.length})
          </button>

          {/* 🔥 SHOW ONLY WHEN LOGGED IN */}
          {user && (
            <button onClick={() => setPage(PAGES.ORDERS)}>My Orders</button>
          )}

          {!user ? (
            <button onClick={() => setPage(PAGES.AUTH)}>Login</button>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </div>

      {/* 🔥 USER INFO */}
      {user && (
        <p style={{ color: "white", paddingLeft: "20px" }}>
          Logged in as: {user.email}
        </p>
      )}

      {/* 🔥 FLOATING CART */}
      <div
        onClick={() => setPage(PAGES.CART)}
        style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          background: "maroon",
          color: "white",
          padding: "12px",
          borderRadius: "50%",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        🛒 {cart.length}
      </div>

      {/* 🔥 PAGES */}
      <AnimatePresence mode="wait">
        {page === PAGES.HOME && (
          <motion.div {...pageTransition}>
            <Home setPage={setPage} />
          </motion.div>
        )}

        {page === PAGES.PRODUCTS && (
          <motion.div {...pageTransition}>
            <Products cart={cart} setCart={setCart} setPage={setPage} />
          </motion.div>
        )}

        {page === PAGES.CART && (
          <motion.div {...pageTransition}>
            <Cart cart={cart} setCart={setCart} setPage={setPage} user={user} />
          </motion.div>
        )}

        {page === PAGES.AUTH && (
          <motion.div {...pageTransition}>
            <Auth setPage={setPage} />
          </motion.div>
        )}

        {page === PAGES.ORDERS && (
          <motion.div {...pageTransition}>
            <MyOrders setPage={setPage} />
          </motion.div>
        )}

        {page === PAGES.ADMIN && (
          <motion.div {...pageTransition}>
