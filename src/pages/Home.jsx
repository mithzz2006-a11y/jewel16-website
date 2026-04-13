export default function Home({ setPage }) {
  return (
    <div style={container}>

      <h1 style={title}>JEWEL16</h1>

      <p style={tag}>
        Timeless Jewellery. Trusted Craftsmanship.
      </p>

      <button style={btn} onClick={() => setPage("products")}>
        Explore Collection
      </button>

      {/* TRUST SECTION */}
      <div style={trustBox}>
        <div style={trustItem}>
          💳 Secure Payments
          <p>100% safe & encrypted checkout</p>
        </div>

        <div style={trustItem}>
          🚚 Fast Delivery
          <p>Quick shipping across India</p>
        </div>

        <div style={trustItem}>
          🔄 Easy Returns
          <p>Hassle-free return policy</p>
        </div>
      </div>

    </div>
  );
}

const container = {
  textAlign: "center",
  padding: "40px"
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

const trustBox = {
  marginTop: "50px",
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  flexWrap: "wrap"
};

const trustItem = {
  border: "1px solid #eee",
  padding: "20px",
  width: "200px"
};
