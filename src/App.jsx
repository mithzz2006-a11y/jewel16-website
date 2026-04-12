import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import MyOrders from "./pages/MyOrders";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";

import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [checkoutItem, setCheckoutItem] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  if (!user) return <Auth />;

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "maroon" }}>

      {/* NAVBAR */}
      <div style={nav}>
        <h2 style={logo}>JEWEL16</h2>

        <div style={navRight}>
          <button style={btn} onClick={() => setPage("home")}>Home</button>
          <button style={btn} onClick={() => setPage("products")}>Products</button>
          <button style={btn} onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button style={btn} onClick={() => setPage("orders")}>Orders</button>
          <button style={btn} onClick={() => signOut(auth)}>Logout</button>
        </div>
      </div>

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
            setCheckoutItem={setCheckoutItem}
          />
        )}

        {page === "checkout" && (
          <Checkout
            item={checkoutItem}
            setPage={setPage}
            user={user}
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

        {page === "orders" && <MyOrders setPage={setPage} />}

      </div>
    </div>
  );
}

/* STYLES */
const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 20px",
  borderBottom: "2px solid black",
  flexWrap: "wrap"
};

const logo = {
  fontSize: "clamp(18px,4vw,26px)",
  fontWeight: "bold"
};

const navRight = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const btn = {
  border: "1px solid black",
  padding: "8px 14px",
  background: "#fff",
  color: "maroon",
  cursor: "pointer"
};
