export default function ProductDetail({ product, setCart, setPage }) {

  if (!product) {
    return (
      <div style={{ padding: 20 }}>
        Product not found
      </div>
    );
  }

  const addToCart = () => {
    if ((product.stock ?? 0) <= 0) {
      alert("Out of stock ❌");
      return;
    }

    setCart((prev = []) => {

      const existing = prev.find(
        (i) => i.id === product.id
      );

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

    alert("Added to cart 💎");
  };

  return (
    <div style={page}>

      {/* 🔙 BACK */}
      <button
        style={backBtn}
        onClick={() => setPage("products")}
      >
        ← Back
      </button>

      {/* 💎 CARD */}
      <div style={card}>

        {/* 🖼 IMAGE */}
        <div style={imgWrap}>
          <img
            src={
              product?.image ||
              "https://via.placeholder.com/500"
            }
            alt={product?.name}
            style={img}
          />

          {/* 🔥 STOCK BADGE */}
          <div
            style={{
              ...badge,
              background:
                (product.stock ?? 0) > 0
                  ? "#0f9d58"
                  : "#d93025",
            }}
          >
            {(product.stock ?? 0) > 0
              ? "In Stock"
              : "Out of Stock"}
          </div>
        </div>

        {/* 📦 CONTENT */}
        <div style={content}>

          <h1 style={name}>
            {product?.name}
          </h1>

          <p style={price}>
            ₹{product?.price || 0}
          </p>

          <p style={desc}>
            Premium handcrafted jewellery designed
            with elegance, luxury, and timeless beauty.
            Perfect for every occasion.
          </p>

          {/* 🚚 DELIVERY */}
          <div style={infoBox}>
            🚚 Free delivery in 3-5 days
          </div>

          <div style={infoBox}>
            🔒 Secure payment & premium packaging
          </div>

          <div style={infoBox}>
            💎 Authentic luxury jewellery
          </div>

          {/* 🛒 BUTTONS */}
          <div style={btnRow}>

            <button
              style={cartBtn}
              onClick={addToCart}
            >
              Add to Cart
            </button>

            <button
              style={buyBtn}
              onClick={() => {
                addToCart();
                setPage("cart");
              }}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

/* 🎨 PREMIUM STYLES */

const page = {
  minHeight: "100vh",
  background: "#f5f5f5",
  padding: "20px",
};

const backBtn = {
  marginBottom: "20px",
  border: "none",
  background: "white",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const card = {
  background: "white",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))",
};

const imgWrap = {
  position: "relative",
  background: "#fafafa",
};

const img = {
  width: "100%",
  height: "100%",
  minHeight: "420px",
  objectFit: "cover",
};

const badge = {
  position: "absolute",
  top: "18px",
  left: "18px",
  color: "white",
  padding: "8px 14px",
  borderRadius: "30px",
  fontSize: "13px",
  fontWeight: "600",
};

const content = {
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const name = {
  fontSize: "clamp(28px, 5vw, 42px)",
  marginBottom: "10px",
};

const price = {
  color: "maroon",
  fontSize: "30px",
  fontWeight: "700",
  marginBottom: "15px",
};

const desc = {
  color: "#666",
  lineHeight: "1.8",
  fontSize: "15px",
};

const infoBox = {
  background: "#fafafa",
  padding: "14px",
  borderRadius: "12px",
  marginTop: "12px",
  fontSize: "14px",
  border: "1px solid #eee",
};

const btnRow = {
  display: "flex",
  gap: "12px",
  marginTop: "25px",
  flexWrap: "wrap",
};

const cartBtn = {
  flex: 1,
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "black",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  minWidth: "140px",
};

const buyBtn = {
  flex: 1,
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background:
    "linear-gradient(to right, #4b0000, maroon)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
  minWidth: "140px",
};
