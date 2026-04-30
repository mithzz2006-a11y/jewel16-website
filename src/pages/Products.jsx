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
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  padding: "20px",
};

const hero = {
  minHeight: "25vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
};

const title = {
  fontSize: "clamp(24px, 5vw, 36px)",
};

const subtitle = {
  color: "#ddd",
};
