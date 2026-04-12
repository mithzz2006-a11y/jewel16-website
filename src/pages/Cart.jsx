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

    await addDoc(collection(db, "orders"), {
      userEmail: user.email,
      items: cart,
      total,
      status: "Pending",
      date: new Date().toISOString()
    });

    alert("Order placed");
    setCart([]);
    setPage("orders");
  };

  return (
    <div style={{ background: "#000", minHeight: "100vh", padding: "20px", color: "white" }}>
      
      <h1 style={{ color: "maroon" }}>Your Cart</h1>

      <div className="grid">
        {cart.map((item, i) => (
          <div key={i} className="card" style={{ background: "#111", color: "white", border: "1px solid maroon" }}>
            {item.name} - ₹{item.price}
          </div>
        ))}
      </div>

      <h2>Total: ₹{total}</h2>

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
