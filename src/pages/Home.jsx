export default function Home({ setPage }) {
  return (
    <div>

      {/* 🔥 HERO */}
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

/* 🎨 RESPONSIVE STYLES */

/* 🔥 HERO */
const hero = {
  minHeight: "clamp(28vh, 35vh, 40vh)", // 🔥 responsive height
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

const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
  top: 0,
  left: 0,
};

const title = {
  fontSize: "clamp(22px, 5vw, 40px)", // 🔥 mobile fix
  letterSpacing: "1.5px",
  fontWeight: "700",
  textShadow: "0 0 10px rgba(255,255,255,0.2)",
  zIndex: 1,
};

const subtitle = {
  marginTop: "8px",
  fontSize: "clamp(12px, 3vw, 15px)",
  color: "#ddd",
  padding: "0 10px",
  zIndex: 1,
};

const btn = {
  marginTop: "15px",
  padding: "12px 18px", // 🔥 touch friendly
  background: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontWeight: "500",
  fontSize: "14px",
  boxShadow: "0 4px 12px rgba(255,255,255,0.15)",
  zIndex: 1,
};

/* 💎 SECTION */
const section = {
  padding: "clamp(30px, 5vw, 50px) 15px",
  background: "#fff",
};

const heading = {
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "clamp(20px, 4vw, 30px)",
};

/* 🔥 GRID FIX */
const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", // 🔥 FIXED
  gap: "clamp(12px, 3vw, 20px)",
};

/* 💎 CARD */
const card = {
  textAlign: "center",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 15px rgba(0,0,0,0.06)",
};

/* ✨ IMAGE FIX */
const img = {
  width: "100%",
  height: "clamp(140px, 25vw, 200px)", // 🔥 responsive image
  objectFit: "cover",
};

/* 🔥 TEXT */
const cardText = {
  marginTop: "10px",
  fontWeight: "600",
  fontSize: "clamp(13px, 3vw, 16px)",
};

/* 🛡 TRUST */
const trust = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px", // 🔥 fixed
  padding: "25px 15px",
  textAlign: "center",
  background: "linear-gradient(to right, #f9f9f9, #ffffff)",
};

const trustItem = {
  maxWidth: "200px",
};
