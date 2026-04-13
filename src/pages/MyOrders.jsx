import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "orders"));
      const user = auth.currentUser;

      const data = snap.docs
        .map(d => d.data())
        .filter(o => o.email === user.email);

      setOrders(data);
    }
    load();
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
