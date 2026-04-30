export default function Success({ setPage }) {
  return (
    <div style={container}>
      <h1>🎉 Payment Successful</h1>
      <p>Your order has been placed successfully.</p>

      <button style={btn} onClick={() => setPage("orders")}>
        View Orders
      </button>

      <button style={btn2} onClick={() => setPage("home")}>
        Continue Shopping
      </button>
    </div>
  );
}

const container = {
  minHeight: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"
};

const btn = {
  marginTop: "20px",
  padding: "12px 20px",
  background: "maroon",
  color: "white",
  border: "none"
};

const btn2 = {
  marginTop: "10px",
  padding: "10px 20px",
  background: "#eee",
  border: "none"
};
