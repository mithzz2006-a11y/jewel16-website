import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  const ADMIN_EMAIL = "mithzz2006@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <Auth setUser={setUser} />;

  return (
    <div>
      {/* 🔥 NAVBAR */}
      <div style={nav}>
        <h2 style={{ color: "maroon" }}>JEWEL16 💎</h2>

        <div style={navRight}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setPage("orders")}>Orders</button>

          {user?.email === ADMIN_EMAIL && (
            <button onClick={() => setPage("admin")}>Admin</button>
          )}

          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      </div>

      {/* PAGES */}
      {page === "home" && <Home setPage={setPage} />}
      {page === "products" && <Products setCart={setCart} cart={cart} />}
      {page === "cart" && <Cart cart={cart} setPage={setPage} />}
      {page === "checkout" && <Checkout cart={cart} />}
      {page === "orders" && <MyOrders />}
      {page === "admin" && user?.email === ADMIN_EMAIL && <Admin />}
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 30px",
  borderBottom: "2px solid black",
  background: "white",
};

const navRight = {
  display: "flex",
  gap: "10px",
};
