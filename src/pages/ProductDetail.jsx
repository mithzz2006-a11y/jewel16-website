export default function ProductDetail({ product, setCart, setPage }) {

  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <p>Product not found</p>
        <button onClick={() => setPage("products")}>
          Go Back
        </button>
      </div>
    );
  }

  const addToCart = () => {
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
    <div style={container}>

      {/* 🔙 BACK */}
      <button style={back} onClick={() => setPage("products")}>
        ← Back
      </button>

      {/* 🖼 IMAGE */}
      <img
        src={product.image || "https://via.placeholder.com/400"}
        style={img}
      />

      {/* 📦 DETAILS */}
      <h2 style={name}>{product.name}</h2>

      <p style={price}>₹{product.price}</p>

      <p style={stock}>
        Stock: {product.stock ?? 0}
      </p>

      {(product.stock ?? 0) === 0 && (
        <p style={out}>Out of Stock</p>
      )}

      {/* 📝 DESCRIPTION */}
      <p style={desc}>
        Premium handcrafted jewellery designed for elegance,
        durability, and timeless luxury.
      </p>

      {/* 🛒 BUTTON */}
      <button
        style={{
          ...btn,
          background: (product.stock ?? 0) === 0 ? "#aaa" : "maroon"
        }}
        onClick={addToCart}
        disabled={(product.stock ?? 0) === 0}
      >
        Add to Cart
      </button>

    </div>
  );
}

/* 🎨 STYLES */

const container = {
  maxWidth: "500px",
  margin: "auto",
  padding: "20px",
  textAlign: "center",
};

const back = {
  marginBottom: "10px",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const img = {
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "12px",
};

const name = {
  marginTop: "15px",
};

const price = {
  color: "maroon",
  fontWeight: "bold",
  fontSize: "20px",
};

const stock = {
  color: "gray",
};

const out = {
  color: "red",
  fontWeight: "bold",
};

const desc = {
  marginTop: "10px",
  color: "#555",
};

const btn = {
  marginTop: "20px",
  padding: "14px",
  width: "100%",
  color: "white",
  border: "none",
  borderRadius: "8px",
};
