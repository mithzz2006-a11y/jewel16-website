import ProductCard from "../components/ProductCard";

export default function Products({ products, setCart, setPage, setSelectedProduct }) {
  return (
    <div>

      {/* 🔥 HERO (same style as Home) */}
      <div style={hero}>
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
        <h2>Luxury You Can Trust</h2>
        <p style={brandText}>
          At JEWEL16, every piece is crafted with precision, passion, and perfection.
          Experience jewellery that defines class and confidence.
        </p>
      </div>

      {/* 🛍 PRODUCT GRID */}
      <div style={grid}>
        {products?.map((p) => (
          <div
            key={p.id}
            onClick={() => {
              setSelectedProduct(p);
              setPage("detail");
            }}
            style={cardWrap}
          >
            <ProductCard product={p} setCart={setCart} />
          </div>
        ))}
      </div>

    </div>
  );
}

/* 🎨 STYLES (RESPONSIVE SAFE) */

const hero = {
  minHeight: "70vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
};

const title = {
  fontSize: "clamp(28px, 6vw, 55px)",
};

const subtitle = {
  marginTop: "10px",
  color: "#ddd",
  fontSize: "clamp(14px, 3vw, 18px)",
  maxWidth: "500px",
};

const btn = {
  marginTop: "20px",
  padding: "12px 20px",
  background: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontSize: "14px",
};

const brand = {
  textAlign: "center",
  padding: "40px 20px",
  background: "#fff",
};

const brandText = {
  maxWidth: "600px",
  margin: "10px auto",
  fontSize: "14px",
  color: "#555",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: "15px",
  padding: "15px",
};

const cardWrap = {
  cursor: "pointer",
  transition: "transform 0.2s",
};
