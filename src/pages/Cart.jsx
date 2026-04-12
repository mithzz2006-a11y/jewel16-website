import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Cart({ cart = [], setCart, setPage, user }) {
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    if (!user) {
      alert("Login first");
      setPage("auth");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "orders"), {
        userEmail: user.email,
        items: cart,
        total,
        status: "Pending",
        date: new Date().toISOString()
      });

      alert("Order placed");
      setCart([]);
      setPage("home");

    } catch (err) {
      console.error(err);
      alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Cart</h1>

      {cart.length === 0 ? (
        <p>Empty</p>
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
