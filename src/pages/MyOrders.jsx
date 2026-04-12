import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyOrders({ setPage }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const snapshot = await getDocs(collection(db, "orders"));

        const filtered = snapshot.docs
          .map(doc => doc.data())
          .filter(order => order.userEmail === user.email);

        setOrders(filtered);

      } catch (err) {
        console.error("FETCH ERROR:", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>My Orders</h1>

      <button onClick={() => setPage("home")}>Back</button>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o, i) => (
          <div key={i}>
            <p>Total: ₹{o.total}</p>
            <p>Status: {o.status}</p>
            <p>Date: {o.date}</p>
          </div>
        ))
      )}
    </div>
  );
}
