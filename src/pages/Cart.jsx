export default function Cart({ cart, setPage }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div>

      {/* 🔥 HERO */}
      <div style={hero}>
        <h1 style={title}>Your Cart 🛒</h1>
        <p style={subtitle}>Review your luxury items</p>
      </div>

      {/* 🛍 ITEMS */}
      <div style={container}>
        {cart.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your cart is empty</p>
        ) : (
          cart.map((item, i) => (
            <div key={i} style={itemBox}>
              <img src={item.image} style={img} />

              <div style={itemText}>
                <h3>{item.name}</h3>
                <p style={price}>₹{item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔥 STICKY CHECKOUT (AMAZON STYLE) */}
      <div style={stickyBar}>
        <div>
          <p style={{ margin: 0 }}>Total</p>
          <h3 style={{ margin: 0 }}>₹{total}</h3>
        </div>

        <button style={checkoutBtn} onClick={() => setPage("checkout")}>
          Checkout
        </button>
      </div>

    </div>
  );
}

/* 🎨 STYLES */

const hero = {
  minHeight: "40vh",
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
  fontSize: "clamp(28px, 6vw, 45px)",
};

const subtitle = {
  color: "#ddd",
};

const container = {
  padding: "15px",
  background: "#fff",
  paddingBottom: "100px", // 🔥 space for sticky bar
};

const itemBox = {
  display: "flex",
  gap: "12px",
  marginBottom: "15px",
  alignItems: "center",
  borderBottom: "1px solid #eee",
  paddingBottom: "10px",
};

const img = {
  width: "80px",
  height: "80px",
  objectFit: "cover",
  borderRadius: "8px",
};

const itemText = {
  flex: 1,
};

const price = {
  color: "gray",
};

/* 🔥 STICKY BAR */
const stickyBar = {
  position: "fixed",
  bottom: 0,
  left: 0,
  width: "100%",
  background: "white",
  borderTop: "1px solid #ddd",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 15px",
  zIndex: 1000,
};

const checkoutBtn = {
  padding: "12px 20px",
  background: "maroon",
  color: "white",
  border: "none",
  borderRadius: "6px",
};
