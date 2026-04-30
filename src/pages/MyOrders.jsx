import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function MyOrders({ user }) {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(data);
    });

    return () => unsub();
  }, [user]);

  return (
    <div style={container}>

      <h1>My Orders 📦</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o) => (
          <div key={o.id} style={card}>
            <p>Total: ₹{o.total}</p>
            <p>Status: {o.status}</p>
          </div>
        ))
      )}

    </div>
  );
}

const container = { padding: 20 };
const card = {
  border: "1px solid #ddd",
  padding: 15,
  marginBottom: 10
};
