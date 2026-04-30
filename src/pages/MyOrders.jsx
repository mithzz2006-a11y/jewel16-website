import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export default function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);

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
      <p style={subtitle}>Track your purchased luxury items</p>

      {orders.map((o, i) => (
        <div key={i} style={card}>
          <p>Total: ₹{o.total}</p>
          <p>Status: {o.status}</p>

          {/* 🔥 TRACKING */}
          <div style={timeline}>
            {steps.map((s, index) => (
              <div
                key={index}
                style={{
                  ...step,
                  background:
                    index <= getIndex(o.status) ? "maroon" : "#444",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ✅ Added missing styles */

const container = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  color: "#222",
};

const title = {
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "10px",
  color: "maroon",
};

const subtitle = {
  fontSize: "14px",
  marginBottom: "20px",
  color: "#555",
};

const card = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "15px",
  marginBottom: "15px",
  background: "#f9f9f9",
};

const timeline = {
  display: "flex",
  gap: "6px",
  marginTop: "10px",
};

const step = {
  flex: 1,
  padding: "5px",
  fontSize: "11px",
  textAlign: "center",
  borderRadius: "4px",
  color: "white",
};
