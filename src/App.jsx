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

      {/* PAGES */}
      <div style={{ padding: "40px" }}>
        {page === "home" && <Home setPage={setPage} />}
        {page === "products" && <Products cart={cart} setCart={setCart} />}
        {page === "cart" && <Cart cart={cart} setCart={setCart} setPage={setPage} user={user} />}
        {page === "orders" && <MyOrders setPage={setPage} />}
      </div>
    </div>
  );
}

/* STYLES */
const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px 60px",
  borderBottom: "2px solid black",
  background: "#fff"
};

const logo = {
  fontWeight: "bold",
  fontSize: "26px",
  color: "maroon",
  letterSpacing: "2px"
};

const navRight = {
  display: "flex",
  gap: "20px"
};

const btn = {
  background: "#fff",
  border: "1px solid black",
  padding: "8px 16px",
  cursor: "pointer",
  fontWeight: "bold",
  color: "maroon"
};
