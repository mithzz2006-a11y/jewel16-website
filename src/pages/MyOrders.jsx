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
    <div style={container}>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o, i) => (
          <div key={i} style={orderCard}>
            <h3>Order #{i + 1}</h3>

            <p>Total: ₹{o.total}</p>
            <p>Status: {o.status}</p>

            <p style={status}>
              {o.status === "Placed" && "🟡 Processing"}
              {o.status === "Shipped" && "🔵 Shipped"}
              {o.status === "Delivered" && "🟢 Delivered"}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

const container = {
  background: "black",
  color: "white",
  minHeight: "100vh",
  padding: "20px"
};

const orderCard = {
  border: "1px solid #444",
  padding: "15px",
  marginBottom: "10px"
};

const status = {
  marginTop: "10px"
};
