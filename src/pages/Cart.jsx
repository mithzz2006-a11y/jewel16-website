import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Cart({ cart, setCart, setPage, user }) {

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    if (!user) {
      alert("Login first");
      setPage("auth");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userEmail: user.email,
        items: cart,
        total,
        status: "Pending",
        date: new Date().toISOString()
      });

      alert("Order placed 🎉");
      setCart([]);
      setPage("orders");

    } catch (err) {
      console.error(err);
      alert("Error placing order ❌");
    }
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Cart</h1>

      {cart.map((item, i) => (
        <div key={i}>{item.name} - ₹{item.price}</div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
