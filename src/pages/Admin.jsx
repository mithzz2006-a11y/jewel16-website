import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const snap = await getDocs(collection(db, "orders"));

      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setOrders(data);
    };

    fetchAll();
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "white",
      color: "maroon",
      padding: "20px"
    }}>
      <h1>Admin Panel</h1>

      {orders.map(order => (
        <div key={order.id} style={{
          border: "1px solid black",
          padding: "10px",
          marginBottom: "10px"
        }}>
          <p>User: {order.email}</p>
          <p>Total: ₹{order.total}</p>
          <p>Status: {order.status}</p>
        </div>
      ))}
    </div>
  );
}
