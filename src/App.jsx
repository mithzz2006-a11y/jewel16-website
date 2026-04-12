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

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // 🔐 TRACK USER LOGIN (FIXED CLEANUP)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsubscribe(); // ✅ FIX
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out");
      setPage("home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>

      {/* 🔥 NAVBAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "15px 40px",
          background: "#111",
          borderBottom: "1px solid maroon"
        }}
      >
        <h2 style={{ color: "white" }}>JEWEL16 💎</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>

          {/* ✅ ONLY SHOW IF LOGGED IN */}
          {user && (
            <button onClick={() => setPage("orders")}>
              My Orders
            </button>
          )}

          {!user ? (
            <button onClick={() => setPage("auth")}>
              Login
            </button>
          ) : (
            <button onClick={logout}>
              Logout
            </button>
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
        onClick={() => setPage("cart")}
        style={{
          position: "fixed",
          top: "80px",
          right: "20px",
          background: "maroon",
          color: "white",
          padding: "12px",
          borderRadius: "50%",
          cursor: "pointer",
          zIndex: 1000
        }}
      >
        🛒 {cart.length}
      </div>

      {/* 🔥 PAGES */}
      <AnimatePresence mode="wait">

        {page === "home" && (
          <motion.div key="home">
            <Home setPage={setPage} />
          </motion.div>
        )}

        {page === "products" && (
          <motion.div key="products">
            <Products
              cart={cart}
              setCart={setCart}
              setPage={setPage}
            />
          </motion.div>
        )}

        {page === "cart" && (
          <motion.div key="cart">
            <Cart
              cart={cart}
              setCart={setCart}
              setPage={setPage}
              user={user} // ✅ IMPORTANT
            />
          </motion.div>
        )}

        {page === "auth" && (
          <motion.div key="auth">
            <Auth setPage={setPage} />
          </motion.div>
        )}

        {page === "orders" && (
          <motion.div key="orders">
            <MyOrders setPage={setPage} />
          </motion.div>
        )}

        {page === "admin" && (
          <motion.div key="admin">
            <Admin setPage={setPage} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
