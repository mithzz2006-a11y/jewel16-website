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
        ...doc.data(),
        stock: doc.data().stock ?? 0 // ✅ ENSURE STOCK EXISTS
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
              {/* 🔥 PASS STOCK TO CARD */}
              <ProductCard product={p} setCart={setCart} />
            </div>
          ))
        )}
      </div>

    </div>
  );
}
