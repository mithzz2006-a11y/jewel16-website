export default function Home({ setPage }) {
  return (
    <div style={hero}>
      <h1 style={title}>JEWEL16</h1>

      <p style={tag}>
        Premium Jewellery Collection for Modern Elegance
      </p>

      <button style={btn} onClick={() => setPage("products")}>
        Shop Now
      </button>
    </div>
  );
}

const hero = {
  height: "90vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
};

const title = {
  fontSize: "60px",
  color: "maroon",
  letterSpacing: "4px"
};

const tag = {
  margin: "15px 0",
  color: "#555"
};

const btn = {
  padding: "12px 25px",
  border: "1px solid black",
  background: "white",
  color: "maroon",
  cursor: "pointer"
};
