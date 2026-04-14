import { useState, useEffect } from "react";
import { auth, db } from "./firebase"; // ✅ fixed duplicate import
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
// (keep your other imports same)

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ❌ REMOVED ADMIN_EMAIL (not needed anymore)

  useEffect(() => {
    onAuthStateChanged(auth, async (u) => {   // ✅ edited
      if (u) {
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);

        let isAdmin = false;

        if (snap.exists() && snap.data().role === "admin") {
          isAdmin = true;
        }

        setUser({ ...u, isAdmin }); // ✅ attach admin
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div>

      {/* keep everything SAME */}

      {page === "orders" && <MyOrders user={user} />}
      {page === "profile" && <Profile user={user} />}

      {/* ❌ OLD REMOVED */}
      {/* {page === "admin" && user.email === ADMIN_EMAIL && <Admin />} */}

      {/* ✅ FIXED ADMIN */}
      {page === "admin" && user?.isAdmin && <Admin />}

    </div>
  );
}
