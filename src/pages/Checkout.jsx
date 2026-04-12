import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout({ item, setPage, user }) {
  if (!item) return <p>No item</p>;

  const total = item.price * item.qty;

  const loadRazorpay = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  const handlePayment = async () => {
    loadRazorpay();

    const options = {
      key: "rzp_test_123456789", // 🔥 replace later with real key
      amount: total * 100, // paise
      currency: "INR",
      name: "JEWEL16",
      description: item.name,

      handler: async function (response) {
        // ✅ SAVE ORDER AFTER PAYMENT SUCCESS
        await addDoc(collection(db, "orders"), {
          userEmail: user.email,
          items: [item],
          total,
          paymentId: response.razorpay_payment_id,
          status: "Paid",
          date: new Date().toISOString()
        });

        alert("Payment Successful 🎉");
        setPage("orders");
      },

      prefill: {
        email: user.email
      },

      theme: {
        color: "#800000" // maroon
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={container}>
      <h1 style={{ color: "maroon" }}>Checkout</h1>

      <div style={card}>
        <h3>{item.name}</h3>
        <p>₹{item.price}</p>
        <p>Qty: {item.qty}</p>
        <h2>Total: ₹{total}</h2>
      </div>

      <button onClick={handlePayment} style={btn}>
        Pay Now 💳
      </button>
    </div>
  );
}

/* 💎 STYLES */

const container = {
  background: "#000",
  color: "white",
  padding: "40px",
  minHeight: "100vh"
};

const card = {
  background: "#111",
  padding: "20px",
  marginTop: "20px",
  border: "1px solid maroon"
};

const btn = {
  marginTop: "20px",
  padding: "12px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer"
};
