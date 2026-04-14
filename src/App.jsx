import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Navbar from "./components/Navbar";
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
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {
      if (u) {
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);

        let isAdmin = false;

        if (snap.exists() && snap.data().role === "admin") {
          isAdmin = true;
        }

        setUser({ ...u, isAdmin });
      } else {
        setUser(null);
      }
    });
  }, []);

  if (!user) return <Auth setUser={setUser} />;

  return (
    <div>
      <Navbar setPage={setPage} cart={cart} user={user} />

      {page === "home" && <Home setPage={setPage} />}

      {page === "products" && (
        <Products
          setCart={setCart}
          setPage={setPage}
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

      {page === "cart" && <Cart cart={cart} setPage={setPage} />}
      {page === "checkout" && <Checkout cart={cart} user={user} />}
      {page === "orders" && <MyOrders user={user} />}
      {page === "profile" && <Profile user={user} />}

      {/* 🔐 REAL ADMIN PROTECTION */}
      {page === "admin" && user.isAdmin && <Admin />}
    </div>
  );
}
