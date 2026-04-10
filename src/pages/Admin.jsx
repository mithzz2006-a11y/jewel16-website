import { useEffect, useState } from "react";

export default function Admin({ setPage }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);

  // 🔥 CALCULATIONS
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div style={{ padding: "40px", background: "#0a0a0a", color: "white" }}>

      <h1 style={{ color: "maroon" }}>Admin Dashboard</h1>

      <button
        onClick={() => setPage("home")}
        style={{
          marginBottom: "20px",
          padding: "10px",
          background: "maroon",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Back
      </button>

      {/* 🔥 STATS */}
      <div style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
        flexWrap: "wrap"
      }}>
        <div style={cardStyle}>
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue}</p>
        </div>
      </div>

      {/* 📦 ORDERS LIST */}
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={orderCard}>
            <h3>Order #{index + 1}</h3>

            <p><b>Name:</b> {order.customer}</p>
            <p><b>Phone:</b> {order.phone}</p>
            <p><b>Address:</b> {order.address}</p>
            <p><b>Pincode:</b> {order.pincode}</p>
            <p><b>Landmark:</b> {order.landmark}</p>
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
  marginBottom: "20px",
  borderRadius: "10px",
  background: "#111"
};
