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

  const total = (cart || []).reduce(
    (sum, i) => sum + (i.price || 0) * (i.qty || 1),
    0
  );

  /* 🔥 ORDER FUNCTION */
  const placeOrder = async () => {
    try {
      for (let item of cart) {
        const ref = doc(db, "products", item.id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          alert("Product not found ❌");
          return;
        }

        const stock = snap.data()?.stock || 0;
        const qty = item.qty || 1;

        if (stock < qty) {
          alert(`Not enough stock for ${item.name}`);
          return;
        }

        await addDoc(collection(db, "orders"), {
          userId: user.uid,
          items: cart,
          total,
          deliveryType,
          instruction,
          address,
          pincode,
          status: "paid",
          createdAt: new Date().toISOString(),
        });

        const currentStock = snap.data()?.stock || 0;
        await updateDoc(ref, {
          stock: currentStock - qty,
        });
      }
    } catch (err) {
      console.error("Order error:", err);
    }
  };

  /* 💳 PAYMENT */
  const handlePayment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!address || !pincode) {
      alert("Enter address & pincode");
      return;
    }

    if (!window.Razorpay) {
      alert("Payment system not loaded ❌");
      return;
    }

    try {
      const res = await fetch("/create-order", { method: "POST" });
      const order = await res.json();

      const rzp = new window.Razorpay({
        key: "rzp_test_ShDgfm1sNzCDfQ", // replace with your real key
        amount: order.amount,
        currency: "INR",
        name: "JEWEL16 💎",
        description: "Luxury Jewellery",
        order_id: order.id,
        handler: async () => {
          await placeOrder();
        },
        theme: {
          color: "#800000",
        },
      });

      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>Secure Checkout 🔐</h1>
      <p style={subtitle}>Premium & safe purchase</p>

      {/* ADDRESS */}
      <div style={box}>
        <h3>Delivery Address</h3>
        <input
          style={input}
          placeholder="Enter your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          style={input}
          placeholder="Enter pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
      </div>

      {/* DELIVERY */}
      <div style={box}>
        <h3>Select Delivery</h3>
        <label style={option}>
          <input
            type="radio"
            checked={deliveryType === "standard"}
            onChange={() => setDeliveryType("standard")}
          />
          Standard (Free)
        </label>
        <label style={option}>
          <input
            type="radio"
            checked={deliveryType === "express"}
            onChange={() => setDeliveryType("express")}
          />
          Express (₹99)
        </label>
      </div>

      {/* INSTRUCTION */}
      <div style={box}>
        <h3>Delivery Instructions</h3>
        <textarea
          placeholder="Leave at door / Call before delivery"
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          style={textarea}
        />
      </div>

      {/* SUMMARY */}
      <div style={box}>
        <h3>Order Summary</h3>
        {(cart || []).map((item, i) => (
          <div key={i} style={summaryItem}>
            <p>{item.name}</p>
            <p>₹{item.price} × {item.qty || 1}</p>
          </div>
        ))}
        <h2>Total: ₹{total}</h2>
      </div>

      {/* BUTTON */}
      <button
        style={btn}
        onClick={handlePayment}
        disabled={loading || total === 0}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}

/* 🎨 PREMIUM RESPONSIVE STYLES */
const container = {
  maxWidth: "clamp(320px, 90%, 600px)",
  margin: "auto",
  padding: "clamp(15px, 3vw, 25px)",
  fontFamily: "Arial, sans-serif",
};

const title = {
  fontSize: "clamp(22px, 5vw, 28px)",
  fontWeight: "bold",
  color: "#800000",
};

const subtitle = {
  fontSize: "clamp(13px, 3vw, 16px)",
  color: "#555",
  marginBottom: "15px",
};

const box = {
  border: "1px solid #eee",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
  background: "#fff",
};

const option = {
  display: "block",
  marginTop: "10px",
  marginBottom: "10px",
};

const textarea = {
  width: "100%",
  minHeight: "80px",
  padding: "10px",
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
  background: "#800000",
  color: "white",
  padding: "15px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  width: "100%",
};
