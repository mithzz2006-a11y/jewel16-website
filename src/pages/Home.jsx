export default function Home({ setPage }) {
  return (
    <div className="container" style={{ textAlign: "center" }}>
      
      <h1>JEWEL16</h1>
      <p>Luxury Redefined</p>

      <button onClick={() => setPage("products")}>
        Explore Collection
      </button>

    </div>
  );
}
