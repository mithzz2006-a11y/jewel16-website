import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";

export default function Checkout({ cart, user }) {
  const total = cart.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);

  const [address, setAddress] = useState("");
  const [instruction, setInstruction] = useState("");
  const [delivery, setDelivery] = useState("standard");

  // 🔥 LOAD USER DATA
  useEffect(() => {
    const loadUser = async () => {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setAddress(snap.data().address || "");
        setInstruction(snap.data().instruction || "");
      }
    };

    loadUser();
  }, [user]);

  // 🔥 PLACE ORDER
  const handleOrder = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,
        items: cart,
        total,
        address,
        instruction,
        deliveryType: delivery,
        date: new Date().toISOString()
      });

      await setDoc(
        doc(db, "users", user.uid),
        { address, instruction },
        { merge: true }
      );

      alert("Order placed successfully 🎉");
    } catch (err) {
      console.log(err);
      alert("Error placing order ❌");
    }
  };

  return (
    <div style={container}>
      
      <h1 style={title}>Secure Checkout 🔐</h1>
      <p style={subtitle}>
        Choose delivery & confirm your order
      </p>

      {/* 💎 TOTAL */}
      <div style={card}>
        <h3>Total Amount: ₹{total}</h3>
      </div>

      {/* 📍 ADDRESS */}
      <div style={card}>
        <h3>Delivery Address</h3>
        <textarea
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={input}
        />
      </div>

      {/* 🚚 DELIVERY OPTIONS */}
      <div style={card}>
        <h3>Select Delivery Option</h3>

        <div style={optionBox}>
          <div
            style={delivery === "standard" ? active : option}
            onClick={() => setDelivery("standard")}
          >
            🚚 Standard Delivery (3–5 days) - FREE
          </div>

          <div
            style={delivery === "express" ? active : option}
            onClick={() => setDelivery("express")}
          >
            ⚡ Express Delivery (1–2 days) - ₹99
          </div>
        </div>
      </div>

      {/* 📝 INSTRUCTION */}
      <div style={card}>
        <h3>Delivery Instructions</h3>
        <textarea
          placeholder="Leave at door / call before delivery"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          style={input}
        />
      </div>

      {/* 💳 BUTTON */}
      <button style={btn} onClick={handleOrder}>
        Confirm Order
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
  textAlign: "center"
};

const title = { marginBottom: "10px" };

const subtitle = {
  marginBottom: "20px",
  color: "#ccc"
};

const card = {
  background: "white",
  color: "black",
  padding: "15px",
  borderRadius: "12px",
  margin: "15px auto",
  maxWidth: "420px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const optionBox = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  marginTop: "10px"
};

const option = {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  cursor: "pointer"
};

const active = {
  ...option,
  border: "2px solid maroon",
  background: "#ffe5e5"
};

const btn = {
  padding: "14px 30px",
  background: "white",
  color: "black",
  border: "none",
  marginTop: "20px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "8px"
};
