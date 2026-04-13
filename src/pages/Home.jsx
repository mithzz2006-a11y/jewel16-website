export default function Home({ setPage }) {
  return (
    <div style={home}>
      <h1 style={title}>Luxury Jewellery Collection 💎</h1>
      <p style={sub}>
        Trusted Delivery | Secure Payments | Premium Quality
      </p>

      <button style={btn} onClick={() => setPage("products")}>
        Shop Now
      </button>
    </div>
  );
}

const home = {
  textAlign: "center",
  padding: "100px 20px",
};

const title = {
  fontSize: "40px",
  color: "maroon",
};

const sub = {
  margin: "20px 0",
  fontSize: "18px",
};

const btn = {
  padding: "12px 30px",
  background: "black",
  color: "white",
  border: "none",
};
