export default function Cart({ cart, setPage }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>

      {cart.map((item, i) => (
        <div key={i} style={itemBox}>
          <img src={item.image} style={img} />
          <div>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button onClick={() => setPage("checkout")}>
        Checkout
      </button>
    </div>
  );
}

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
