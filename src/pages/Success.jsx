export default function Success({ setPage }) {
export default function Success({
  setPage,
}) {

  const orderId =
    Math.floor(
      100000 + Math.random() * 900000
    );

  return (
    <div style={container}>
      <h1>🎉 Payment Successful</h1>
      <p>Your order has been placed successfully.</p>
    <div style={page}>

      {/* 💎 SUCCESS CARD */}
      <div style={card}>

        {/* ✅ ICON */}
        <div style={icon}>
          ✓
        </div>

        {/* 🎉 TEXT */}
        <h1 style={title}>
          Payment Successful
        </h1>

        <p style={subtitle}>
          Your luxury order has been placed successfully.
        </p>

        {/* 📦 ORDER ID */}
        <div style={orderBox}>

          <p style={orderLabel}>
            Order ID
          </p>

          <h2 style={orderIdText}>
            #JEWEL{orderId}
          </h2>

        </div>

        {/* 🔘 BUTTONS */}
        <div style={btnWrap}>

      <button style={btn} onClick={() => setPage("orders")}>
        View Orders
      </button>
          <button
            style={primaryBtn}
            onClick={() =>
              setPage("orders")
            }
          >
            View Orders
          </button>

          <button
            style={secondaryBtn}
            onClick={() =>
              setPage("home")
            }
          >
            Continue Shopping
          </button>

        </div>

      </div>

      {/* ✨ ANIMATION */}
      <style>
        {`

          @keyframes pop {

            0% {
              transform: scale(0.7);
              opacity: 0;
            }

            100% {
              transform: scale(1);
              opacity: 1;
            }

          }

        `}
      </style>

      <button style={btn2} onClick={() => setPage("home")}>
        Continue Shopping
      </button>
    </div>
  );
}

const container = {
  minHeight: "80vh",
/* 🎨 PREMIUM STYLES */

const page = {
  minHeight: "100vh",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center"

  background:
    "linear-gradient(to bottom right, #000, #3b0000)",

  padding: "20px",
};

const btn = {
  marginTop: "20px",
  padding: "12px 20px",
  background: "maroon",
const card = {
  width: "100%",
  maxWidth: "420px",

  background: "white",

  borderRadius: "28px",

  padding: "40px 25px",

  textAlign: "center",

  animation:
    "pop 0.5s ease",

  boxShadow:
    "0 15px 45px rgba(0,0,0,0.3)",
};

const icon = {
  width: "90px",
  height: "90px",

  borderRadius: "50%",

  background:
    "linear-gradient(to right, green, #00b300)",

  color: "white",
  border: "none"

  fontSize: "42px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  margin: "0 auto",
};

const btn2 = {
const title = {
  marginTop: "25px",

  fontSize:
    "clamp(28px, 5vw, 38px)",

  color: "#111",
};

const subtitle = {
  marginTop: "10px",
  padding: "10px 20px",
  background: "#eee",
  border: "none"

  color: "#666",

  lineHeight: "1.7",
};

const orderBox = {
  marginTop: "25px",

  background: "#fafafa",

  padding: "18px",

  borderRadius: "16px",

  border:
    "1px solid #eee",
};

const orderLabel = {
  color: "#777",
  fontSize: "13px",
};

const orderIdText = {
  marginTop: "8px",

  color: "maroon",

  letterSpacing: "1px",
};

const btnWrap = {
  marginTop: "30px",

  display: "flex",
  flexDirection: "column",

  gap: "12px",
};

const primaryBtn = {
  padding: "15px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(to right, #000, maroon)",

  color: "white",

  fontWeight: "700",

  cursor: "pointer",

  fontSize: "15px",
};

const secondaryBtn = {
  padding: "15px",

  border:
    "1px solid #ddd",

  borderRadius: "14px",

  background: "white",

  fontWeight: "700",

  cursor: "pointer",

  fontSize: "15px",
};
