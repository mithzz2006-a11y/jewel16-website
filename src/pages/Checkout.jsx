import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout({ cart, user }) {
  const placeOrder = async () => {
    await addDoc(collection(db, "orders"), {
      userId: user.uid,
      items: cart,
      total: cart.reduce((sum, i) => sum + i.price, 0),
      status: "pending",
      createdAt: new Date(),
    });

    alert("Order Placed ✅");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Checkout</h1>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
