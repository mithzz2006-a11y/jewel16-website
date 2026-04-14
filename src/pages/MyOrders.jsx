export default function MyOrders({ orders }) {
  return (
    <div style={container}>
      
      <h1 style={title}>My Orders 📦</h1>
      <p style={subtitle}>
        Track your purchased luxury items
      </p>

      {orders?.map((o, i) => (
        <div key={i} style={card}>
          <p>Total: ₹{o.total}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}

    </div>
  );
}

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "#111",
  color: "white",
};

const title = {
  color: "maroon",
};

const subtitle = {
  color: "#ccc",
  marginBottom: "20px",
};

const card = {
  border: "1px solid maroon",
  padding: "15px",
  marginBottom: "10px",
};
