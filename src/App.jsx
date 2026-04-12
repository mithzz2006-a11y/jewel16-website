import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import MyOrders from "./pages/MyOrders";
import ProductDetails from "./pages/ProductDetails";

import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  // 🔐 LOGIN FIRST
  if (!user) return <Auth />;

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "maroon" }}>

      {/* 🔥 NAVBAR */}
      <div style={nav}>

        <h2 style={logo}>JEWEL16</h2>

        <div style={navRight}>
          <button onClick={() => setPage("home")} style={btn}>Home</button>
          <button onClick={() => setPage("products")} style={btn}>Products</button>
          <button onClick={() => setPage("cart")} style={btn}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setPage("orders")} style={btn}>Orders</button>
          <button onClick={() => signOut(auth)} style={btn}>Logout</button>
        </div>

      </div>

      {/* 🔥 PAGES */}
      <div style={{ padding: "20px" }}>

        {page === "home" && <Home setPage={setPage} />}

        {page === "products" && (
          <Products
            cart={cart}
            setCart={setCart}
            setPage={setPage}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {page === "details" && (
          <ProductDetails
            product={selectedProduct}
            setPage={setPage}
            cart={cart}
            setCart={setCart}
          />
        )}

        {page === "cart" && (
          <Cart
            cart={cart}
            setCart={setCart}
            setPage={setPage}
            user={user}
          />
        )}

        {page === "orders" && (
          <MyOrders setPage={setPage} />
        )}

      </div>

    </div>
  );
}

/* 💎 STYLES */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  borderBottom: "2px solid black"
};

const logo = {
  fontSize: "clamp(18px, 4vw, 26px)",
  fontWeight: "bold"
};

const navRight = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const btn = {
  background: "#fff",
  border: "1px solid black",
  padding: "8px 14px",
  fontWeight: "bold",
  color: "maroon",
  cursor: "pointer"
};
