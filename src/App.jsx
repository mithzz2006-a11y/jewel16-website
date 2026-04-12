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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  if (!user) return <Auth />;

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "maroon" }}>

      {/* 🔥 NAVBAR */}
      <div style={nav}>

        <h2 style={logo}>JEWEL16</h2>

        {/* DESKTOP MENU */}
        <div style={navLinks} className="desktop">
          <NavButton text="Home" onClick={() => setPage("home")} />
          <NavButton text="Products" onClick={() => setPage("products")} />
          <NavButton text={`Cart (${cart.length})`} onClick={() => setPage("cart")} />
          <NavButton text="Orders" onClick={() => setPage("orders")} />
          <NavButton text="Logout" onClick={() => signOut(auth)} />
        </div>

        {/* MOBILE ICON */}
        <div style={menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div style={mobileMenu}>
          <NavButton text="Home" onClick={() => { setPage("home"); setMenuOpen(false); }} />
          <NavButton text="Products" onClick={() => { setPage("products"); setMenuOpen(false); }} />
          <NavButton text={`Cart (${cart.length})`} onClick={() => { setPage("cart"); setMenuOpen(false); }} />
          <NavButton text="Orders" onClick={() => { setPage("orders"); setMenuOpen(false); }} />
          <NavButton text="Logout" onClick={() => signOut(auth)} />
        </div>
      )}

      {/* PAGES */}
      <div style={{ padding: "20px" }}>
        {page === "home" && <Home setPage={setPage} />}
        {page === "products" && <Products cart={cart} setCart={setCart} />}
        {page === "cart" && <Cart cart={cart} setCart={setCart} setPage={setPage} user={user} />}
        {page === "orders" && <MyOrders setPage={setPage} />}
      </div>

    </div>
  );
}

/* 🔥 NAV BUTTON COMPONENT */
function NavButton({ text, onClick }) {
  return (
    <button style={btn} onClick={onClick}>
      {text}
    </button>
  );
}

/* 💎 STYLES */

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  borderBottom: "2px solid black",
  position: "relative"
};

const logo = {
  fontSize: "clamp(18px, 4vw, 26px)",
  fontWeight: "bold"
};

const navLinks = {
  display: "flex",
  gap: "15px"
};

const menuIcon = {
  fontSize: "24px",
  cursor: "pointer",
  display: "none"
};

const mobileMenu = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "15px",
  borderBottom: "1px solid black"
};

const btn = {
  background: "#fff",
  border: "1px solid black",
  padding: "8px 14px",
  fontWeight: "bold",
  color: "maroon",
  cursor: "pointer"
};

/* 🔥 RESPONSIVE CSS */
const style = document.createElement("style");
style.innerHTML = `
  @media (max-width: 768px) {
    .desktop {
      display: none !important;
    }
  }

  @media (min-width: 769px) {
    .desktop {
      display: flex !important;
    }
  }

  @media (max-width: 768px) {
    div[style*="menuIcon"] {
      display: block !important;
    }
  }
`;
document.head.appendChild(style);
