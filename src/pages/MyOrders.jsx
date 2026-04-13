import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    const user = auth.currentUser;

    const snap = await getDocs(collection(db, "orders"));

    const data = snap.docs
      .map(d => d.data())
      .filter(o => o.email === user.email);

    setOrders(data);
  };

  return (
    <div style={{ background: "black", color: "white", padding: "20px" }}>
      <h1>My Orders</h1>

      {orders.map((o, i) => (
        <div key={i} style={{ border: "1px solid white", marginBottom: "10px", padding: "10px" }}>
          <p>Total: ₹{o.total}</p>
          <p>Status: {o.status}</p>

          {o.items.map((item, j) => (
            <div key={j}>
              <img src={item.image} width="60" />
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
