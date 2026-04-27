import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

export default function Products({ setCart, setPage, setSelectedProduct }) {

  const [products, setProducts] = useState([]);

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
      <div style={hero}>
        <div style={overlay}></div>

        <h1 style={title}>Our Collection 💎</h1>

        <p style={subtitle}>
          Discover handcrafted luxury designed for timeless elegance
        </p>

        <button
          style={btn}
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          View Products
        </button>
      </div>

      {/* 💎 BRAND TEXT */}
      <div style={brand}>
        <h2 style={brandTitle}>Luxury You Can Trust</h2>
        <p style={brandText}>
          At JEWEL16, every piece is crafted with precision, passion, and perfection.
        </p>
      </div>

      {/* 🛍 PRODUCT GRID */}
      <div style={grid}>
        {products.length === 0 ? (
          <p style={{ textAlign: "center" }}>No products available</p>
        ) : (
          products.map((p) => (
            <div
              key={p.id}
              style={cardWrap}
              onClick={() => {
                setSelectedProduct(p);
                setPage("detail");
              }}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <ProductCard product={p} setCart={setCart} />
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}

/* 🎨 RESPONSIVE STYLES */

/* 🔥 HERO FIXED FOR MOBILE */
const hero = {
  minHeight: "clamp(28vh, 35vh, 40vh)", // 🔥 smart responsive
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
  position: "relative",
};

const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "radial-gradient(circle, rgba(255,255,255,0.05), transparent)",
};

const title = {
  fontSize: "clamp(22px, 5vw, 40px)", // 🔥 smaller on mobile
  letterSpacing: "1.5px",
  zIndex: 1,
};

const subtitle = {
  marginTop: "8px",
  color: "#ddd",
  fontSize: "clamp(12px, 3vw, 15px)",
  padding: "0 10px",
  zIndex: 1,
};

const btn = {
  marginTop: "15px",
  padding: "12px 18px", // 🔥 touch friendly
  background: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontSize: "14px",
  zIndex: 1,
};

/* 💎 BRAND */
const brand = {
  textAlign: "center",
  padding: "clamp(30px, 5vw, 50px) 15px",
  background: "#fff",
};

const brandTitle = {
  fontSize: "clamp(20px, 4vw, 30px)",
};

const brandText = {
  maxWidth: "600px",
  margin: "10px auto",
  fontSize: "14px",
  color: "#555",
  lineHeight: "1.6",
};

/* 🔥 GRID FIX (MOST IMPORTANT) */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", // 🔥 FIXED
  gap: "clamp(12px, 3vw, 20px)",
  padding: "clamp(10px, 3vw, 20px)",
};

const cardWrap = {
  cursor: "pointer",
};
