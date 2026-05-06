// ✅ MyOrders.jsx

import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export default function MyOrders({
  user,
}) {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    if (!user) return;

    const q = query(
      collection(db, "orders"),
      where(
        "userId",
        "==",
        user.uid
      )
    );

    const unsub = onSnapshot(
      q,
      (snap) => {

        const data =
          snap.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          );

        setOrders(data);

      }
    );

    return () => unsub();

  }, [user]);

  return (
    <div style={page}>

      {/* 🔥 HERO */}
      <div style={hero}>

        <h1 style={title}>
          My Orders 📦
        </h1>

        <p style={subtitle}>
          Track your luxury jewellery orders
        </p>

      </div>

      {/* 📦 CONTAINER */}
      <div style={container}>

        {orders.length === 0 ? (

          <div style={emptyBox}>

            <h2>
              No Orders Yet 💎
            </h2>

            <p style={emptyText}>
              Your purchased jewellery
              will appear here.
            </p>

          </div>

        ) : (

          orders.map((o) => (

            <div
              key={o.id}
              style={card}
            >

              {/* 🔥 TOP */}
              <div style={topRow}>

                <div>

                  <p style={orderId}>
                    Order #
                    {o.id.slice(0, 8)}
                  </p>

                  <p style={date}>
                    {o.createdAt
                      ? new Date(
                          o.createdAt
                        ).toLocaleDateString()
                      : "Recently"}
                  </p>

                </div>

                <div style={priceBox}>
                  ₹{o.total}
                </div>

              </div>

              {/* 🛍 ITEMS */}
              {o.items?.map(
                (item, i) => (

                  <div
                    key={i}
                    style={itemRow}
                  >

                    <img
                      src={
                        item.image
                      }
                      alt={
                        item.name
                      }
                      style={img}
                    />

                    <div
                      style={
                        itemInfo
                      }
                    >

                      <p
                        style={
                          itemName
                        }
                      >
                        {
                          item.name
                        }
                      </p>

                      <p
                        style={
                          itemPrice
                        }
                      >
                        ₹
                        {
                          item.price
                        }
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          ))

        )}

      </div>

    </div>
  );
}

/* 🎨 STYLES */

const page = {
  minHeight: "100vh",
  background: "#f5f5f5",
};

const hero = {
  background:
    "linear-gradient(to right, #000, #400000)",

  color: "white",

  padding: "40px 20px",

  textAlign: "center",

  borderRadius:
    "0 0 24px 24px",
};

const title = {
  fontSize:
    "clamp(28px, 5vw, 42px)",
};

const subtitle = {
  color: "#ddd",

  marginTop: "10px",
};

const container = {
  padding: "20px",
};

const emptyBox = {
  background: "white",

  borderRadius: "20px",

  padding: "40px 20px",

  textAlign: "center",

  boxShadow:
    "0 8px 25px rgba(0,0,0,0.08)",
};

const emptyText = {
  color: "#666",

  marginTop: "10px",
};

const card = {
  background: "white",

  borderRadius: "22px",

  padding: "20px",

  marginBottom: "20px",

  boxShadow:
    "0 8px 25px rgba(0,0,0,0.08)",
};

const topRow = {
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  flexWrap: "wrap",

  gap: "10px",
};

const orderId = {
  fontWeight: "700",

  fontSize: "16px",
};

const date = {
  color: "#777",

  fontSize: "13px",

  marginTop: "5px",
};

const priceBox = {
  background:
    "linear-gradient(to right, #000, maroon)",

  color: "white",

  padding: "10px 16px",

  borderRadius: "12px",

  fontWeight: "700",
};

const itemRow = {
  display: "flex",

  alignItems: "center",

  gap: "15px",

  marginTop: "20px",

  paddingTop: "15px",

  borderTop:
    "1px solid #eee",
};

const img = {
  width: "70px",

  height: "70px",

  borderRadius: "12px",

  objectFit: "cover",
};

const itemInfo = {
  flex: 1,
};

const itemName = {
  fontWeight: "600",
};

const itemPrice = {
  color: "maroon",

  marginTop: "5px",
};
