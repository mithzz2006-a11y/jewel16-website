import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

/* COMPONENTS */
import Navbar from "./components/Navbar";

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
          console.log("REAL UID:", u.uid); // 🔥 DEBUG (remove later)

          const ref = doc(db, "users", u.uid);
          const snap = await getDoc(ref);

          let isAdmin = false;

          if (snap.exists()) {
            if (snap.data().role === "admin") {
              isAdmin = true;
            }
          } else {
            // 🔥 AUTO CREATE USER DOC (VERY IMPORTANT)
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

  /* 🔒 LOGIN SCREEN */
  if (!user) {
    return <Auth setUser={setUser} />;
  }

  return (
    <div>

      {/* 🔥 NAVBAR */}
      <Navbar setPage={setPage} cart={cart} user={user} />

      {/* 🔥 ROUTING */}
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

      {/* 🔐 ADMIN */}
      {page === "admin" && user?.isAdmin && (
        <Admin setPage={setPage} />
      )}

    </div>
  );
}
