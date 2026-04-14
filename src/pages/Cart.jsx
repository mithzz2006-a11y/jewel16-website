export default function Cart({ cart, setPage }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div>

      {/* 🔥 HERO SECTION */}
      <div style={hero}>
        <h1 style={title}>Your Cart 🛒</h1>

        <p style={subtitle}>
          Review your selected luxury items before checkout
        </p>
      </div>

      {/* 🛍 CART ITEMS */}
      <div style={container}>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map((item, i) => (
            <div key={i} style={itemBox}>
              <img src={item.image} style={img} />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
              </div>
            </div>
          ))
        )}

        {/* 💰 TOTAL */}
        <div style={totalBox}>
          <h2>Total: ₹{total}</h2>

          <button style={btn} onClick={() => setPage("checkout")}>
            Proceed to Secure Checkout
          </button>
        </div>
      </div>

      {/* 🛡 TRUST SECTION */}
      <div style={trust}>
        <div>
          <h3>🔒 Secure Payments</h3>
          <p>100% encrypted transactions</p>
        </div>

        <div>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick & reliable shipping</p>
        </div>

        <div>
          <h3>💎 Premium Quality</h3>
          <p>Crafted with perfection</p>
        </div>
      </div>

    </div>
  );
}

/* 🎨 STYLES */

const hero = {
  minHeight: "50vh",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "20px",
};

const title = {
  fontSize: "clamp(30px, 5vw, 50px)",
};

const subtitle = {
  marginTop: "10px",
  color: "#ddd",
};

const container = {
  padding: "20px",
  background: "#fff",
};

const itemBox = {
  display: "flex",
  gap: "15px",
  marginBottom: "15px",
  alignItems: "center",
  flexWrap: "wrap",
  borderBottom: "1px solid #eee",
  paddingBottom: "10px",
};

const img = {
  width: "90px",
  height: "90px",
  objectFit: "cover",
  borderRadius: "8px",
};

const totalBox = {
  marginTop: "20px",
  textAlign: "center",
};

const btn = {
  marginTop: "15px",
  padding: "12px 25px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const trust = {
  display: "flex",
  justifyContent: "center",
  gap: "30px",
  flexWrap: "wrap",
  padding: "30px",
  background: "#f9f9f9",
  textAlign: "center",
};
