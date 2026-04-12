const handlePayment = async () => {
  try {
    // 🔥 CREATE ORDER FROM BACKEND
    const res = await fetch("http://localhost:5000/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ amount: total })
    });

    const order = await res.json();

    // 🔥 RAZORPAY OPTIONS
    const options = {
      key: "rzp_test_ScXrC64P0jBKFK",
      amount: order.amount,
      currency: "INR",
      name: "JEWEL16 💎",
      description: "Luxury Jewellery Purchase",
      order_id: order.id,

      handler: async function (response) {
        try {
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

            // 👉 OPTIONAL: clear cart or redirect
            window.location.reload();
          } else {
            alert("Payment Verification Failed ❌");
          }
        } catch (err) {
          console.error(err);
          alert("Verification Error ❌");
        }
      },

      prefill: {
        name: "Customer",
        email: "customer@email.com",
        contact: "9000000000"
      },

      theme: {
        color: "#800000" // maroon luxury 🔥
      }
    };

    // 🔥 OPEN RAZORPAY
    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (error) {
    console.error(error);
    alert("Payment Failed ❌ Backend not working");
  }
};
