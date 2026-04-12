import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function MyOrders({ setPage }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "orders"),
      where("userEmail", "==", user.email)
    );

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(data);
        setLoading(false);
      },
      (error) => {
        console.error("FETCH ERROR:", error);
        setLoading(false);
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

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <div>
          <p>No orders yet</p>
          <button onClick={() => setPage("products")} style={btn}>
            Shop Now
          </button>
        </div>
      ) : (
        orders.map((o) => (
          <div key={o.id} style={card}>
            <p><b>Total:</b> ₹{o.total}</p>
            <p><b>Status:</b> {o.status}</p>
            <p><b>Date:</b> {new Date(o.date).toLocaleString()}</p>

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
  border: "none",
  cursor: "pointer"
};

const card = {
  border: "1px solid maroon",
  padding: "15px",
  marginBottom: "15px",
  background: "#111"
};
