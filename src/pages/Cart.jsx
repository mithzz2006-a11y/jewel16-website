import { useState } from "react";

export default function Cart({ cart, setCart, setPage }) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = () => {
    if (!name || !phone || !address || !pincode) {
      alert("Please fill all required details");
      return;
    }

    const order = {
      customer: name,
      phone: phone,
      address: address,
      pincode: pincode,
      landmark: landmark,
      items: cart,
      total: total
    };

    console.log("ORDER PLACED:", order);

    alert("Order placed successfully! 🎉");

    setCart([]);
    setPage("home");
  };

  return (
    <div style={{ padding: "40px", background: "#0a0a0a", color: "white" }}>
      
      <h1 style={{ color: "gold" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key
