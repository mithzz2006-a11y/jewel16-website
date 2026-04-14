export default function Home({ setPage }) {
  return (
    <div>

      {/* HERO SECTION */}
      <div style={hero}>
        <h1 style={title}>JEWEL16 💎</h1>
        <p style={subtitle}>
          Crafted for Elegance. Designed for You.
        </p>

        <button style={btn} onClick={() => setPage("products")}>
          Explore Collection
        </button>
      </div>

      {/* TRUST SECTION */}
      <div style={trust}>
        <div style={card}>
          <h3>🔒 Secure Payment</h3>
          <p>100% safe and encrypted checkout</p>
        </div>

        <div style={card}>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick and reliable shipping</p>
        </div>

        <div style={card}>
          <h3>💎 Premium Quality</h3>
          <p>Luxury jewellery with perfection</p>
        </div>
      </div>

      {/* CTA SECTION */}
      <div style={cta}>
        <h2>Discover Your Style</h2>
        <p>Browse our exclusive collections</p>

        <button style={btn2} onClick={() => setPage("products")}>
          View Products
        </button>
      </div>

    </div>
  );
}

/* 🎨 STYLES */

const hero = {
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(to right, #000, #333)",
  color: "white",
  textAlign: "center",
};

const title = {
  fontSize: "50px",
  letterSpacing: "2px",
};

const subtitle = {
  marginTop: "10px",
  fontSize: "18px",
  color: "#ccc",
};

const btn = {
  marginTop: "20px",
  padding: "12px 30px",
  background: "white",
  color: "black",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
};

const trust = {
  display: "flex",
  justifyContent: "space-around",
  padding: "40px",
  background: "#f9f9f9",
};

const card = {
  textAlign: "center",
  maxWidth: "200px",
};

const cta = {
  textAlign: "center",
  padding: "50px",
};

const btn2 = {
  marginTop: "15px",
  padding: "12px 25px",
  background: "black",
  color: "white",
  border: "none",
};
