export default function Home({ setPage }) {
  return (
    <div style={container}>
      <h1 style={title}>JEWEL16</h1>

      <p style={tag}>
        Luxury Jewellery Collection for Modern Style
      </p>

      <button onClick={() => setPage("products")}>
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
};

const title = {
  fontSize: "50px",
  color: "maroon",
};

const tag = {
  margin: "10px 0",
};
