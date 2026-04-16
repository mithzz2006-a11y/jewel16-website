import { useState } from "react";

export default function Cart({ cart, setPage }) {
  const [cartItems, setCartItems] = useState(
    cart.map((item) => ({ ...item, qty: 1 }))
  );

  /* ➕ INCREASE */
  const increase = (index) => {
    const updated = [...cartItems];
    updated[index].qty += 1;
    setCartItems(updated);
  };

  /* ➖ DECREASE */
  const decrease = (index) => {
    const updated = [...cartItems];
    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
      setCartItems(updated);
    }
  };

  /* ❌ REMOVE */
  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  /* 💰 TOTAL */
  const total = cartItems.reduce(
    (sum, i) => sum + i.price * i.qty,
    0
  );

  return (
    <div>

      {/* 🔥 HERO */}
      <div style={hero}>
        <h1 style={title}>Your Cart 🛒</h1>
        <p style={subtitle}>
          Review your selected luxury items before checkout
        </p>
      </div>

      {/* 🛍 ITEMS */}
      <div style={container}>
        {cartItems.length === 0 ? (
          <p style={{ textAlign: "center" }}>Your cart is empty</p>
        ) : (
          cartItems.map((item, i) => (
            <div key={i} style={itemBox}>
              <img src={item.image} style={img} />

              <div style={itemText}>
                <h3 style={name}>{item.name}</h3>
                <p style={price}>₹{item.price}</p>

                {/* 🔥 QUANTITY */}
                <div style={qtyBox}>
                  <button onClick={() => decrease(i)} style={qtyBtn}>-</button>
                  <span style={qty}>{item.qty}</span>
                  <button onClick={() => increase(i)} style={qtyBtn}>+</button>
                </div>

                {/* ❌ REMOVE */}
                <p style={remove} onClick={() => removeItem(i)}>
                  Remove
                </p>
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

      {/* 🛡 TRUST */}
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
  fontSize: "clamp(28px, 6vw, 50px)",
};

const subtitle = {
  marginTop: "10px",
  color: "#ddd",
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
};

const itemText = {
  flex: 1,
};

const name = {
  fontSize: "16px",
};

const price = {
  color: "gray",
};

/* 🔥 QTY */
const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginTop: "10px",
};

const qtyBtn = {
  padding: "5px 10px",
  border: "1px solid #ccc",
  background: "white",
  cursor: "pointer",
};

const qty = {
  fontWeight: "bold",
};

/* ❌ REMOVE */
const remove = {
  marginTop: "8px",
  color: "red",
  cursor: "pointer",
  fontSize: "13px",
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
