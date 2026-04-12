import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function MyOrders({ setPage }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

    if (!user) return;

    const q = query(
      collection(db, "orders"),
      where("userEmail", "==", user.email)
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => doc.data());
        setOrders(data);
      },
      (error) => {
        console.error("FETCH ERROR:", error);
      }
    );

    return () => unsub();
  }, []);

  return (
    <div style={{ padding: "40px", background: "#0a0a0a", color: "white" }}>
      <h1 style={{ color: "maroon" }}>My Orders</h1>

      <button onClick={() => setPage("home")} style={btn}>
        Back
      </button>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o, i) => (
          <div key={i} style={card}>
            <p><b>Total:</b> ₹{o.total}</p>
            <p><b>Status:</b> {o.status}</p>
            <p><b>Date:</b> {o.date}</p>

            <h4>Items:</h4>
            {(o.items || []).map((item, j) => (
              <div key={j}>
                {item.name} - ₹{item.price}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

const btn = {
  marginBottom: "20px",
  padding: "10px",
  background: "maroon",
  color: "white",
  border: "none"
};

const card = {
  border: "1px solid maroon",
  padding: "15px",
  marginBottom: "15px"
};
