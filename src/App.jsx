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

  // 🔐 TRACK LOGIN
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      alert("Logged out");
      setPage("home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>
      
      {/* NAVBAR */}
      <div style={nav}>
        <h2>JEWEL16 💎</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>

          {user && (
            <button onClick={() => setPage("orders")}>
              Orders
            </button>
          )}

          {!user ? (
            <button onClick={() => setPage("auth")}>
              Login
            </button>
          ) : (
            <button onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>

      {/* USER EMAIL */}
      {user && (
        <p style={{ padding: "10px 20px" }}>
          {user.email}
        </p>
      )}

      {/* PAGES */}
      {page === "home" && <Home setPage={setPage} />}
      {page === "products" && (
        <Products cart={cart} setCart={setCart} setPage={setPage} />
      )}
      {page === "cart" && (
        <Cart cart={cart} setCart={setCart} setPage={setPage} user={user} />
      )}
      {page === "auth" && <Auth setPage={setPage} />}
      {page === "orders" && <MyOrders setPage={setPage} />}

    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px 40px",
  background: "#111",
  borderBottom: "1px solid maroon"
};
