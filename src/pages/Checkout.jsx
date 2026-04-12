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

      {/* 🔥 PRODUCT CARD */}
      <div style={card}>

        {/* IMAGE */}
        <img
          src={item.image || "https://picsum.photos/300"}
          alt="product"
          style={image}
        />

        {/* DETAILS */}
        <div style={details}>
          <h2>{item.name}</h2>

          <p>Price: ₹{item.price}</p>
          <p>Quantity: {item.qty || 1}</p>

          <h2 style={{ marginTop: "10px" }}>
            Total: ₹{total}
          </h2>
        </div>

      </div>

      {/* 🔥 BUTTON */}
      <button onClick={placeOrder} style={btn}>
        Confirm Order
      </button>

    </div>
  );
}

/* 💎 STYLES */

const container = {
  background: "#000",
  color: "white",
  minHeight: "100vh",
  padding: "20px"
};

const title = {
  color: "maroon",
  marginBottom: "20px"
};

const card = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  background: "#111",
  padding: "20px",
  border: "1px solid maroon",
  borderRadius: "8px"
};

const image = {
  width: "100%",
  maxHeight: "250px",
  objectFit: "cover",
  borderRadius: "6px"
};

const details = {
  display: "flex",
  flexDirection: "column",
  gap: "5px"
};

const btn = {
  marginTop: "20px",
  padding: "12px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  borderRadius: "6px"
};
