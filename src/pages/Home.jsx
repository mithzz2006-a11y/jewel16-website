export default function Home({ setPage }) {
  return (
    <div style={{ background: "#0a0a0a", color: "white", textAlign: "center", padding: "100px" }}>
      <h1 style={{ color: "maroon" }}>JEWEL16 💎</h1>
      <p>Luxury Redefined</p>

      <button onClick={() => setPage("products")}>
        Shop Now
      </button>
    </div>
  );
}
