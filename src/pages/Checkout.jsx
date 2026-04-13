export default function Checkout({ cart, setPage }) {
  const total = cart.reduce((s, i) => s + i.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      <h2>Total: ₹{total}</h2>

      <button onClick={() => alert("Order placed (demo)")}>
        Place Order
      </button>
    </div>
  );
}
