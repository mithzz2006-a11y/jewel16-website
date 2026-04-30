import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import PageWrapper from "./components/PageWrapper";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav"; // ✅ NEW

/* PAGES */
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          const ref = doc(db, "users", u.uid);
          const snap = await getDoc(ref);

          let isAdmin = false;

          if (snap.exists()) {
            if (snap.data().role === "admin") {
              isAdmin = true;
            }
          } else {
            await setDoc(ref, {
              email: u.email,
              role: "user"
            });
          }

          setUser({ ...u, isAdmin });
        } catch (err) {
          console.log("Auth error:", err);
          setUser({ ...u, isAdmin: false });
        }
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  if (!user) {
    return <Auth setUser={setUser} />;
  }

  return (
    <div style={appContainer}>

      {/* 🔥 TOP NAVBAR */}
      <Navbar setPage={setPage} cart={cart} user={user} />

      {/* 🔥 PAGE CONTENT */}
      <div style={pageWrapper}>

        {page === "home" && <Home setPage={setPage} />}

        {page === "products" && (
          <Products
            setPage={setPage}
            setCart={setCart}
            setSelectedProduct={setSelectedProduct}
          />
        )}

        {page === "detail" && (
          <ProductDetail
            product={selectedProduct}
            setCart={setCart}
            setPage={setPage}
          />
        )}

        {page === "cart" && (
          <Cart cart={cart} setPage={setPage} />
        )}

        {page === "checkout" && (
          <Checkout cart={cart} user={user} />
        )}

        {page === "orders" && (
          <MyOrders user={user} />
        )}

        {page === "profile" && (
          <Profile user={user} />
        )}

        {page === "admin" && user?.isAdmin && (
          <Admin setPage={setPage} />
        )}

      </div>

      {/* 🔥 BOTTOM APP NAV (NEW) */}
      <BottomNav setPage={setPage} cart={cart} />

    </div>
  );
}

/* 💎 RESPONSIVE SAFE STYLES */

const appContainer = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const pageWrapper = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "10px",
  paddingBottom: "80px", // ✅ VERY IMPORTANT (prevents overlap)
};
