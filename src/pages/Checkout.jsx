import { db, auth } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function Checkout({ cart, total }) {

  const placeOrder = async () => {
    await addDoc(collection(db, "orders"), {
      userId: auth.currentUser.uid,
      email: auth.currentUser.email,
      items: cart,
      total,
      status: "placed"
    });

    alert("Order Placed ✅");
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
