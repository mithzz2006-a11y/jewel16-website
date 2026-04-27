export default function Home({ setPage }) {
  return (
    <div>

      {/* 🔥 HERO (REDUCED SIZE) */}
      <div style={hero}>
        <div style={overlay}></div>

        <h1 style={title}>JEWEL16 💎</h1>
        <p style={subtitle}>Where Luxury Meets Elegance</p>

        <button style={btn} onClick={() => setPage("products")}>
          Explore Collection
        </button>
      </div>

      {/* 💎 COLLECTION */}
      <div style={section}>
        <h2 style={heading}>Our Collections</h2>

        <div style={grid}>
          <div style={card}>
            <img src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0" style={img}/>
            <p style={cardText}>Gold Jewellery</p>
          </div>

          <div style={card}>
            <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" style={img}/>
            <p style={cardText}>Diamond Collection</p>
          </div>

          <div style={card}>
            <img src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1" style={img}/>
            <p style={cardText}>Bracelets</p>
          </div>
        </div>
      </div>

      {/* 🛡 TRUST */}
      <div style={trust}>
        <div style={trustItem}>
          <h3>🔒 Secure Payment</h3>
          <p>Safe & encrypted transactions</p>
        </div>

        <div style={trustItem}>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick & reliable shipping</p>
        </div>

        <div style={trustItem}>
          <h3>💎 Premium Quality</h3>
          <p>Luxury crafted jewellery</p>
        </div>
      </div>

    </div>
  );
}

/* 🎨 UPDATED STYLES */

/* 🔥 HERO (REDUCED HEIGHT) */
const hero = {
  minHeight: "35vh", // 🔥 FIXED (was 90vh)
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
  position: "relative",
  overflow: "hidden",
};

/* 🔥 OVERLAY */
const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
  top: 0,
  left: 0,
};

/* 🔥 SMALLER TITLE */
const title = {
  fontSize: "clamp(24px, 5vw, 40px)",
  letterSpacing: "2px",
  fontWeight: "700",
  textShadow: "0 0 12px rgba(255,255,255,0.2)",
  zIndex: 1,
};

/* 🔥 SMALLER SUBTITLE */
const subtitle = {
  marginTop: "8px",
  fontSize: "clamp(12px, 3vw, 16px)",
  color: "#ddd",
  letterSpacing: "0.5px",
  zIndex: 1,
};

/* 🔥 BUTTON */
const btn = {
  marginTop: "15px",
  padding: "10px 20px",
  background: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontWeight: "500",
  fontSize: "13px",
  boxShadow: "0 4px 12px rgba(255,255,255,0.15)",
  transition: "0.3s",
  zIndex: 1,
};

/* 💎 SECTION */
const section = {
  padding: "50px 20px",
  background: "#fff",
};

const heading = {
  textAlign: "center",
  marginBottom: "30px",
  fontSize: "clamp(24px, 4vw, 34px)",
  letterSpacing: "1px",
};

/* 🔥 GRID */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
  gap: "25px",
};

/* 💎 CARD */
const card = {
  textAlign: "center",
  transition: "0.4s",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
};

/* ✨ IMAGE */
const img = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  transition: "0.4s",
};

/* 🔥 TEXT */
const cardText = {
  marginTop: "12px",
  fontWeight: "600",
  letterSpacing: "1px",
};

/* 🛡 TRUST */
const trust = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "30px",
  padding: "40px 20px",
  textAlign: "center",
  background: "linear-gradient(to right, #f9f9f9, #ffffff)",
};

const trustItem = {
  maxWidth: "220px",
  padding: "10px",
};
