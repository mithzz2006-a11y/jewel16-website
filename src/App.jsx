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
    <div>

      {/* NAVBAR */}
      <div style={nav}>
        <h2>JEWEL16</h2>

        <div>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setPage("orders")}>Orders</button>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      </div>

      {/* PAGES */}
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

      {/* 🔥 THIS WAS MISSING OR WRONG */}
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
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "10px",
  borderBottom: "1px solid black"
};
