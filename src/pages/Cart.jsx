import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Cart({ cart = [], setCart, setPage, user }) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    landmark: ""
  });

  const total = cart.reduce((sum, item) => sum + (item.price || 0), 0);

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

    if (phone.length < 10) {
      alert("Enter a valid phone number");
      return;
    }

    if (pincode.length < 6) {
      alert("Enter a valid pincode");
      return;
    }

    try {
      setLoading(true);

      await addDoc(collection(db, "orders"), {
        userEmail: user.email,
        customer: name,
        phone,
        address,
        pincode,
        landmark: form.landmark || "",
        items: cart,
        total,
        status: "Pending",
        date: new Date().toISOString()
      });

      alert("Order placed successfully 🎉");

      setCart([]);
      setForm({ name: "", phone: "", address: "", pincode: "", landmark: "" });
      setPage("home");

    } catch (err) {
      console.error("ORDER ERROR:", err);
      alert("Error placing order ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px", background: "#0a0a0a", color: "white" }}>
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
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              style={input}
            />
            <input
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              style={input}
            />
            <input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              style={input}
            />
            <input
              name="pincode"
              placeholder="Pincode"
              value={form.pincode}
              onChange={handleChange}
              style={input}
            />
            <input
              name="landmark"
              placeholder="Landmark (optional)"
              value={form.landmark}
              onChange={handleChange}
              style={input}
            />

            <button
              onClick={placeOrder}
              style={{ ...btn, opacity: loading ? 0.6 : 1 }}
              disabled={loading}
            >
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
  border: "none",
  cursor: "pointer"
};
