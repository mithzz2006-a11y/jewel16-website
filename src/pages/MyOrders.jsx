import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyOrders({ setPage }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const snap = await getDocs(collection(db, "orders"));

      const data = snap.docs
        .map(doc => doc.data())
        .filter(o => o.userEmail === user.email);

      setOrders(data);
    };

    fetch();
  }, []);

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>My Orders</h1>

      {orders.map((o, i) => (
        <div key={i}>
          ₹{o.total} - {o.status}
        </div>
      ))}
    </div>
  );
}
