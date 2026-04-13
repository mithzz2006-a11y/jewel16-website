export default function Cart({ cart, setPage }) {

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Cart</h1>

      {cart.map((item, i) => (
        <div key={i}>
          {item.name} - ₹{item.price}
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button onClick={() => setPage("checkout")}>
        Checkout
      </button>
    </div>
  );
}
