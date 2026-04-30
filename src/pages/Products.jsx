import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ProductCard from "../components/ProductCard";

export default function Products({ setCart, setPage, setSelectedProduct }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
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
    });

    return () => unsub();
  }, []);

  return (
    <div>
      {/* 🔥 HERO SMALL */}
      <div style={hero}>
        <h1 style={title}>Our Collection 💎</h1>
        <p style={subtitle}>Explore luxury jewellery</p>
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

/* 🎨 STYLES */
const hero = {
  minHeight: "30vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
};

const title = {
  fontSize: "clamp(24px, 6vw, 40px)",
};

const subtitle = {
  color: "#ccc",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "15px",
  padding: "15px",
};

const cardWrap = {
  cursor: "pointer",
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "10px",
  background: "#fff",
  transition: "transform 0.2s ease",
};
