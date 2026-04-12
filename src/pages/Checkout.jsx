import { useState } from "react";

export default function Checkout({ cart = [], total = 0 }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ amount: total })
      });

      const order = await res.json();

      const options = {
        key: "rzp_test_ScXrC64P0jBKFK",
        amount: order.amount,
        currency: "INR",
        name: "JEWEL16 💎",
        description: "Luxury Jewellery",
        order_id: order.id,

        handler: async function (response) {
          const verify = await fetch("http://localhost:5000/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(response)
          });

          const data = await verify.json();

          if (data.status === "success") {
            alert("Payment Successful ✅");
          } else {
            alert("Payment Failed ❌");
          }
        },

        theme: {
          color: "#800000"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment Error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      padding: "20px"
    }}>
      <h1>Checkout</h1>

      {cart.map((item, i) => (
        <div key={i}>
          <p>{item.name}</p>
          <p>₹{item.price}</p>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "15px",
          width: "100%",
          background: "maroon",
          color: "white",
          border: "none"
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
