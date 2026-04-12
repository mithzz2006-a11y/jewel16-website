import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import MyOrders from "./pages/MyOrders";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setPage("home");
  };

  // 🔥 WAIT FOR AUTH
  if (loading) return <div style={{ color: "white" }}>Loading...</div>;

  // 🔐 FORCE LOGIN FIRST
  if (!user) {
    return <Auth setPage={setPage} />;
  }

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>

      {/* NAVBAR */}
      <div style={navbar}>
        <h2 style={logo}>JEWEL16 💎</h2>

        <div style={navRight}>
          <button style={navBtn} onClick={() => setPage("home")}>Home</button>
          <button style={navBtn} onClick={() => setPage("products")}>Products</button>
          <button style={navBtn} onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button style={navBtn} onClick={() => setPage("orders")}>Orders</button>
          <button style={navBtn} onClick={logout}>Logout</button>
        </div>
      </div>

      {/* PAGES */}
      <div style={{ padding: "20px" }}>
        {page === "home" && <Home setPage={setPage} />}
        {page === "products" && <Products cart={cart} setCart={setCart} />}
        {page === "cart" && <Cart cart={cart} setCart={setCart} setPage={setPage} user={user} />}
        {page === "orders" && <MyOrders setPage={setPage} />}
      </div>

    </div>
  );
}

/* STYLES */

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 40px",
  background: "#111",
  borderBottom: "2px solid maroon"
};

const logo = {
  fontWeight: "bold",
  fontSize: "22px"
};

const navRight = {
  display: "flex",
  gap: "15px",
  alignItems: "center"
};

const navBtn = {
  padding: "10px 18px",
  background: "#1a1a1a",
  color: "white",
  border: "1px solid maroon",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold"
};
