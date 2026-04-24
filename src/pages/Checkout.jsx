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

  const total = (cart || []).reduce(
    (sum, i) => sum + (i.price || 0) * (i.qty || 1),
    0
  );

  /* 🔥 ORDER FUNCTION */
  const placeOrder = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      /* 🔥 STOCK CHECK */
      for (let item of cart) {
        const ref = doc(db, "products", item.id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          alert(`${item.name} not available`);
          return;
        }

        const stock = snap.data()?.stock || 0;
        const qty = item.qty || 1;

        if (stock < qty) {
          alert(`${item.name} is out of stock ❌`);
          return;
        }
      }

      /* ✅ SAVE ORDER */
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,
        items: cart,
        total,
        deliveryType,
        instruction,
        status: "paid",
        createdAt: new Date().toISOString(),
      });

      /* 🔥 REDUCE STOCK */
      for (let item of cart) {
        const ref = doc(db, "products", item.id);
        const snap = await getDoc(ref);

        const currentStock = snap.data()?.stock || 0;
        const qty = item.qty || 1;

        await updateDoc(ref, {
          stock: currentStock - qty
        });
      }

      alert("Order placed successfully 🎉");
      window.location.reload();

    } catch (err) {
      console.log(err);
      alert("Order failed ❌");
    }
  };

  /* 💳 PAYMENT */
  const handlePayment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    if (!window.Razorpay) {
      alert("Payment system not loaded ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      if (!order?.id) {
        alert("Payment init failed ❌");
        return;
      }

      const rzp = new window.Razorpay({
        key: "rzp_test_xxxxxxxx", // 🔥 PUT YOUR REAL KEY
        amount: order.amount,
        currency: "INR",
        name: "JEWEL16 💎",
        description: "Luxury Jewellery Purchase",
        order_id: order.id,

        handler: async () => {
          await placeOrder();
        },

        prefill: {
          email: user.email,
        },

        theme: {
          color: "#800000",
        },
      });

      rzp.open();

    } catch (err) {
      console.log(err);
      alert("Payment Failed ❌");
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

        {(cart || []).map((item, i) => (
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

      {/* 🔥 PAYMENT BUTTON */}
      <button style={btn} onClick={handlePayment} disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>

    </div>
  );
}
