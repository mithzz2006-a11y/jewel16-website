export default function Checkout({ cart }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      {cart.map((item, i) => (
        <div key={i}>
          <p>{item.name} - ₹{item.price}</p>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button>Pay Now</button>
    </div>
  );
}
