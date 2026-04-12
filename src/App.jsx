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

  const logout = async () => {
    await signOut(auth);
    alert("Logged out");
    setPage("home");
  };

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", color: "white" }}>

      {/* 🔥 NAVBAR */}
      <div style={navbar}>

        {/* LOGO */}
        <h2 style={logo}>JEWEL16 💎</h2>

        {/* NAV BUTTONS */}
        <div style={navRight}>
          <button style={navBtn} onClick={() => setPage("home")}>Home</button>
          <button style={navBtn} onClick={() => setPage("products")}>Products</button>
          <button style={navBtn} onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>

          {!user ? (
            <button style={navBtn} onClick={() => setPage("auth")}>
              Login
            </button>
          ) : (
            <>
              <button style={navBtn} onClick={() => setPage("orders")}>
                Orders
              </button>
              <button style={navBtn} onClick={logout}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* 🔥 USER INFO */}
      {user && (
        <p style={{ paddingLeft: "20px", marginTop: "10px", color: "#ccc" }}>
          Logged in as: {user.email}
        </p>
      )}

      {/* 🔥 PAGES */}
      <div style={{ padding: "20px" }}>
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

      {/* 🔥 FLOATING CART */}
      <div style={floatingCart} onClick={() => setPage("cart")}>
        🛒 {cart.length}
      </div>

    </div>
  );
}

/* 💎 STYLES */

const navbar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 40px",
  background: "#111",
  borderBottom: "2px solid maroon"
};

const logo = {
  fontWeight: "bold",
  fontSize: "22px",
  letterSpacing: "1px"
};

const navRight = {
  display: "flex",
  gap: "15px",
  alignItems: "center"
};

const navBtn = {
  padding: "10px 18px",
  background: "#1a1a1a",
  color: "white",
  border: "1px solid maroon",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "14px",
  transition: "0.3s"
};

const floatingCart = {
  position: "fixed",
  top: "80px",
  right: "20px",
  background: "maroon",
  color: "white",
  padding: "12px 16px",
  borderRadius: "50%",
  cursor: "pointer",
  fontWeight: "bold",
  boxShadow: "0 0 10px rgba(128,0,0,0.6)"
};
