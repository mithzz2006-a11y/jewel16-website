import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import jsPDF from "jspdf";

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

  /* 🧾 PDF INVOICE */
  const downloadInvoice = (
    order
  ) => {

    const doc = new jsPDF();

    /* 🎨 HEADER */
    doc.setFillColor(
      0,
      0,
      0
    );

    doc.rect(
      0,
      0,
      210,
      40,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(26);

    doc.text(
      "JEWEL16 💎",
      20,
      25
    );

    /* 💎 TITLE */
    doc.setTextColor(
      90,
      0,
      0
    );

    doc.setFontSize(22);

    doc.text(
      "Luxury Invoice",
      20,
      60
    );

    /* 📦 ORDER DETAILS */
    doc.setTextColor(
      40,
      40,
      40
    );

    doc.setFontSize(14);

    doc.text(
      `Order ID: ${order.id}`,
      20,
      85
    );

    doc.text(
      `Customer: ${user?.email}`,
      20,
      100
    );

    doc.text(
      `Total Amount: ₹${order.total}`,
      20,
      115
    );

    doc.text(
      `Status: ${
        order.status ||
        "Placed"
      }`,
      20,
      130
    );

    /* 💎 LINE */
    doc.setDrawColor(
      120,
      0,
      0
    );

    doc.line(
      20,
      140,
      190,
      140
    );

    /* 🛍 ITEMS */
    let y = 160;

    doc.setFontSize(16);

    doc.text(
      "Items Ordered",
      20,
      y
    );

    y += 15;

    order.items?.forEach(
      (item, i) => {

        doc.setFontSize(13);

        doc.text(
          `${i + 1}. ${
            item.name
          }`,
          20,
          y
        );

        doc.text(
          `₹${item.price}`,
          160,
          y
        );

        y += 12;

      }
    );

    /* ✨ FOOTER */
    doc.setFillColor(
      20,
      20,
      20
    );

    doc.rect(
      0,
      260,
      210,
      40,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(12);

    doc.text(
      "Thank you for shopping with JEWEL16",
      20,
      280
    );

    /* 💾 SAVE */
    doc.save(
      `JEWEL16-${order.id}.pdf`
    );

  };

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

      {/* 📦 ORDERS */}
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

              {/* TOP */}
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

              {/* 🚚 STATUS */}
              <div style={statusWrap}>

                <div style={line}></div>

                {/* STEP 1 */}
                <div style={step}>

                  <div style={activeCircle}>
                    ✓
                  </div>

                  <p style={stepText}>
                    Placed
                  </p>

                </div>

                {/* STEP 2 */}
                <div style={step}>

                  <div
                    style={
                      o.status ===
                        "packed" ||
                      o.status ===
                        "shipped" ||
                      o.status ===
                        "delivered"
                        ? activeCircle
                        : circle
                    }
                  >
                    📦
                  </div>

                  <p style={stepText}>
                    Packed
                  </p>

                </div>

                {/* STEP 3 */}
                <div style={step}>

                  <div
                    style={
                      o.status ===
                        "shipped" ||
                      o.status ===
                        "delivered"
                        ? activeCircle
                        : circle
                    }
                  >
                    🚚
                  </div>

                  <p style={stepText}>
                    Shipped
                  </p>

                </div>

                {/* STEP 4 */}
                <div style={step}>

                  <div
                    style={
                      o.status ===
                      "delivered"
                        ? activeCircle
                        : circle
                    }
                  >
                    ✓
                  </div>

                  <p style={stepText}>
                    Delivered
                  </p>

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

              {/* 🧾 INVOICE BUTTON */}
              <button
                style={invoiceBtn}
                onClick={() =>
                  downloadInvoice(
                    o
                  )
                }
              >
                Download Invoice
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

/* 🎨 PREMIUM MOBILE SAFE STYLES */

const page = {
  minHeight: "100vh",
  background: "#f5f5f5",
};

/* 🔥 HERO */

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

/* 📦 CONTAINER */

const container = {
  padding: "20px",
};

/* ❌ EMPTY */

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

/* 💎 CARD */

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

/* 🚚 TIMELINE */

const statusWrap = {
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",

  marginTop: "30px",

  position: "relative",

  flexWrap: "wrap",

  gap: "20px",
};

const line = {
  position: "absolute",

  top: "18px",

  left: "10%",

  width: "80%",

  height: "3px",

  background: "#eee",

  zIndex: 0,
};

const step = {
  position: "relative",

  zIndex: 1,

  textAlign: "center",
};

const circle = {
  width: "38px",

  height: "38px",

  borderRadius: "50%",

  background: "#eee",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  margin: "0 auto",
};

const activeCircle = {
  width: "38px",

  height: "38px",

  borderRadius: "50%",

  background:
    "linear-gradient(to right, #000, maroon)",

  color: "white",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  margin: "0 auto",
};

const stepText = {
  marginTop: "8px",

  fontSize: "12px",
};

/* 🛍 ITEMS */

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

/* 🧾 BUTTON */

const invoiceBtn = {
  marginTop: "20px",

  width: "100%",

  padding: "14px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(to right, #000, maroon)",

  color: "white",

  fontWeight: "700",

  cursor: "pointer",

  fontSize: "14px",
};
