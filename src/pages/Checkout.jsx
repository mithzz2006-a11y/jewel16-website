import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout({ cart, user, setPage }) {

  const total = cart.reduce((s, i) => s + i.price, 0);

  const placeOrder = async () => {
    try {
      await addDoc(collection(db, "orders"), {
        email: user.email,
        items: cart,
        total,
        status: "Placed",
        date: new Date().toLocaleString()
      });

      alert("Order placed ✅");
      setPage("orders");

    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>
      <h2>Total: ₹{total}</h2>

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}
