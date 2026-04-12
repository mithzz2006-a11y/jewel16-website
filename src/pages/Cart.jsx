export default function Cart({ cart, setPage }) {

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: "20px"
    }}>
      <h1>Your Cart</h1>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item, i) => (
        <div key={i}>
          <p>{item.name}</p>
          <p>₹{item.price}</p>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button
        onClick={() => setPage("checkout")}
        style={{
          marginTop: "20px",
          padding: "12px",
          width: "100%",
          background: "maroon",
          color: "white",
          border: "none"
        }}
      >
        Checkout
      </button>
    </div>
  );
}
