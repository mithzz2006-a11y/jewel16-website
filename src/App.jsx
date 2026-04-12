import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import MyOrders from "./pages/MyOrders";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  const logout = async () => {
    await signOut(auth);
    alert("Logged out");
    setPage("home");
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh" }}>
      
      {/* NAVBAR */}
      <div style={nav}>
        <h2 style={{ color: "white" }}>JEWEL16 💎</h2>

        <div style={{ display: "flex", gap: "15px" }}>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>

          {user && (
            <button onClick={() => setPage("orders")}>
              My Orders
            </button>
          )}

          {!user ? (
            <button onClick={() => setPage("auth")}>Login</button>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      </div>

      {/* USER INFO */}
      {user && (
        <p style={{ color: "white", padding: "10px 20px" }}>
          {user.email}
        </p>
      )}

      {/* ROUTES */}
      {page === "home" && <Home setPage={setPage} />}
      {page === "products" && (
        <Products cart={cart} setCart={setCart} setPage={setPage} />
      )}
      {page === "cart" && (
        <Cart cart={cart} setCart={setCart} setPage={setPage} user={user} />
      )}
      {page === "auth" && <Auth setPage={setPage} />}
      {page === "orders" && <MyOrders setPage={setPage} />}
      {page === "admin" && <Admin setPage={setPage} />}

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
