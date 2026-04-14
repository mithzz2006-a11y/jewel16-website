export default function Checkout({ cart, user }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div style={container}>
      
      <h1 style={title}>Secure Checkout 🔐</h1>
      <p style={subtitle}>
        Complete your purchase safely and securely
      </p>

      <h3>Total Amount: ₹{total}</h3>

      <button style={btn}>
        Pay Now
      </button>

    </div>
  );
}

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
  textAlign: "center",
};

const title = {
  marginBottom: "10px",
};

const subtitle = {
  marginBottom: "20px",
  color: "#ccc",
};

const btn = {
  padding: "12px 30px",
  background: "white",
  color: "black",
  border: "none",
};
