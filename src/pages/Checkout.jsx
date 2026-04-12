const handlePayment = async () => {

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
        alert("Payment Verified ✅");
      } else {
        alert("Payment Failed ❌");
      }
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};
