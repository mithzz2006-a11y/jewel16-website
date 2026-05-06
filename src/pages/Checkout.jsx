import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import toast from "react-hot-toast";

export default function Checkout({ cart, user }) {

  const [instruction, setInstruction] =
    useState("");

  const [deliveryType, setDeliveryType] =
    useState("standard");

  const [loading, setLoading] =
    useState(false);

  /* 📍 ADDRESS */
  const [address, setAddress] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  /* 💰 TOTAL */
  const total = (cart || []).reduce(
    (sum, i) =>
      sum +
      (i.price || 0) * (i.qty || 1),
    0
  );

  /* 📦 PLACE ORDER */
  const placeOrder = async () => {

    try {

      for (let item of cart) {

        const ref = doc(
          db,
          "products",
          item.id
        );

        const snap =
          await getDoc(ref);

        if (!snap.exists()) {
          toast.error(
            "Product not found ❌"
          );
          return;
        }

        const stock =
          snap.data()?.stock || 0;

        const qty =
          item.qty || 1;

        if (stock < qty) {
          toast.error(
            `Not enough stock for ${item.name}`
          );
          return;
        }

        /* 📦 SAVE ORDER */
        await addDoc(
          collection(db, "orders"),
          {
            userId: user.uid,
            items: cart,
            total,
            deliveryType,
            instruction,
            address,
            pincode,
            status: "placed",
            createdAt:
              new Date().toISOString(),
          }
        );

        /* 🔥 UPDATE STOCK */
        const currentStock =
          snap.data()?.stock || 0;

        await updateDoc(ref, {
          stock:
            currentStock - qty,
        });
      }

      toast.success(
        "Order placed successfully 🎉"
      );

    } catch (err) {

      console.error(
        "Order error:",
        err
      );

      toast.error(
        "Order failed ❌"
      );
    }
  };

  /* 💳 PAYMENT */
  const handlePayment = async () => {

    if (!user) {
      toast.error(
        "Please login first"
      );
      return;
    }

    if (!address || !pincode) {
      toast.error(
        "Enter address & pincode"
      );
      return;
    }

    if (pincode.length !== 6) {
      toast.error(
        "Enter valid pincode"
      );
      return;
    }

    if (!window.Razorpay) {
      toast.error(
        "Payment system not loaded ❌"
      );
      return;
    }

    try {

      setLoading(true);

      toast.loading(
        "Opening payment..."
      );

      const res = await fetch(
        "/create-order",
        {
          method: "POST",
        }
      );

      const order =
        await res.json();

      const rzp =
        new window.Razorpay({
          key:
            "rzp_test_ShDgfm1sNzCDfQ",

          amount: order.amount,

          currency: "INR",

          name: "JEWEL16 💎",

          description:
            "Luxury Jewellery",

          order_id: order.id,

          handler: async () => {

            await placeOrder();

          },

          theme: {
            color: "#800000",
          },
        });

      rzp.open();

    } catch (err) {

      console.error(
        "Payment error:",
        err
      );

      toast.error(
        "Payment Failed ❌"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div style={page}>

      {/* 🔥 HERO */}
      <div style={hero}>

        <h1 style={title}>
          Secure Checkout 🔐
        </h1>

        <p style={subtitle}>
          Premium & safe purchase
        </p>

      </div>

      {/* 📦 MAIN */}
      <div style={container}>

        {/* 📍 ADDRESS */}
        <div style={box}>

          <h3 style={heading}>
            Delivery Address
          </h3>

          <input
            style={input}
            placeholder="Enter your address"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
          />

          <input
            style={input}
            placeholder="Enter pincode"
            value={pincode}
            onChange={(e) =>
              setPincode(
                e.target.value
              )
            }
          />

        </div>

        {/* 🚚 DELIVERY */}
        <div style={box}>

          <h3 style={heading}>
            Delivery Type
          </h3>

          <label style={option}>

            <input
              type="radio"
              checked={
                deliveryType ===
                "standard"
              }
              onChange={() =>
                setDeliveryType(
                  "standard"
                )
              }
            />

            Standard Delivery
            (Free)

          </label>

          <label style={option}>

            <input
              type="radio"
              checked={
                deliveryType ===
                "express"
              }
              onChange={() =>
                setDeliveryType(
                  "express"
                )
              }
            />

            Express Delivery
            (₹99)

          </label>

          <p style={eta}>
            🚚 Delivery in
            3-5 business days
          </p>

        </div>

        {/* 📝 NOTE */}
        <div style={box}>

          <h3 style={heading}>
            Delivery Instructions
          </h3>

          <textarea
            placeholder="Leave at door / Call before delivery"
            value={instruction}
            onChange={(e) =>
              setInstruction(
                e.target.value
              )
            }
            style={textarea}
          />

        </div>

        {/* 🛍 SUMMARY */}
        <div style={box}>

          <h3 style={heading}>
            Order Summary
          </h3>

          {(cart || []).map(
            (item, i) => (
              <div
                key={i}
                style={summaryItem}
              >

                <p>
                  {item.name}
                </p>

                <p>
                  ₹{item.price} ×{" "}
                  {item.qty || 1}
                </p>

              </div>
            )
          )}

          {/* 💰 TOTAL */}
          <div style={totalBox}>

            <span>
              Total Amount
            </span>

            <h2>
              ₹{total}
            </h2>

          </div>

        </div>

        {/* 💳 BUTTON */}
        <button
          style={btn}
          onClick={
            handlePayment
          }
          disabled={
            loading ||
            total === 0
          }
        >
          {loading
            ? "Processing..."
            : "Pay Now"}
        </button>

        {/* 🔒 TRUST */}
        <div style={secureBox}>

          🔒 100% Secure Payments
          <br />

          💎 Premium Packaging
          <br />

          🚚 Fast Delivery

        </div>

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
  textAlign: "center",
  padding: "40px 20px",
  borderRadius: "0 0 24px 24px",
};

const title = {
  fontSize:
    "clamp(28px, 5vw, 42px)",
};

const subtitle = {
  color: "#ddd",
  marginTop: "10px",
};

/* 📦 MAIN */

const container = {
  maxWidth: "700px",
  margin: "0 auto",
  padding: "20px",
};

const box = {
  background: "white",
  borderRadius: "20px",
  padding: "20px",
  marginBottom: "20px",
  boxShadow:
    "0 8px 25px rgba(0,0,0,0.08)",
};

const heading = {
  marginBottom: "15px",
};

const input = {
  width: "100%",
  padding: "14px",
  marginTop: "12px",
  borderRadius: "12px",
  border:
    "1px solid #ddd",
  fontSize: "14px",
  outline: "none",
};

const option = {
  display: "block",
  marginTop: "12px",
  fontSize: "14px",
};

const eta = {
  marginTop: "15px",
  color: "#666",
  fontSize: "13px",
};

const textarea = {
  width: "100%",
  minHeight: "100px",
  padding: "14px",
  borderRadius: "12px",
  border:
    "1px solid #ddd",
  outline: "none",
  fontSize: "14px",
};

const summaryItem = {
  display: "flex",
  justifyContent:
    "space-between",
  marginBottom: "12px",
  gap: "10px",
};

const totalBox = {
  marginTop: "20px",
  padding: "18px",
  borderRadius: "14px",
  background: "#fafafa",
  border:
    "1px solid #eee",
};

const btn = {
  width: "100%",
  padding: "16px",
  border: "none",
  borderRadius: "16px",
  background:
    "linear-gradient(to right, #000, maroon)",
  color: "white",
  fontSize: "16px",
  fontWeight: "700",
  cursor: "pointer",
};

const secureBox = {
  marginTop: "20px",
  textAlign: "center",
  color: "#666",
  fontSize: "13px",
  lineHeight: "1.9",
};
