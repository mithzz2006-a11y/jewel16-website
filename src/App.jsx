import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  const ADMIN_EMAIL = "yourmail@gmail.com"; // 🔥 CHANGE THIS

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        if (u.email === ADMIN_EMAIL) {
          setUser({ ...u, role: "admin" });
        } else {
          setUser({ ...u, role: "user" });
        }
      } else {
        setUser(null);
      }
    });
  }, []);

  if (!user) return <Auth setUser={setUser} />;

  return (
    <div>

      {/* 🔥 NAVBAR */}
      <div style={nav}>
        <h2 style={{ color: "maroon" }}>JEWEL16 💎</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setPage("orders")}>Orders</button>

          {user.role === "admin" && (
            <button onClick={() => setPage("admin")}>
              Admin
            </button>
          )}

          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      </div>

      {/* 🔥 PAGES */}
      {page === "home" && <Home setPage={setPage} />}
      {page === "products" && (
        <Products cart={cart} setCart={setCart} />
      )}
      {page === "cart" && (
        <Cart cart={cart} setPage={setPage} />
      )}
      {page === "checkout" && (
        <Checkout cart={cart} user={user} setPage={setPage} />
      )}
      {page === "orders" && (
        <MyOrders user={user} />
      )}
      {page === "admin" && user.role === "admin" && (
        <Admin />
      )}
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 30px",
  borderBottom: "1px solid #eee",
};
