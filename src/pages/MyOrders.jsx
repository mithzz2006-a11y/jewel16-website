import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const q = query(
        collection(db, "orders"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snap = await getDocs(q);
      setOrders(snap.docs.map(d => d.data()));
    };

    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map((o, i) => (
        <div key={i}>
          ₹{o.total} - {o.status}
        </div>
      ))}
    </div>
  );
}
