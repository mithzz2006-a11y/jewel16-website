import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  const ADMIN_EMAIL = "mithzz2006@gmail.com";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // 🔐 LOGIN FIRST
  if (!user) return <Auth setUser={setUser} />;

  return (
    <div>
      {/* NAVBAR */}
      <Navbar setPage={setPage} cart={cart} user={user} />

      {/* PAGES */}
      {page === "home" && <Home setPage={setPage} />}

      {page === "products" && (
        <Products setCart={setCart} />
      )}

      {page === "cart" && (
        <Cart cart={cart} setPage={setPage} />
      )}

      {page === "checkout" && (
        <Checkout cart={cart} user={user} />
      )}

      {page === "orders" && (
        <MyOrders user={user} />
      )}

      {page === "profile" && (
        <Profile user={user} />
      )}

      {/* 🔐 ADMIN LOCK */}
      {page === "admin" && user?.email === ADMIN_EMAIL && (
        <Admin />
      )}
    </div>
  );
}
