export default function Home({ setPage }) {
  return (
    <div>

      <div style={hero}>
        <h1 style={title}>JEWEL16 💎</h1>
        <p style={subtitle}>Where Luxury Meets Elegance</p>

        <button style={btn} onClick={() => setPage("products")}>
          Explore Collection
        </button>
      </div>

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

      <div style={trust}>
        <div>
          <h3>🔒 Secure Payment</h3>
          <p>Safe & encrypted</p>
        </div>

        <div>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick shipping</p>
        </div>

        <div>
          <h3>💎 Premium Quality</h3>
          <p>Luxury products</p>
        </div>
      </div>

    </div>
  );
}

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
  fontSize: "clamp(30px, 6vw, 60px)",
};

const subtitle = {
  marginTop: "10px",
};

const btn = {
  marginTop: "20px",
  padding: "12px 25px",
  background: "white",
  border: "none",
};

const section = {
  padding: "30px 15px",
};

const heading = {
  textAlign: "center",
  marginBottom: "20px",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
  gap: "15px",
};

const card = {
  textAlign: "center",
};

const img = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  borderRadius: "10px",
};

const trust = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "20px",
  padding: "20px",
  textAlign: "center",
};
