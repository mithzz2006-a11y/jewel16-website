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

      {/* 🔥 HERO (REDUCED) */}
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

/* 🎨 STYLES */

/* 🔥 HERO REDUCED */
const hero = {
  minHeight: "35vh", // ✅ reduced from 70vh
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
  fontSize: "clamp(26px, 5vw, 45px)", // slightly reduced
  letterSpacing: "2px",
  zIndex: 1,
};

const subtitle = {
  marginTop: "8px",
  color: "#ddd",
  fontSize: "clamp(13px, 3vw, 16px)",
  zIndex: 1,
};

const btn = {
  marginTop: "15px",
  padding: "10px 20px",
  background: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontSize: "13px",
  zIndex: 1,
};

const brand = {
  textAlign: "center",
  padding: "50px 20px",
  background: "#fff",
};

const brandTitle = {
  fontSize: "clamp(22px, 4vw, 32px)",
};

const brandText = {
  maxWidth: "600px",
  margin: "10px auto",
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

const cardWrap = {
  cursor: "pointer",
};
