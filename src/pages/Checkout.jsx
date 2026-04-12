import { useState } from "react";

export default function Checkout({ cart, total }) {
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
        description: "Luxury Purchase",
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
      alert("Error in payment ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "30px"
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Checkout</h2>

      {cart.map((item, i) => (
        <div key={i} style={{ marginBottom: "15px" }}>
          <p>{item.name}</p>
          <p>₹{item.price}</p>
        </div>
      ))}

      <h3>Total: ₹{total}</h3>

      <button
        onClick={handlePayment}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "15px",
          width: "100%",
          background: "maroon",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
