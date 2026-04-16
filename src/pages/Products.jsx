import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

export default function Products({ setCart, setPage, setSelectedProduct }) {

  const [products, setProducts] = useState([]);

  /* 🔥 FIRESTORE CONNECT */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
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
          Experience jewellery that defines class and confidence.
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
              onClick={() => {
                setSelectedProduct(p);
                setPage("detail");
              }}
              style={cardWrap}
            >
              <ProductCard product={p} setCart={setCart} />
            </div>
          ))
        )}
      </div>

    </div>
  );
}

/* 🎨 ULTRA LUXURY STYLES */

const hero = {
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
  position: "relative",
  overflow: "hidden",
};

const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "radial-gradient(circle, rgba(255,255,255,0.05), transparent)",
};

const title = {
  fontSize: "clamp(30px, 6vw, 55px)",
  letterSpacing: "2px",
  fontWeight: "700",
  textShadow: "0 0 15px rgba(255,255,255,0.2)",
  zIndex: 1,
};

const subtitle = {
  marginTop: "10px",
  color: "#ddd",
  fontSize: "clamp(14px, 3vw, 18px)",
  maxWidth: "500px",
  zIndex: 1,
};

const btn = {
  marginTop: "25px",
  padding: "12px 22px",
  background: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontWeight: "600",
  boxShadow: "0 5px 15px rgba(255,255,255,0.2)",
  zIndex: 1,
};

const brand = {
  textAlign: "center",
  padding: "50px 20px",
  background: "#fff",
};

const brandTitle = {
  fontSize: "clamp(22px, 4vw, 32px)",
  letterSpacing: "1px",
};

const brandText = {
  maxWidth: "600px",
  margin: "15px auto",
  fontSize: "14px",
  color: "#555",
  lineHeight: "1.6",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
  padding: "20px",
};

/* 🔥 PREMIUM CARD EFFECT */
const cardWrap = {
  cursor: "pointer",
  transition: "all 0.3s ease",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
};
