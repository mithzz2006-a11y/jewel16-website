import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout({ item, setPage, user }) {
  if (!item) return <p>No item</p>;

  const total = item.price * (item.qty || 1);

  const placeOrder = async () => {
    await addDoc(collection(db, "orders"), {
      userEmail: user.email,
      items: [item],
      total,
      date: new Date().toISOString()
    });

    alert("Order placed 🎉");
    setPage("orders");
  };

  return (
    <div style={container}>

      <h1 style={title}>Checkout</h1>

      {/* PRODUCT */}
      <div style={card}>
        <img
          src={item.image || "https://picsum.photos/300"}
          alt="product"
          style={image}
        />

        <div>
          <h2>{item.name}</h2>
          <p>Price: ₹{item.price}</p>
          <p>Qty: {item.qty || 1}</p>
          <h2>Total: ₹{total}</h2>
        </div>
      </div>

      {/* 🔥 FIXED BUTTON AREA */}
      <div style={footer}>
        <button onClick={placeOrder} style={btn}>
          Pay Now 💳
        </button>
      </div>

    </div>
  );
}

/* 💎 STYLES */

const container = {
  background: "#000",
  color: "white",
  minHeight: "100vh",
  padding: "20px",
  paddingBottom: "100px" // 🔥 SPACE FOR BUTTON
};

const title = {
  color: "maroon",
  marginBottom: "20px"
};

const card = {
  background: "#111",
  padding: "20px",
  border: "1px solid maroon",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  gap: "15px"
};

const image = {
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "6px"
};

/* 🔥 FIXED FOOTER BUTTON */
const footer = {
  position: "fixed",
  bottom: "0",
  left: "0",
  width: "100%",
  background: "#000",
  padding: "15px",
  borderTop: "1px solid maroon"
};

const btn = {
  width: "100%",
  padding: "15px",
  background: "maroon",
  color: "white",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "6px"
};
