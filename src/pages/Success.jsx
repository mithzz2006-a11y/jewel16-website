// ✅ Success.jsx

export default function Success({
  setPage,
}) {

  const orderId =
    Math.floor(
      100000 + Math.random() * 900000
    );

  return (
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

    </div>
  );
}

/* 🎨 PREMIUM STYLES */

const page = {
  minHeight: "100vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  background:
    "linear-gradient(to bottom right, #000, #3b0000)",

  padding: "20px",
};

const card = {
  width: "100%",
  maxWidth: "430px",

  background:
    "rgba(255,255,255,0.96)",

  borderRadius: "30px",

  padding: "42px 26px",

  textAlign: "center",

  boxShadow:
    "0 15px 45px rgba(0,0,0,0.35)",
};

const icon = {
  width: "95px",
  height: "95px",

  borderRadius: "50%",

  background:
    "linear-gradient(to right, green, #00b300)",

  color: "white",

  fontSize: "42px",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  margin: "0 auto",
};

const title = {
  marginTop: "25px",

  fontSize:
    "clamp(28px, 5vw, 38px)",

  color: "#111",
};

const subtitle = {
  marginTop: "10px",

  color: "#666",

  lineHeight: "1.7",
};

const orderBox = {
  marginTop: "25px",

  background: "#fafafa",

  padding: "18px",

  borderRadius: "18px",
};

const orderLabel = {
  color: "#777",
  fontSize: "13px",
};

const orderIdText = {
  marginTop: "8px",

  color: "maroon",
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
};

const secondaryBtn = {
  padding: "15px",

  border:
    "1px solid #ddd",

  borderRadius: "14px",

  background: "white",

  fontWeight: "700",

  cursor: "pointer",
};
