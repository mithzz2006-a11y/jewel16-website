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
  gap: "10px",
  marginBottom: "15px",
  flexWrap: "wrap",
};

const img = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
};
