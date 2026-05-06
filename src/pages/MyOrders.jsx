import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

import { jsPDF } from "jspdf";

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

  /* 🧾 PDF DOWNLOAD */
  const downloadInvoice = (
    order
  ) => {

    try {

      const pdf =
        new jsPDF();

      /* 🎨 HEADER */
      pdf.setFillColor(
        0,
        0,
        0
      );

      pdf.rect(
        0,
        0,
        210,
        35,
        "F"
      );

      pdf.setTextColor(
        255,
        255,
        255
      );

      pdf.setFontSize(24);

      pdf.text(
        "JEWEL16",
        20,
        22
      );

      /* 💎 TITLE */
      pdf.setTextColor(
        90,
        0,
        0
      );

      pdf.setFontSize(20);

      pdf.text(
        "Luxury Invoice",
        20,
        55
      );

      /* 📦 DETAILS */
      pdf.setTextColor(
        40,
        40,
        40
      );

      pdf.setFontSize(13);

      pdf.text(
        `Order ID: ${order.id}`,
        20,
        80
      );

      pdf.text(
        `Customer: ${
          user?.email || ""
        }`,
        20,
        92
      );

      pdf.text(
        `Total: ₹${
          order.total || 0
        }`,
        20,
        104
      );

      pdf.text(
        `Status: ${
          order.status ||
          "Placed"
        }`,
        20,
        116
      );

      /* 💎 LINE */
      pdf.line(
        20,
        126,
        190,
        126
      );

      /* 🛍 ITEMS */
      let y = 145;

      pdf.setFontSize(15);

      pdf.text(
        "Items",
        20,
        y
      );

      y += 15;

      if (
        order.items &&
        order.items.length > 0
      ) {

        order.items.forEach(
          (item, i) => {

            pdf.setFontSize(12);

            pdf.text(
              `${i + 1}. ${
                item.name || ""
              }`,
              20,
              y
            );

            pdf.text(
              `₹${
                item.price || 0
              }`,
              160,
              y
            );

            y += 12;

          }
        );

      }

      /* FOOTER */
      pdf.setFillColor(
        15,
        15,
        15
      );

      pdf.rect(
        0,
        270,
        210,
        27,
        "F"
      );

      pdf.setTextColor(
        255,
        255,
        255
      );

      pdf.setFontSize(11);

      pdf.text(
        "Thank you for shopping with JEWEL16",
        20,
        286
      );

      /* SAVE */
      pdf.save(
        `JEWEL16-${order.id}.pdf`
      );

    } catch (err) {

      console.log(err);

      alert(
        "Invoice generation failed"
      );

    }

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

      {/* 📦 CONTAINER */}
      <div style={container}>

        {orders.length === 0 ? (

          <div style={emptyBox}>

            <h2>
              No Orders Yet 💎
            </h2>

            <p style={emptyText}>
              Your orders will appear here.
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

              {/* 🧾 BUTTON */}
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
