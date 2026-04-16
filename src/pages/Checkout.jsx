import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout({ cart, user }) {
  const [instruction, setInstruction] = useState("");
  const [deliveryType, setDeliveryType] = useState("standard");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, i) => sum + i.price * (i.qty || 1),
    0
  );

  const placeOrder = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,

        items: cart,
        total,

        deliveryType,
        instruction,

        status: "placed",
        createdAt: new Date().toISOString(),
      });

      alert("Order placed successfully 🎉");

      window.location.reload(); // simple reset

    } catch (err) {
      console.log(err);
      alert("Order failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>

      <h1 style={title}>Secure Checkout 🔐</h1>
      <p style={subtitle}>Premium & safe purchase</p>

      {/* 📦 DELIVERY */}
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

      {/* 📝 INSTRUCTION */}
      <div style={box}>
        <h3>Delivery Instructions</h3>

        <textarea
          placeholder="Leave at door / Call before delivery"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          style={textarea}
        />
      </div>

      {/* 🛍 ORDER SUMMARY */}
      <div style={box}>
        <h3>Order Summary</h3>

        {cart.map((item, i) => (
          <div key={i} style={summaryItem}>
            <p>{item.name}</p>
            <p>
              ₹{item.price} × {item.qty || 1}
            </p>
          </div>
        ))}

        <hr />

        <h2>Total: ₹{total}</h2>
      </div>

      {/* 🔥 PLACE ORDER */}
      <button style={btn} onClick={placeOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Place Order"}
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

const summaryItem = {
  display: "flex",
  justifyContent: "space-between",
};

const btn = {
  width: "100%",
  padding: "15px",
  marginTop: "20px",
  background: "white",
  color: "black",
  border: "none",
  cursor: "pointer",
};
