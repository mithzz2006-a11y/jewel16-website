import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const snap = await getDocs(collection(db, "orders"));

    const data = snap.docs
      .map(d => d.data())
      .filter(o => o.email === user.email);

    setOrders(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map((o, i) => (
        <div key={i}>
          <p>₹{o.total}</p>
          <p>{o.status}</p>
        </div>
      ))}
    </div>
  );
}
