export default function Cart({ cart, setPage }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div style={container}>
      
      <h1 style={title}>Your Cart 🛒</h1>
      <p style={subtitle}>Review your selected luxury items</p>

      {cart.map((item, i) => (
        <div key={i} style={itemBox}>
          <img src={item.image} style={img} />
          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button style={btn} onClick={() => setPage("checkout")}>
        Proceed to Checkout
      </button>

    </div>
  );
}

const container = {
  padding: "20px",
  background: "#111",
  color: "white",
  minHeight: "100vh",
};

const title = {
  color: "maroon",
};

const subtitle = {
  color: "#ccc",
  marginBottom: "20px",
};

const itemBox = {
  display: "flex",
  flexWrap: "wrap",
  gap: "10px",
  marginBottom: "15px",
};

const img = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
};

const btn = {
  marginTop: "15px",
  padding: "12px",
  background: "maroon",
  color: "white",
  border: "none",
};
