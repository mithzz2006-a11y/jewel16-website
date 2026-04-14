export default function Cart({ cart, setPage }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart 🛒</h1>

      {cart.length === 0 && <p>No items in cart</p>}

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

const itemBox = {
  display: "flex",
  gap: "15px",
  marginBottom: "15px",
  borderBottom: "1px solid #eee",
  paddingBottom: "10px",
};

const img = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
};

const btn = {
  padding: "12px 20px",
  background: "black",
  color: "white",
  border: "none",
};
