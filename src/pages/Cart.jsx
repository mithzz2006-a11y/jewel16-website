import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Cart({ cart, setCart, setPage }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    landmark: ""
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    const { name, phone, address, pincode, landmark } = form;

    if (!name || !phone || !address || !pincode) {
      alert("Please fill all required details");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        customer: name,
        phone,
        address,
        pincode,
        landmark,
        items: cart,
        total,
        date: new Date().toISOString()
      });

      alert("Order placed successfully 🎉");
      setCart([]);
      setPage("home");
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Error placing order ❌");
    }
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", padding: "40px" }}>
      <h1 style={{ color: "maroon" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              {item.name} - ₹{item.price}
            </div>
          ))}

          <h3 style={{ marginTop: "20px" }}>Total: ₹{total}</h3>

          <div style={{ marginTop: "20px", maxWidth: "400px" }}>
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              style={inputStyle}
            />
            <input
              name="landmark"
              placeholder="Landmark (optional)"
              value={form.landmark}
              onChange={handleChange}
              style={inputStyle}
            />

            <button onClick={placeOrder} style={btnStyle}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  background: "#111",
  color: "white",
  border: "1px solid maroon",
  borderRadius: "5px"
};

const btnStyle = {
  marginTop: "15px",
  padding: "12px",
  width: "100%",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px"
};
