export default function ProductCard({ product, setCart }) {

  const addToCart = (e) => {
    e.stopPropagation();

    setCart((prev = []) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
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
    <div
      style={card}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-6px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      {/* IMAGE */}
      <div style={imgWrap}>
        <img
          src={product?.image || "https://via.placeholder.com/300"}
          style={img}
        />
      </div>

      {/* CONTENT */}
      <div style={content}>
        <h3 style={name}>{product?.name}</h3>

        <p style={price}>₹{product?.price || 0}</p>

        <button style={btn} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

/* 💎 PREMIUM STYLES */

const card = {
  background: "#fff",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  transition: "0.3s",
};

const imgWrap = {
  width: "100%",
  height: "220px",
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "0.4s",
};

const content = {
  padding: "12px",
};

const name = {
  fontSize: "14px",
  fontWeight: "500",
};

const price = {
  color: "maroon",
  fontWeight: "bold",
  marginTop: "5px",
  fontSize: "16px",
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  background: "maroon",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};
