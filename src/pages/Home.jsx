export default function Home({ setPage }) {
  return (
    <div style={container}>
      <h1 style={title}>JEWEL16</h1>

      <p style={tagline}>
        Luxury Jewellery Collection for Modern Style
      </p>

      <button style={button} onClick={() => setPage("products")}>
        Shop Now
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
  textAlign: "center",
};

const title = {
  fontSize: "50px",
  color: "maroon",
  fontWeight: "bold",
};

const tagline = {
  margin: "10px 0 20px",
  fontSize: "18px",
  color: "#333",
};

const button = {
  padding: "10px 20px",
  border: "1px solid maroon",
  background: "white",
  color: "maroon",
  cursor: "pointer",
  borderRadius: "4px",
  transition: "0.3s",
};

button[":hover"] = {
  background: "maroon",
  color: "white",
};
