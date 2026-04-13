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
import Admin from "./pages/Admin";

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

  if (!user) return <Auth setPage={setPage} />;

  return (
    <div style={{ background: "white", minHeight: "100vh" }}>

      {/* 🔥 NAVBAR */}
      <div style={navbar}>

        {/* 🔐 SECRET ADMIN ENTRY */}
        <h2
          style={{ color: "maroon", cursor: "pointer" }}
          onDoubleClick={() => setPage("admin")}
        >
          JEWEL16 💎
        </h2>

        <div style={nav}>
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

      {/* 🔥 PAGES */}
      {page === "home" && <Home setPage={setPage} user={user} />}
      {page === "products" && <Products cart={cart} setCart={setCart} setPage={setPage} />}
      {page === "cart" && <Cart cart={cart} setPage={setPage} />}
      {page === "checkout" && <Checkout cart={cart} total={total} />}
      {page === "orders" && <MyOrders />}
      {page === "profile" && <Profile />}
      {page === "admin" && <Admin setPage={setPage} />}
    </div>
  );
}

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
  borderBottom: "1px solid black"
};

const nav = {
  display: "flex",
  gap: "10px"
};
