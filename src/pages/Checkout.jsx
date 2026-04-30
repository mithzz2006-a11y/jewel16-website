import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export default function Checkout({ cart, user, setPage }) {
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
          return false;
        }

        const stock = snap.data()?.stock || 0;
        const qty = item.qty || 1;

        if (stock < qty) {
          alert(`${item.name} is out of stock ❌`);
          return false;
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
        status: "placed", // 🔥 changed from paid
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

      return true; // ✅ important
    } catch (err) {
      console.log(err);
      alert("Order failed ❌");
      return false;
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
          const ok = await placeOrder();
          if (ok) {
            setPage("orders"); // ✅ NO reload
          }
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

/* styles unchanged */
