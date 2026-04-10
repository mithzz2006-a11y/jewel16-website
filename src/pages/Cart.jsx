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

  const [loading, setLoading] = useState(false); // 🔥 prevent double click

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async () => {
    console.log("Button clicked"); // ✅ debug

    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    const { name, phone, address, pincode } = form;

    if (!name || !phone || !address || !pincode) {
      alert("Please fill all required details ❌");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "orders"), {
        customer: name,
        phone: form.phone,
        address: form.address,
        pincode: form.pincode,
        landmark: form.landmark,
        items: cart,
        total: total,
        date: new Date().toISOString()
      });

      alert("Order placed successfully 🎉");

      setCart([]);
      setForm({
        name: "",
        phone: "",
        address: "",
        pincode: "",
        landmark: ""
      });

      setPage("orders"); // 🔥 go to orders page

    } catch (error) {
      console.error("ERROR:", error);
      alert("Error placing order ❌ (check console)");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", padding: "40px", minHeight: "100vh" }}>
      
      <h1 style={{ color: "maroon" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {/* 🛒 ITEMS */}
          {cart.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              {item.name} - ₹{item.price}
            </div>
          ))}

          <h3 style={{ marginTop: "20px" }}>Total: ₹{total}</h3>

          {/* 📋 FORM */}
          <div style={{ marginTop: "20px", maxWidth: "400px" }}>
            
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={inputStyle} />
            <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} style={inputStyle} />
            <input name="address" placeholder="Address" value={form.address} onChange={handleChange} style={inputStyle} />
            <input name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleChange} style={inputStyle} />
            <input name="landmark" placeholder="Landmark (optional)" value={form.landmark} onChange={handleChange} style={inputStyle} />

            <button 
              onClick={placeOrder}
              disabled={loading}
              style={{
                marginTop: "15px",
                padding: "12px",
                width: "100%",
                background: loading ? "gray" : "maroon",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px"
              }}
            >
              {loading ? "Placing Order..." : "Place Order"}
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
