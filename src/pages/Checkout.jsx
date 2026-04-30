import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export default function Checkout({ cart, user }) {
  const [instruction, setInstruction] = useState("");
  const [deliveryType, setDeliveryType] = useState("standard");
  const [loading, setLoading] = useState(false);

  /* 🔥 NEW */
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const total = cart.reduce(
    (sum, i) => sum + i.price * (i.qty || 1),
  const total = (cart || []).reduce(
    (sum, i) => sum + (i.price || 0) * (i.qty || 1),
    0
  );

  /* 🔥 ORDER FUNCTION */
  const placeOrder = async () => {
    try {
      for (let item of cart) {
@@ -34,7 +31,7 @@
          return;
        }

        const stock = snap.data().stock || 0;
        const stock = snap.data()?.stock || 0;
        const qty = item.qty || 1;

        if (stock < qty) {
@@ -50,8 +47,8 @@
        total,
        deliveryType,
        instruction,
        address,   // ✅ NEW
        pincode,   // ✅ NEW
        address,
        pincode,
        status: "paid",
        createdAt: new Date().toISOString(),
      });
@@ -60,7 +57,7 @@
        const ref = doc(db, "products", item.id);
        const snap = await getDoc(ref);

        const currentStock = snap.data().stock || 0;
        const currentStock = snap.data()?.stock || 0;
        const qty = item.qty || 1;

        await updateDoc(ref, {
@@ -77,16 +74,19 @@
    }
  };

  /* 💳 PAYMENT */
  const handlePayment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    /* 🔥 VALIDATION */
    if (!address || !pincode) {
      alert("Please enter address and pincode");
      alert("Enter address & pincode");
      return;
    }

    if (!window.Razorpay) {
      alert("Payment system not loaded ❌");
      return;
    }

@@ -103,15 +103,15 @@

      const order = await res.json();

      const options = {
        key: "rzp_test_ShDgfm1sNzCDfQ", // replace with your real key
      const rzp = new window.Razorpay({
        key: "rzp_test_ShDgfm1sNzCDfQ",
        amount: order.amount,
        currency: "INR",
        name: "JEWEL16 💎",
        description: "Luxury Jewellery Purchase",
        description: "Luxury Jewellery",
        order_id: order.id,

        handler: async function () {
        handler: async () => {
          await placeOrder();
        },

@@ -122,9 +122,8 @@
        theme: {
          color: "#800000",
        },
      };
      });

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
@@ -141,7 +140,7 @@
      <h1 style={title}>Secure Checkout 🔐</h1>
      <p style={subtitle}>Premium & safe purchase</p>

      {/* 📍 ADDRESS */}
      {/* ADDRESS */}
      <div style={box}>
        <h3>Delivery Address</h3>

@@ -161,7 +160,7 @@
        />
      </div>

      {/* 📦 DELIVERY */}
      {/* DELIVERY */}
      <div style={box}>
        <h3>Select Delivery</h3>

@@ -171,7 +170,7 @@
            checked={deliveryType === "standard"}
            onChange={() => setDeliveryType("standard")}
          />
          Standard Delivery (Free)
          Standard (Free)
        </label>

        <label style={option}>
@@ -180,27 +179,15 @@
            checked={deliveryType === "express"}
            onChange={() => setDeliveryType("express")}
          />
          Express Delivery (₹99)
          Express (₹99)
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
      {/* SUMMARY */}
      <div style={box}>
        <h3>Order Summary</h3>

        {cart.map((item, i) => (
        {(cart || []).map((item, i) => (
          <div key={i} style={summaryItem}>
            <p>{item.name}</p>
            <p>₹{item.price} × {item.qty || 1}</p>
@@ -211,7 +198,6 @@
        <h2>Total: ₹{total}</h2>
      </div>

      {/* 🔥 BUTTON */}
      <button style={btn} onClick={handlePayment} disabled={loading || total === 0}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
@@ -220,67 +206,63 @@
  );
}

/* 🎨 STYLES */
/* 🎨 PREMIUM RESPONSIVE STYLES */

const container = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  maxWidth: "clamp(320px, 90%, 600px)",
  margin: "auto",
  padding: "clamp(15px, 3vw, 25px)",
};

const title = {
  fontSize: "28px",
  fontWeight: "bold",
  fontSize: "clamp(22px, 5vw, 28px)",
  color: "#800000",
};

const subtitle = {
  fontSize: "16px",
  fontSize: "clamp(13px, 3vw, 16px)",
  color: "#555",
  marginBottom: "20px",
  marginBottom: "15px",
};

const box = {
  border: "1px solid #ddd",
  border: "1px solid #eee",
  padding: "15px",
  marginBottom: "20px",
  borderRadius: "8px",
  marginBottom: "15px",
  borderRadius: "10px",
  background: "#fff",
};

const option = {
  display: "block",
  marginBottom: "10px",
  marginTop: "10px",
};

const textarea = {
  width: "100%",
  minHeight: "80px",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
};

const summaryItem = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
};

const btn = {
  backgroundColor: "#800000",
  color: "#fff",
  padding: "12px 20px",
  width: "100%",
  padding: "15px",
  background: "#800000",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  borderRadius: "8px",
  fontSize: "16px",
  width: "100%",
};
