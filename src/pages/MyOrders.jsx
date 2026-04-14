import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const snap = await getDocs(collection(db, "orders"));

      const list = snap.docs
        .map((doc) => doc.data())
        .filter((o) => o.userId === user.uid);

      setOrders(list);
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map((o, i) => (
        <div key={i}>
          <p>Total: ₹{o.total}</p>
          <p>Status: {o.status}</p>
        </div>
      ))}
    </div>
  );
}
