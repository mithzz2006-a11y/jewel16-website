import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

export default function Products({ setCart, setPage, setSelectedProduct }) {

  const [products, setProducts] = useState([]);

  /* 🔥 FIRESTORE CONNECT */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      try {
        const data = snap.docs.map((doc) => {
          const d = doc.data() || {};

          return {
            id: doc.id,
            name: d.name || "No Name",
            price: Number(d.price) || 0,
            image: d.image || "",
            stock: Number(d.stock) || 0
          };
        });

        setProducts(data);
      } catch (err) {
        console.log("PRODUCT ERROR:", err);
      }
    });

    return () => unsub();
  }, []);

  return (
    <div>

      {/* 🔥 HERO */}
      {/* 🔥 HERO (REDUCED) */}
      <div style={hero}>
        <div style={overlay}></div>

@@ -78,7 +78,6 @@
                setPage("detail");
              }}
            >
              {/* 🔥 FIX CLICK CRASH */}
              <div onClick={(e) => e.stopPropagation()}>
                <ProductCard product={p} setCart={setCart} />
              </div>
@@ -91,10 +90,11 @@
  );
}

/* 🎨 FULL STYLES (THIS WAS MISSING BEFORE → CAUSED CRASH) */
/* 🎨 STYLES */

/* 🔥 HERO REDUCED */
const hero = {
  minHeight: "70vh",
  minHeight: "35vh", // ✅ reduced from 70vh
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
@@ -114,25 +114,26 @@
};

const title = {
  fontSize: "clamp(30px, 6vw, 55px)",
  fontSize: "clamp(26px, 5vw, 45px)", // slightly reduced
  letterSpacing: "2px",
  zIndex: 1,
};

const subtitle = {
  marginTop: "10px",
  marginTop: "8px",
  color: "#ddd",
  fontSize: "clamp(14px, 3vw, 18px)",
  fontSize: "clamp(13px, 3vw, 16px)",
  zIndex: 1,
};

const btn = {
  marginTop: "20px",
  padding: "12px 22px",
  marginTop: "15px",
  padding: "10px 20px",
  background: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontSize: "13px",
  zIndex: 1,
};
