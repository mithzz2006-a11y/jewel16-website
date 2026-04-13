import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Auth from "./pages/Auth";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("auth");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) setPage("products");
    });
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (!user) return <Auth setPage={setPage} />;

  return (
    <div>

      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>Cart</button>
        <button onClick={() => setPage("orders")}>Orders</button>
        <button onClick={() => setPage("profile")}>Profile</button>
      </div>

      {page === "products" && (
        <Products cart={cart} setCart={setCart} setPage={setPage} />
      )}
      {page === "cart" && <Cart cart={cart} setPage={setPage} />}
      {page === "checkout" && <Checkout cart={cart} total={total} />}
      {page === "orders" && <MyOrders />}
      {page === "profile" && <Profile />}
    </div>
  );
}
