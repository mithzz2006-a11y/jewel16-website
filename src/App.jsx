export default function Home() {
  return (
    <div style={{ background: "#0a0a0a", color: "white", fontFamily: "serif" }}>
      
      {/* NAVBAR */}
      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid #222" }}>
        <h2 style={{ color: "maroon" }}>JEWEL16</h2>
        <div>
          <span style={{ margin: "0 15px" }}>Home</span>
          <span style={{ margin: "0 15px" }}>Collections</span>
          <span style={{ margin: "0 15px" }}>Contact</span>
        </div>
      </div>

      {/* HERO */}
      <div style={{ height: "90vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h1 style={{ color: "maroon", fontSize: "70px" }}>
          JEWEL16 💎
        </h1>
        <p>Luxury Redefined</p>
      </div>

      {/* COLLECTION */}
      <div style={{ padding: "60px", textAlign: "center" }}>
        <h2>Our Collection</h2>

        <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
          <div style={{ background: "#111", padding: "30px" }}>Gold Necklace</div>
          <div style={{ background: "#111", padding: "30px" }}>Diamond Ring</div>
          <div style={{ background: "#111", padding: "30px" }}>Earrings</div>
        </div>
      </div>

    </div>
  );
}