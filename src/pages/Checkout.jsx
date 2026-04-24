import { useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";

export default function Checkout({ cart, user }) {

  const [instruction, setInstruction] = useState("");
  const [deliveryType, setDeliveryType] = useState("standard");
  const [loading, setLoading] = useState(false);

  /* 🔥 NEW */
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const total = cart.reduce(
    (sum, i) => sum + i.price * (i.qty || 1),
    0
  );

  /* 🔥 ORDER FUNCTION */
  const placeOrder = async () => {
    try {

      /* STOCK CHECK */
      for (let item of cart) {
        const ref = doc(db, "products", item.id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          alert(`${item.name} not available`);
          return;
        }

        const stock = snap.data().stock || 0;
        const qty = item.qty || 1;

        if (stock < qty) {
          alert(`${item.name} is out of stock ❌`);
          return;
        }
      }

      /* SAVE ORDER */
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        email: user.email,
        items: cart,
        total,
        deliveryType,
        instruction,

        /* 🔥 NEW DATA */
        address,
        pincode,

        status: "paid",
        createdAt: new Date().toISOString(),
      });

      /* REDUCE STOCK */
      for (let item of cart) {
        const ref = doc(db, "products", item.id);
        const snap = await getDoc(ref);

        const currentStock = snap.data().stock || 0;
        const qty = item.qty || 1;

        await updateDoc(ref, {
          stock: currentStock - qty
        });
      }

      alert("Order placed successfully 🎉");
      window.location.reload();

    } catch (err) {
      console.log(err);
      alert("Order failed ❌");
    }
  };

  /* 💳 PAYMENT */
  const handlePayment = async () => {

    if (!user) {
      alert("Please login first");
      return;
    }

    /* 🔥 VALIDATION */
    if (!address || !pincode) {
      alert("Please enter delivery address & pincode");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });

      const order = await res.json();

      const options = {
        key
