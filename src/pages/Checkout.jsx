import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout({ cart, setPage }) {
  const total = cart.reduce((s, i) => s + i.price, 0);

  const placeOrder = async () => {
    const user = auth.currentUser;

    await addDoc(collection(db, "orders"), {
      email: user.email,
      items: cart,
      total,
      status: "Placed",
      createdAt: new Date()
    });

    alert("Order placed");
    setPage("orders");
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
