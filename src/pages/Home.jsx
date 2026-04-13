export default function Home({ setPage }) {
  return (
    <div style={container}>
      <h1 style={title}>JEWEL16</h1>

      <p style={subtitle}>
        Crafted for Elegance. Designed for You.
      </p>

      <button onClick={() => setPage("products")}>
        Explore Collection
      </button>
    </div>
  );
}

const container = {
  height: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
};

const title = {
  fontSize: "50px",
  color: "maroon",
  letterSpacing: "2px"
};

const subtitle = {
  marginBottom: "20px",
  color: "#555"
};
