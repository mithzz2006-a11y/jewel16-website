export default function Home({ setPage }) {
  return (
    <div style={container}>
      <h1 style={logo}>JEWEL16</h1>
      <p style={tagline}>Luxury Redefined</p>

      <button onClick={() => setPage("products")} style={btn}>
        Explore Collection
      </button>
    </div>
  );
}

const container = {
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

const logo = {
  fontSize: "60px",
  color: "maroon",
  letterSpacing: "4px"
};

const tagline = {
  color: "black",
  marginTop: "10px"
};

const btn = {
  marginTop: "20px",
  padding: "12px 24px",
  border: "2px solid black",
  background: "#fff",
  color: "maroon",
  cursor: "pointer",
  fontWeight: "bold"
};
