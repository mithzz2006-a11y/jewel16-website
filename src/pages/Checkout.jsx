import { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, getDoc, setDoc, collection, addDoc } from "firebase/firestore";

export default function Checkout({ cart, user }) {
  const total = cart.reduce((sum, i) => sum + i.price, 0);

  const [instruction, setInstruction] = useState("");
  const [address, setAddress] = useState("");

  // 🔥 LOAD USER PROFILE (AUTO FILL LIKE AMAZON)
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
      // ✅ Save order
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,
        items: cart,
        total,
        address,
        instruction,
        date: new Date().toISOString()
      });

      // ✅ Save instruction to profile (auto reuse)
      await setDoc(
        doc(db, "users", user.uid),
        {
          address,
          instruction
        },
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
        Complete your purchase safely and securely
      </p>

      {/* 💎 ORDER SUMMARY */}
      <div style={card}>
        <h3>Total Amount: ₹{total}</h3>
      </div>

      {/* 📍 ADDRESS */}
      <div style={card}>
        <h3>Delivery Address</h3>

        <textarea
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={input}
        />
      </div>

      {/* 🚚 DELIVERY INSTRUCTION (PREMIUM UI) */}
      <div style={card}>
        <h3>🚚 Delivery Instructions</h3>

        <textarea
          placeholder="Leave at door / Call before delivery / Any special notes"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          style={input}
        />
      </div>

      {/* 💳 BUTTON */}
      <button style={btn} onClick={handleOrder}>
        Place Order
      </button>

    </div>
  );
}

/* 🎨 STYLES (PREMIUM) */

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "linear-gradient(to right, #000, #400000)",
  color: "white",
  textAlign: "center",
};

const title = {
  marginBottom: "10px",
};

const subtitle = {
  marginBottom: "20px",
  color: "#ccc",
};

const card = {
  background: "white",
  color: "black",
  padding: "15px",
  borderRadius: "12px",
  margin: "15px auto",
  maxWidth: "400px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.2)"
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc"
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
