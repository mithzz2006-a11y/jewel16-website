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
            stock: Number(d.stock) || 0,
          };
        });
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
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
        <p style={subtitle}>Explore luxury jewellery</p>
        <button style={btn} onClick={() => setPage("cart")}>
          View Cart
        </button>
      </div>

      {/* 💎 BRAND */}
      <div style={brand}>
        <h2 style={brandTitle}>Luxury You Can Trust</h2>
        <p style={brandText}>
          At JEWEL16, every piece is crafted with precision, passion, and
          perfection. Experience jewellery that defines class and confidence.
        </p>
      </div>

      {/* 🛍 GRID */}
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
const hero = {
  minHeight: "clamp(28vh, 35vh, 40vh)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
  position: "relative",
};

const overlay = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
};

const title = {
  fontSize: "clamp(22px, 5vw, 40px)",
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
  padding: "12px 18px",
  background: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontSize: "14px",
  zIndex: 1,
};

const brand = {
  textAlign: "center",
  padding: "clamp(30px, 5vw, 50px) 15px",
  background: "#fff",
};

const brandTitle = {
  fontSize: "clamp(20px, 4vw, 30px)",
};

const brandText = {
  color: "#555",
  fontSize: "clamp(13px, 3vw, 16px)",
  lineHeight: "1.6",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "clamp(12px, 3vw, 20px)",
  padding: "clamp(10px, 3vw, 20px)",
};

const cardWrap = {
  cursor: "pointer",
};
