import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import MyOrders from "./pages/MyOrders";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <div style={{ color: "white" }}>

      <button onClick={() => setPage("home")}>Home</button>
      <button onClick={() => setPage("products")}>Products</button>
      <button onClick={() => setPage("cart")}>Cart ({cart.length})</button>

      {!user ? (
        <button onClick={() => setPage("auth")}>Login</button>
      ) : (
        <>
          <button onClick={() => setPage("orders")}>Orders</button>
          <button onClick={() => signOut(auth)}>Logout</button>
        </>
      )}

      {page === "home" && <Home setPage={setPage} />}
      {page === "products" && <Products cart={cart} setCart={setCart} />}
      {page === "cart" && <Cart cart={cart} setCart={setCart} setPage={setPage} user={user} />}
      {page === "auth" && <Auth setPage={setPage} />}
      {page === "orders" && <MyOrders setPage={setPage} />}
    </div>
  );
}
