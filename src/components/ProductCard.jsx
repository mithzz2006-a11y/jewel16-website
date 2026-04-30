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

      {/* ❤️ WISHLIST ICON */}
      <div style={heart}>🤍</div>

      {/* 🖼 IMAGE */}
      <img
        src={product.image || "https://via.placeholder.com/200"}
        style={img}
      />

      {/* 📦 DETAILS */}
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

      {/* 🛒 BUTTON */}
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

/* 🎨 PREMIUM STYLES */

const card = {
  border: "1px solid #eee",
  padding: "12px",
  borderRadius: "14px",
  textAlign: "center",
  transition: "0.3s",
  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
  background: "white",
  position: "relative",
  cursor: "pointer",
};

/* ❤️ HEART */
const heart = {
  position: "absolute",
  top: "10px",
  right: "10px",
  fontSize: "18px",
  cursor: "pointer",
};

/* 🖼 IMAGE */
const img = {
  width: "100%",
  height: "clamp(140px, 25vw, 180px)",
  objectFit: "cover",
  borderRadius: "12px",
};

/* 📝 NAME */
const name = {
  fontSize: "clamp(14px, 3.5vw, 16px)",
  marginTop: "10px",
  fontWeight: "600",
};

/* 💰 PRICE */
const price = {
  color: "maroon",
  fontWeight: "bold",
  fontSize: "clamp(14px, 3.5vw, 16px)",
  marginTop: "5px",
};

/* 📦 STOCK */
const stock = {
  fontSize: "12px",
  color: "gray",
};

/* ❌ OUT */
const out = {
  color: "red",
  fontWeight: "bold",
  fontSize: "13px",
};

/* 🛒 BUTTON */
const btn = {
  marginTop: "12px",
  padding: "12px",
  width: "100%",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  transition: "0.2s",
};
