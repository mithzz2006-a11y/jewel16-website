import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);

  /* 🔥 FETCH USER ORDERS */
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "orders"),
      where("userId", "==", user.uid)
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setOrders(data);
    });

    return () => unsub();
  }, [user]);

  const steps = ["placed", "packed", "shipped", "delivered"];

  const getIndex = (status) => steps.indexOf(status);

  return (
    <div style={container}>
      
      <h1 style={title}>My Orders 📦</h1>
      <p style={subtitle}>
        Track your purchased luxury items
      </p>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((o, i) => (
          <div key={i} style={card}>
            <p>Total: ₹{o.total}</p>
            <p>Status: {o.status}</p>

            {/* 🔥 TIMELINE */}
            <div style={timeline}>
              {steps.map((s, index) => (
                <div
                  key={index}
                  style={{
                    ...step,
                    background:
                      index <= getIndex(o.status)
                        ? "maroon"
                        : "#555"
                  }}
                >
                  {s}
                </div>
              ))}
            </div>

          </div>
        ))
      )}

    </div>
  );
}

/* 🎨 STYLES */

const container = {
  padding: "20px",
  minHeight: "100vh",
  background: "#111",
  color: "white",
};

const title = {
  color: "maroon",
};

const subtitle = {
  color: "#ccc",
  marginBottom: "20px",
};

const card = {
  border: "1px solid maroon",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
};

/* 🔥 TIMELINE */
const timeline = {
  display: "flex",
  gap: "8px",
  marginTop: "10px",
};

const step = {
  flex: 1,
  padding: "6px",
  fontSize: "12px",
  textAlign: "center",
  borderRadius: "5px",
  color: "white",
};
