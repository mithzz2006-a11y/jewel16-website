export default function Cart({ cart, setPage }) {
  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart</h1>

      {cart.map((i, idx) => (
        <p key={idx}>{i.name} - ₹{i.price}</p>
      ))}

      <h2>Total: ₹{total}</h2>

      <button onClick={() => setPage("checkout")}>
        Checkout
      </button>
    </div>
  );
}
