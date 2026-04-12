import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;

      const q = query(
        collection(db, "orders"),
        where("userId", "==", auth.currentUser.uid)
      );

      const snap = await getDocs(q);

      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: "20px"
    }}>
      <h1>My Orders</h1>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div key={order.id} style={{ marginBottom: "20px" }}>
          <p>Total: ₹{order.total}</p>
          <p>Status: {order.status}</p>

          {order.items.map((item, i) => (
            <p key={i}>{item.name}</p>
          ))}
        </div>
      ))}
    </div>
  );
}
