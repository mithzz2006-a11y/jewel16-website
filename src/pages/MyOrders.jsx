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

        const snap = await getDocs(collection(db, "orders"));

        const data = snap.docs
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
    <div style={container}>
      <h1 style={title}>My Orders</h1>

      <button onClick={() => setPage("home")} style={backBtn}>
        ← Back
      </button>

      {orders.length === 0 ? (
        <p style={{ color: "#aaa", marginTop: "20px" }}>
          No orders yet
        </p>
      ) : (
        orders.map((o, i) => (
          <div key={i} style={card}>
            <h3 style={{ color: "maroon" }}>Order #{i + 1}</h3>

            <p>Total: ₹{o.total}</p>
            <p>Status: {o.status}</p>
            <p>Date: {o.date}</p>

            <div style={{ marginTop: "10px" }}>
              <b>Items:</b>
              {o.items.map((item, index) => (
                <div key={index}>
                  {item.name} - ₹{item.price}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

/* 💎 STYLES */

const container = {
  background: "#000",     // 🔥 BLACK BACKGROUND
  minHeight: "100vh",
  padding: "40px",
  color: "white"
};

const title = {
  color: "maroon",
  marginBottom: "10px"
};

const backBtn = {
  padding: "8px 16px",
  marginBottom: "20px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px"
};

const card = {
  border: "1px solid maroon",
  padding: "20px",
  marginBottom: "20px",
  borderRadius: "8px",
  background: "#111"
};
