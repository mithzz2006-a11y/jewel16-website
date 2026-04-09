export default function Home({ setPage }) {
  return (
    <div style={{
      background: "#0a0a0a",
      color: "white",
      textAlign: "center",
      padding: "100px"
    }}>
      <h1 style={{ color: "maroon" }}>JEWEL16 💎</h1>
      <p>Luxury Redefined</p>

      <button
        onClick={() => setPage("products")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "maroon",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Shop Now
      </button>
    </div>
  );
}
