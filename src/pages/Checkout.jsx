import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout({ cart, setPage }) {

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Login required");
      return;
    }

    await addDoc(collection(db, "orders"), {
      email: user.email,
      items: cart,
      total,
      status: "Placed",
      createdAt: new Date()
    });

    alert("Order placed ✅");

    setPage("orders");
  };

  return (
    <div style={{ background: "black", color: "white", padding: "20px" }}>
      <h1>Checkout</h1>

      {cart.map((item, i) => (
        <div key={i}>
          <p>{item.name}</p>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button onClick={placeOrder}>
        Place Order
      </button>
    </div>
  );
}
