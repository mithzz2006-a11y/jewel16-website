export default function ProductCard({ product, setCart }) {

  const addToCart = (e) => {
    e.stopPropagation();

    if ((product.stock ?? 0) <= 0) {
      alert("Out of stock ❌");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);

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

      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div style={card}>
      <img
        src={product.image || "https://via.placeholder.com/200"}
        style={img}
      />

      <h3 style={name}>{product.name}</h3>

      <p style={price}>
        ₹{product.price || 0}
      </p>

      <p style={stock}>
        Stock: {product.stock ?? 0}
      </p>

      {(product.stock ?? 0) === 0 && (
        <p style={out}>Out of Stock</p>
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

/* 🎨 RESPONSIVE PREMIUM STYLES */

const card = {
  border: "1px solid #eee",
  padding: "12px",
  borderRadius: "12px",
  textAlign: "center",
  transition: "0.3s",
  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
  background: "white",
};

const img = {
  width: "100%",
  height: "clamp(140px, 25vw, 180px)", // 🔥 responsive image
  objectFit: "cover",
  borderRadius: "10px",
};

const name = {
  fontSize: "clamp(14px, 3.5vw, 16px)",
  marginTop: "8px",
};

const price = {
  color: "maroon",
  fontWeight: "bold",
  fontSize: "clamp(14px, 3.5vw, 16px)",
  marginTop: "5px",
};

const stock = {
  fontSize: "12px",
  color: "gray",
};

const out = {
  color: "red",
  fontWeight: "bold",
  fontSize: "13px",
};

const btn = {
  marginTop: "10px",
  padding: "12px", // 🔥 better touch
  width: "100%",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
};
