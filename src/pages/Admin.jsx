import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Admin({ setPage }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔥 FETCH FROM FIREBASE
  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "orders"));
      const data = querySnapshot.docs.map(doc => doc.data());
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // 🔥 CALCULATIONS
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div style={{ padding: "40px", background: "#0a0a0a", color: "white" }}>

      <h1 style={{ color: "maroon" }}>Admin Dashboard</h1>

      <button onClick={() => setPage("home")} style={btnStyle}>
        Back
      </button>

      {/* 🔥 STATS */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>
      </div>

      {/* 📦 ORDERS */}
      {orders.length === 0 ? (
        <p style={{ marginTop: "20px" }}>No orders yet</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={orderCard}>
            <h3>Order #{index + 1}</h3>

            <p><b>Name:</b> {order.customer}</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Address:</b> {order.address}</p>
            <p><b>Total:</b> ₹{order.total}</p>
            <p><b>Date:</b> {order.date}</p>

            <h4>Items:</h4>
            {order.items.map((item, i) => (
              <div key={i}>
                {item.name} - ₹{item.price}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}

// 💎 STYLES
const btnStyle = {
  marginTop: "10px",
  padding: "10px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const cardStyle = {
  border: "1px solid maroon",
  padding: "20px",
  borderRadius: "10px",
  background: "#111",
  minWidth: "150px",
  textAlign: "center"
};

const orderCard = {
  border: "1px solid maroon",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px",
  background: "#111"
};
