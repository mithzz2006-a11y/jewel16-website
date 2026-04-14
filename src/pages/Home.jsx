export default function Home({ setPage }) {
  return (
    <div style={{ fontFamily: "sans-serif" }}>

      {/* 🔥 HERO SECTION */}
      <div style={hero}>
        <h1 style={title}>JEWEL16 💎</h1>

        <p style={subtitle}>
          Where Luxury Meets Elegance
        </p>

        <button style={btn} onClick={() => setPage("products")}>
          Explore Collection
        </button>
      </div>

      {/* 💎 CATEGORY SHOWCASE */}
      <div style={section}>
        <h2 style={heading}>Our Collections</h2>

        <div style={grid}>
          <div style={card}>
            <img src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0" style={img}/>
            <p>Gold Jewellery</p>
          </div>

          <div style={card}>
            <img src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f" style={img}/>
            <p>Diamond Collection</p>
          </div>

          <div style={card}>
            <img src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1" style={img}/>
            <p>Bracelets</p>
          </div>
        </div>
      </div>

      {/* 🛡 TRUST SECTION */}
      <div style={trust}>
        <div>
          <h3>🔒 Secure Payment</h3>
          <p>End-to-end encrypted transactions</p>
        </div>

        <div>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick & reliable shipping</p>
        </div>

        <div>
          <h3>💎 Premium Quality</h3>
          <p>Crafted with perfection</p>
        </div>
      </div>

      {/* ✨ ABOUT */}
      <div style={about}>
        <h2>About JEWEL16</h2>
        <p>
          JEWEL16 is a premium jewellery brand delivering elegance,
          quality, and trust. Designed for modern luxury lovers,
          our collections redefine timeless beauty.
        </p>
      </div>

      {/* 🚀 CTA */}
      <div style={cta}>
        <h2>Start Your Luxury Journey</h2>
        <button style={btnDark} onClick={() => setPage("products")}>
          Shop Now
        </button>
      </div>

    </div>
  );
}

/* 🎨 STYLES */

const hero = {
  height: "90vh",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
};

const title = {
  fontSize: "clamp(40px, 6vw, 70px)",
};

const subtitle = {
  marginTop: "10px",
  fontSize: "clamp(16px, 2vw, 22px)",
  color: "#ddd",
};

const btn = {
  marginTop: "25px",
  padding: "14px 30px",
  background: "white",
  color: "black",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
};

const section = {
  padding: "50px 20px",
  background: "white",
};

const heading = {
  textAlign: "center",
  marginBottom: "30px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))",
  gap: "20px",
};

const card = {
  textAlign: "center",
};

const img = {
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "10px",
};

const trust = {
  display: "flex",
  justifyContent: "space-around",
  padding: "40px",
  background: "#f9f9f9",
  flexWrap: "wrap",
  gap: "20px",
  textAlign: "center",
};

const about = {
  padding: "50px 20px",
  textAlign: "center",
};

const cta = {
  padding: "60px",
  background: "#111",
  color: "white",
  textAlign: "center",
};

const btnDark = {
  marginTop: "20px",
  padding: "12px 25px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer",
};
