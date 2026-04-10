import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function MyOrders({ setPage }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const data = querySnapshot.docs.map(doc => doc.data());
    setOrders(data);
  };

  return (
    <div style={{ padding: "40px", background: "#0a0a0a", color: "white" }}>
      
      <h1 style={{ color: "maroon" }}>My Orders</h1>

      <button onClick={() => setPage("home")} style={btnStyle}>
        Back Home
      </button>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, index) => (
          <div key={index} style={orderCard}>
            <h3>Order #{index + 1}</h3>
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

const btnStyle = {
  margin: "20px 0",
  padding: "10px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const orderCard = {
  border: "1px solid maroon",
  padding: "20px",
  marginTop: "20px",
  borderRadius: "10px",
  background: "#111"
};
