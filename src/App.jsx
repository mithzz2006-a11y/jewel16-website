import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // 🔐 TRACK LOGIN
  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  const logout = async () => {
    await signOut(auth);
    alert("Logged out");
  };

  return (
    <div>
      {/* NAVBAR */}
      <div style={nav}>
        <h2 style={{ color: "white" }}>JEWEL16 💎</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>

          {!user ? (
            <button onClick={() => setPage("auth")}>Login</button>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </div>

      {/* USER INFO */}
      {user && (
        <p style={{ color: "white", paddingLeft: "20px" }}>
          Logged in as: {user.email}
        </p>
      )}

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
            <Cart cart={cart} setCart={setCart} setPage={setPage} user={user} />
          </motion.div>
        )}
        {page === "auth" && <motion.div><Auth setPage={setPage} /></motion.div>}
        {page === "admin" && <motion.div><Admin setPage={setPage} /></motion.div>}
      </AnimatePresence>
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 40px",
  background: "#111",
  borderBottom: "1px solid maroon"
};
