export default function Home({ setPage }) {
  return (
    <div style={container}>
      
      {/* BRAND NAME */}
      <h1 style={title}>JEWEL16 💎</h1>

      {/* TAGLINE */}
      <p style={subtitle}>
        Crafted for Elegance. Designed for You.
      </p>

      {/* BUTTON */}
      <button style={btn} onClick={() => setPage("products")}>
        Explore Collection
      </button>

    </div>
  );
}

/* 💎 STYLES */

const container = {
  height: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  background: "white"
};

const title = {
  fontSize: "56px",
  color: "maroon",
  letterSpacing: "3px",
  marginBottom: "10px",
  fontWeight: "bold"
};

const subtitle = {
  color: "#555",
  marginBottom: "25px",
  fontSize: "18px"
};

const btn = {
  padding: "12px 25px",
  border: "1px solid black",
  background: "white",
  color: "maroon",
  cursor: "pointer",
  transition: "0.3s",
  fontWeight: "bold"
};
