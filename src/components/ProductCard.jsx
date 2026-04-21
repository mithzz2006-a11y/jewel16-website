export default function ProductCard({ product, setCart }) {

  const addToCart = (e) => {
    e.stopPropagation(); // ✅ FIX WHITE SCREEN (VERY IMPORTANT)

    // 🔴 STOCK CHECK
    if ((product.stock ?? 0) <= 0) {
      alert("Out of stock ❌");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      // 🔥 IF ALREADY IN CART → INCREASE QTY
      if (existing) {
        if (existing.qty >= product.stock) {
          alert("Stock limit reached ⚠️");
          return prev;
        }

        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: (i.qty || 1) + 1 }
            : i
        );
      }

      // 🆕 NEW PRODUCT
      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div style={card}>
      <img
        src={product.image || "https://via.placeholder.com/200"} // ✅ FIX CRASH
        style={img}
      />

      <h3>{product.name}</h3>

      <p style={{ color: "maroon", fontWeight: "bold" }}>
        ₹{product.price || 0}
      </p>

      {/* 🔥 STOCK INFO */}
      <p style={{ fontSize: "12px", color: "gray" }}>
        Stock: {product.stock ?? 0}
      </p>

      {/* 🔴 OUT OF STOCK */}
      {(product.stock ?? 0) === 0 && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          Out of Stock
        </p>
      )}

      <button
        style={{
          ...btn,
          background: (product.stock ?? 0) === 0 ? "#aaa" : "black",
          cursor: (product.stock ?? 0) === 0 ? "not-allowed" : "pointer"
        }}
        onClick={addToCart}
        disabled={(product.stock ?? 0) === 0}
      >
        Add to Cart
      </button>
    </div>
  );
}

/* 🎨 SAME UI (UNCHANGED) */

const card = {
  border: "1px solid #eee",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  transition: "0.3s",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const img = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "10px",
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  color: "white",
  border: "none",
  borderRadius: "5px",
};
