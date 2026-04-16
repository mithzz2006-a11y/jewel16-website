export default function Home({ setPage }) {
  return (
    <div>

      {/* 🔥 HERO */}
      <div style={hero}>
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

/* 🎨 STYLES */

const hero = {
  minHeight: "90vh",
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
  fontSize: "clamp(32px, 6vw, 60px)",
  letterSpacing: "2px",
};

const subtitle = {
  marginTop: "10px",
  fontSize: "clamp(14px, 3vw, 18px)",
  color: "#ddd",
};

const btn = {
  marginTop: "25px",
  padding: "14px 28px",
  background: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontWeight: "600",
  transition: "0.3s",
};

const section = {
  padding: "40px 15px",
  background: "#fff",
};

const heading = {
  textAlign: "center",
  marginBottom: "25px",
  fontSize: "clamp(22px, 4vw, 30px)",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
  gap: "20px",
};

const card = {
  textAlign: "center",
  transition: "0.3s",
};

const img = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "12px",
};

const cardText = {
  marginTop: "10px",
  fontWeight: "600",
};

const trust = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "25px",
  padding: "30px 15px",
  textAlign: "center",
  background: "#f9f9f9",
};

const trustItem = {
  maxWidth: "220px",
};
