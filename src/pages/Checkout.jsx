import { useState } from "react";

export default function Checkout({ cart, user }) {
  const [instruction, setInstruction] = useState("");
  const [deliveryType, setDeliveryType] = useState("standard");

  const total = cart.reduce((sum, i) => sum + i.price, 0);

  return (
    <div style={container}>

      <h1 style={title}>Secure Checkout 🔐</h1>
      <p style={subtitle}>Premium & safe purchase</p>

      {/* 📦 DELIVERY OPTIONS */}
      <div style={box}>
        <h3>Select Delivery</h3>

        <label style={option}>
          <input
            type="radio"
            checked={deliveryType === "standard"}
            onChange={() => setDeliveryType("standard")}
          />
          Standard Delivery (Free)
        </label>

        <label style={option}>
          <input
            type="radio"
            checked={deliveryType === "express"}
            onChange={() => setDeliveryType("express")}
          />
          Express Delivery (₹99)
        </label>
      </div>

      {/* 📝 INSTRUCTIONS */}
      <div style={box}>
        <h3>Delivery Instructions</h3>

        <textarea
          placeholder="e.g. Leave at door / Call before delivery"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          style={textarea}
        />
      </div>

      {/* 💰 TOTAL */}
      <div style={totalBox}>
        <h2>Total: ₹{total}</h2>
      </div>

      {/* 🔥 PAY BUTTON */}
      <button style={btn}>
        Pay Now
      </button>

    </div>
  );
}

/* 🎨 STYLES */

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
};

const title = {
  textAlign: "center",
};

const subtitle = {
  textAlign: "center",
  color: "#ccc",
  marginBottom: "20px",
};

const box = {
  background: "white",
  color: "black",
  padding: "15px",
  borderRadius: "10px",
  marginBottom: "15px",
};

const option = {
  display: "block",
  marginTop: "10px",
};

const textarea = {
  width: "100%",
  minHeight: "80px",
  marginTop: "10px",
};

const totalBox = {
  textAlign: "center",
  marginTop: "20px",
};

const btn = {
  width: "100%",
  padding: "15px",
  marginTop: "20px",
  background: "white",
  color: "black",
  border: "none",
};
