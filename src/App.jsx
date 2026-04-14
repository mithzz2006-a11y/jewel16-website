import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

/* PAGES */
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Auth from "./pages/Auth";

import Navbar from "./components/Navbar";

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  /* 🔐 AUTH + ADMIN CHECK */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);

        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setIsAdmin(data.role === "admin");
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsub();
  }, []);

  /* 🔁 PAGE ROUTING */
  const renderPage = () => {
    if (!user) return <Auth setUser={setUser} />;

    switch (page) {
      case "home":
        return <Home setPage={setPage} />;
      case "products":
        return <Products setPage={setPage} />;
      case "cart":
        return <Cart setPage={setPage} />;
      case "checkout":
        return <Checkout setPage={setPage} />;
      case "orders":
        return <MyOrders setPage={setPage} />;
      case "profile":
        return <Profile setPage={setPage} user={user} />;
      case "admin":
        return isAdmin ? <Admin setPage={setPage} /> : <Home setPage={setPage} />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div>
      {user && (
        <Navbar
          setPage={setPage}
          isAdmin={isAdmin}
        />
      )}

      {renderPage()}
    </div>
  );
}
