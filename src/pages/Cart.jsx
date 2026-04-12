import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Cart({ cart, setCart, setPage, user }) {
  const [loading, setLoading] = useState(false);

  const total = (cart || []).reduce((sum, item) => sum + (item.price || 0), 0);

  const placeOrder = async () => {
    if (!user) {
      alert("Please login first ❌");
      setPage("auth");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "orders"), {
        userEmail: user.email, // 🔥 important
        items: cart || [],
        total,
        status: "Pending",
        date: new Date().toISOString()
      });

      alert("Order placed successfully 🎉");

      setCart([]);
      setPage("orders");

    } catch (err) {
      console.error("ORDER ERROR:", err);
      alert("Error placing order ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Your Cart</h1>

      {(!cart || cart.length === 0) ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i}>
              {item.name} - ₹{item.price}
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <button onClick={placeOrder}>
            {loading ? "Placing..." : "Place Order"}
          </button>
        </>
      )}
    </div>
  );
}
