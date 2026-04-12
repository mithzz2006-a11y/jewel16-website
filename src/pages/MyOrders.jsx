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

        const data = snapshot.docs
          .map(doc => doc.data())
          .filter(o => o.userEmail === user.email);

        setOrders(data);

      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>My Orders</h1>

      <button onClick={() => setPage("home")}>Back</button>

      {orders.length === 0 ? (
        <p>No orders</p>
      ) : (
        orders.map((o, i) => (
          <div key={i}>
            <p>Total: ₹{o.total}</p>
            <p>Status: {o.status}</p>
          </div>
        ))
      )}
    </div>
  );
}
