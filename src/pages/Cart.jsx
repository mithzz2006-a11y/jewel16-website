export default function Cart({
  cart,
  setCart,
  setPage,
  setCheckoutItem
}) {

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div style={container}>
        <h1>Your Cart</h1>
        <p>Cart is empty</p>
      </div>
    );
  }

  return (
    <div style={container}>
      <h1 style={{ color: "maroon" }}>Your Cart</h1>

      {cart.map((item, i) => (
        <div key={i} style={itemCard}>
          {item.name} - ₹{item.price}
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      {/* 🔥 GO TO CHECKOUT (IMPORTANT CHANGE) */}
      <button
        onClick={() => {
          setCheckoutItem({
            name: "Cart Order",
            price: total,
            qty: 1
          });

          setPage("checkout");   // 👉 THIS OPENS CHECKOUT
        }}
        style={btn}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

/* STYLES */

const container = {
  background: "#000",
  color: "white",
  padding: "40px",
  minHeight: "100vh"
};

const itemCard = {
  padding: "10px",
  borderBottom: "1px solid maroon"
};

const btn = {
  marginTop: "20px",
  padding: "12px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer"
};
