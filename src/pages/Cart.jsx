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
          <p style={{ textAlign: "center" }}>Your cart is empty</p>
        ) : (
          cart.map((item, i) => (
            <div key={i} style={itemBox}>
              <img src={item.image} style={img} />

              <div style={itemText}>
                <h3 style={name}>{item.name}</h3>
                <p style={price}>₹{item.price}</p>
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
        <div style={trustItem}>
          <h3>🔒 Secure Payments</h3>
          <p>100% encrypted transactions</p>
        </div>

        <div style={trustItem}>
          <h3>🚚 Fast Delivery</h3>
          <p>Quick & reliable shipping</p>
        </div>

        <div style={trustItem}>
          <h3>💎 Premium Quality</h3>
          <p>Crafted with perfection</p>
        </div>
      </div>

    </div>
  );
}

/* 🎨 STYLES (RESPONSIVE SAFE) */

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
  fontSize: "clamp(28px, 6vw, 50px)",
};

const subtitle = {
  marginTop: "10px",
  color: "#ddd",
  fontSize: "clamp(14px, 3vw, 18px)",
};

const container = {
  padding: "15px",
  background: "#fff",
};

const itemBox = {
  display: "flex",
  gap: "12px",
  marginBottom: "15px",
  alignItems: "center",
  flexWrap: "wrap",
  borderBottom: "1px solid #eee",
  paddingBottom: "10px",
};

const img = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
  flexShrink: 0,
};

const itemText = {
  flex: 1,
  minWidth: "120px",
};

const name = {
  fontSize: "clamp(14px, 3vw, 18px)",
};

const price = {
  color: "gray",
  fontSize: "14px",
};

const totalBox = {
  marginTop: "20px",
  textAlign: "center",
};

const btn = {
  marginTop: "15px",
  padding: "12px 20px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "6px",
  fontSize: "14px",
};

const trust = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  flexWrap: "wrap",
  padding: "25px 15px",
  background: "#f9f9f9",
  textAlign: "center",
};

const trustItem = {
  maxWidth: "200px",
};
