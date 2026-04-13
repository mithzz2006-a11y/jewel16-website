export default function Cart({ cart, setPage }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>

      {cart.map((item, i) => (
        <div key={i}>
          {item.name} - ₹{item.price}
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button onClick={() => setPage("checkout")}>
        Proceed to Checkout
      </button>
    </div>
  );
}
