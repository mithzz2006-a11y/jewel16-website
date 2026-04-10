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
      phone,
      address,
      pincode,
      landmark,
      items: cart,
      total,
      date: new Date().toLocaleString()
    };

    // 🔥 SAVE TO LOCAL STORAGE
    const existingOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    existingOrders.push(order);

    localStorage.setItem("orders", JSON.stringify(existingOrders));

    console.log("ORDER SAVED:", order);

    alert("Order placed & saved successfully 🎉");

    setCart([]);
    setPage("home");
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", padding: "40px" }}>
      
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
            
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              style={inputStyle}
            />

            <input
              placeholder="Landmark (optional)"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              style={inputStyle}
            />

            <button
              onClick={placeOrder}
              style={{
                marginTop: "15px",
                padding: "12px",
                width: "100%",
                background: "maroon",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px"
              }}
            >
              Place Order
            </button>

          </div>
        </>
      )}
    </div>
  );
}

/* 🔥 INPUT STYLE */
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
