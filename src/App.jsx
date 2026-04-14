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

  /* 🔐 LOGIN + ADMIN CHECK */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        let isAdmin = false;

        try {
          const ref = doc(db, "users", u.uid);
          const snap = await getDoc(ref);

          if (snap.exists() && snap.data().role === "admin") {
            isAdmin = true;
          }
        } catch (err) {
          console.log("Admin check error:", err);
        }

        setUser({ ...u, isAdmin });
      } else {
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  /* 🔁 PAGE SWITCH */
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
        return user?.isAdmin
          ? <Admin setPage={setPage} />
          : <Home setPage={setPage} />;
      default:
        return <Home setPage={setPage} />;
    }
  };

  return (
    <div>
      {user && (
        <Navbar
          setPage={setPage}
          user={user}
        />
      )}

      {renderPage()}
    </div>
  );
}
