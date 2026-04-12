import { useState } from "react";
import { db, auth } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function Checkout({ cart = [], total = 0 }) {
  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    try {
      setLoading(true);

      if (!auth.currentUser) {
        alert("Login required");
        return;
      }

      await addDoc(collection(db, "orders"), {
        userId: auth.currentUser.uid,
        email: auth.currentUser.email,
        items: cart,
        total,
        status: "placed",
        createdAt: serverTimestamp()
      });

      alert("Order placed successfully ✅");

    } catch (err) {
      console.error(err);
      alert("Error placing order ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: "20px"
    }}>
      <h1>Checkout</h1>

      {cart.map((item, i) => (
        <div key={i}>
          <p>{item.name}</p>
          <p>₹{item.price}</p>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button
        onClick={placeOrder}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "15px",
          width: "100%",
          background: "maroon",
          color: "white",
          border: "none"
        }}
      >
        {loading ? "Placing..." : "Place Order"}
      </button>
    </div>
  );
}
