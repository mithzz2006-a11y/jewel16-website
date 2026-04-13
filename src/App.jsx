import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) setPage("auth");
    });
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const logout = async () => {
    await signOut(auth);
    setPage("auth");
  };

  // 🔐 NOT LOGGED IN
  if (!user) return <Auth setPage={setPage} />;

  return (
    <div style={{ minHeight: "100vh", background: "white" }}>

      {/* 🔥 NAVBAR */}
      <div style={navbar}>
        <h2 style={{ color: "maroon" }}>JEWEL16 💎</h2>

        <div style={navButtons}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setPage("orders")}>Orders</button>
          <button onClick={() => setPage("profile")}>Profile</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      {/* 🔥 FLOATING CART */}
      <div
        onClick={() => setPage("cart")}
        style={floatingCart}
      >
        🛒 {cart.length}
      </div>

      {/* 🔥 PAGES */}
      {page === "home" && <Home setPage={setPage} user={user} />}

      {page === "products" && (
        <Products cart={cart} setCart={setCart} setPage={setPage} />
      )}

      {page === "cart" && (
        <Cart cart={cart} setPage={setPage} />
      )}

      {page === "checkout" && (
        <Checkout cart={cart} total={total} />
      )}

      {page === "orders" && <MyOrders />}

      {page === "profile" && <Profile />}
    </div>
  );
}

/* 🔥 STYLES */

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  borderBottom: "1px solid black",
  background: "white",
  flexWrap: "wrap"
};

const navButtons = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const floatingCart = {
  position: "fixed",
  top: "80px",
  right: "20px",
  background: "maroon",
  color: "white",
  padding: "12px 15px",
  borderRadius: "50%",
  cursor: "pointer",
  fontWeight: "bold",
  zIndex: 1000,
  boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
};
