export default function Cart({ cart, setPage }) {

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={container}>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} style={itemBox}>
              <p>{item.name}</p>
              <p>₹{item.price}</p>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

          {/* TRUST INFO */}
          <div style={info}>
            <p>✔ Secure payment gateway</p>
            <p>✔ Delivery within 3–5 days</p>
            <p>✔ Easy return available</p>
          </div>

          <button onClick={() => setPage("checkout")}>
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

const container = {
  background: "black",
  color: "white",
  minHeight: "100vh",
  padding: "20px"
};

const itemBox = {
  borderBottom: "1px solid #444",
  padding: "10px 0"
};

const info = {
  margin: "20px 0",
  color: "#ccc"
};
