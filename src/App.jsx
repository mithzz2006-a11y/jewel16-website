import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Admin from "./pages/Admin";
import Login from "./pages/Login";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  if (!user) return <Login />;

  return (
    <div>
      <nav style={nav}>
        <h2 style={{ color: "maroon" }}>JEWEL16 💎</h2>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
          <button onClick={() => setPage("orders")}>Orders</button>
          <button onClick={() => setPage("admin")}>Admin</button>
          <button onClick={() => signOut(auth)}>Logout</button>
        </div>
      </nav>

      {page === "home" && <Home setPage={setPage} />}
      {page === "products" && (
        <Products
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
          cart={cart}
          setCart={setCart}
        />
      )}
      {page === "productDetails" && (
        <ProductDetails
          product={selectedProduct}
          cart={cart}
          setCart={setCart}
          setPage={setPage}
        />
      )}
      {page === "cart" && (
        <Cart cart={cart} setPage={setPage} />
      )}
      {page === "checkout" && (
        <Checkout cart={cart} setPage={setPage} />
      )}
      {page === "orders" && <MyOrders />}
      {page === "admin" && <Admin />}
    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 30px",
  borderBottom: "1px solid #ddd",
};
