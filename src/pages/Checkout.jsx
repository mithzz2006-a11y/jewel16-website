import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout({ item, setPage, user }) {
  if (!item) return <p>No item selected</p>;

  const total = item.price * item.qty;

  const placeOrder = async () => {
    await addDoc(collection(db, "orders"), {
      userEmail: user.email,
      items: [item],
      total,
      status: "Pending",
      date: new Date().toISOString()
    });

    alert("Order placed successfully 🎉");
    setPage("orders");
  };

  return (
    <div style={container}>

      <h1 style={{ color: "maroon" }}>Checkout</h1>

      <div style={card}>
        <h3>{item.name}</h3>
        <p>Price: ₹{item.price}</p>
        <p>Quantity: {item.qty}</p>
        <h2>Total: ₹{total}</h2>
      </div>

      <button onClick={placeOrder} style={btn}>
        Confirm Order
      </button>

    </div>
  );
}

const container = {
  padding: "40px",
  background: "#000",
  color: "white",
  minHeight: "100vh"
};

const card = {
  border: "1px solid maroon",
  padding: "20px",
  marginTop: "20px",
  background: "#111"
};

const btn = {
  marginTop: "20px",
  padding: "12px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer"
};
