import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Cart({ cart, setCart, setPage, user }) {
  const [loading, setLoading] = useState(false);

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
    if (!user) {
      alert("Please login first ❌");
      setPage("auth");
      return;
    }

    const { name, phone, address, pincode } = form;

    if (!name || !phone || !address || !pincode) {
      alert("Fill all details");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "orders"), {
        userEmail: user.email, // 🔥 IMPORTANT
        customer: name,
        phone,
        address,
        pincode,
        landmark: form.landmark,
        items: cart,
        total,
        status: "Pending",
        date: new Date().toISOString()
      });

      alert("Order placed successfully 🎉");

      setCart([]);
      setPage("home");

    } catch (err) {
      console.error(err);
      alert("Error placing order ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", padding: "40px" }}>
      <h1 style={{ color: "maroon" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i}>
              {item.name} - ₹{item.price}
            </div>
          ))}

          <h3>Total: ₹{total}</h3>

          <div style={{ marginTop: "20px" }}>
            <input name="name" placeholder="Name" onChange={handleChange} style={input} />
            <input name="phone" placeholder="Phone" onChange={handleChange} style={input} />
            <input name="address" placeholder="Address" onChange={handleChange} style={input} />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} style={input} />

            <button onClick={placeOrder} style={btn}>
              {loading ? "Placing..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const input = {
  display: "block",
  marginBottom: "10px",
  padding: "10px",
  width: "300px",
  background: "#111",
  color: "white",
  border: "1px solid maroon"
};

const btn = {
  padding: "10px",
  background: "maroon",
  color: "white",
  border: "none"
};
