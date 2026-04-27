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
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const total = (cart || []).reduce(
    (sum, i) => sum + (i.price || 0) * (i.qty || 1),
    0
  );

  const placeOrder = async () => {
    try {
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

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,
        items: cart,
        total,
        deliveryType,
        instruction,
        address,
        pincode,
        status: "paid",
        createdAt: new Date().toISOString(),
      });

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
      setLoading(true);

      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      const rzp = new window.Razorpay({
        key: "rzp_test_ShDgfm1sNzCDfQ",
        amount: order.amount,
        currency: "INR",
        name: "JEWEL16 💎",
        description: "Luxury Jewellery",
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

      {/* ADDRESS */}
      <div style={box}>
        <h3>Delivery Address</h3>

        <textarea
          placeholder="Enter full delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={textarea}
        />

        <input
          type="number"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          style={input}
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

      {/* SUMMARY */}
      <div style={box}>
        <h3>Order Summary</h3>

        {(cart || []).map((item, i) => (
          <div key={i} style={summaryItem}>
            <p>{item.name}</p>
            <p>₹{item.price} × {item.qty || 1}</p>
          </div>
        ))}

        <hr />
        <h2>Total: ₹{total}</h2>
      </div>

      <button style={btn} onClick={handlePayment} disabled={loading || total === 0}>
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
};

const title = {
  fontSize: "clamp(22px, 5vw, 28px)",
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
};

const textarea = {
  width: "100%",
  minHeight: "80px",
  padding: "10px",
  borderRadius: "6px",
};

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
};

const summaryItem = {
  display: "flex",
  justifyContent: "space-between",
};

const btn = {
  width: "100%",
  padding: "15px",
  background: "#800000",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
};
