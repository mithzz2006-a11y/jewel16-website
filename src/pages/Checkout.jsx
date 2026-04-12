import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Checkout({ item, setPage, user }) {
  if (!item) return <p>No item</p>;

  const total = item.price * (item.qty || 1);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const loaded = await loadRazorpay();

    if (!loaded) {
      alert("Razorpay failed to load");
      return;
    }

    const options = {
      key: "rzp_test_ScWJUAyuWw1k0z", // 🔥 PUT YOUR REAL KEY HERE
      amount: total * 100,
      currency: "INR",
      name: "JEWEL16",
      description: item.name,

      handler: async function (response) {
        // ✅ SAVE ORDER AFTER SUCCESS
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
        color: "#800000"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div style={container}>

      <h1 style={title}>Checkout</h1>

      <div style={card}>
        <img src={item.image} style={image} />

        <div>
          <h2>{item.name}</h2>
          <p>₹{item.price}</p>
          <p>Qty: {item.qty || 1}</p>
          <h2>Total: ₹{total}</h2>
        </div>
      </div>

      {/* 🔥 PAY BUTTON */}
      <div style={footer}>
        <button onClick={handlePayment} style={btn}>
          Pay Now 💳
        </button>
      </div>

    </div>
  );
}

/* 💎 STYLES */

const container = {
  background: "#000",
  color: "white",
  minHeight: "100vh",
  padding: "20px",
  paddingBottom: "100px"
};

const title = {
  color: "maroon"
};

const card = {
  background: "#111",
  padding: "20px",
  marginTop: "20px",
  border: "1px solid maroon",
  borderRadius: "8px"
};

const image = {
  width: "100%",
  height: "250px",
  objectFit: "cover",
  borderRadius: "6px"
};

const footer = {
  position: "fixed",
  bottom: 0,
  width: "100%",
  background: "#000",
  padding: "15px"
};

const btn = {
  width: "100%",
  padding: "15px",
  background: "maroon",
  color: "white",
  border: "none",
  fontSize: "16px",
  fontWeight: "bold",
  cursor: "pointer",
  borderRadius: "6px"
};
