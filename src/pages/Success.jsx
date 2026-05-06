import jsPDF from "jspdf";

export default function Success({
  setPage,
}) {

  const orderId =
    Math.floor(
      100000 + Math.random() * 900000
    );

  /* 🧾 DOWNLOAD PDF */
  const downloadInvoice = () => {

    const doc = new jsPDF();

    /* 🎨 HEADER */
    doc.setFillColor(0, 0, 0);

    doc.rect(
      0,
      0,
      210,
      40,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(26);

    doc.text(
      "JEWEL16 💎",
      20,
      25
    );

    /* 💎 TITLE */
    doc.setTextColor(
      80,
      0,
      0
    );

    doc.setFontSize(22);

    doc.text(
      "Luxury Invoice",
      20,
      60
    );

    /* 📦 DETAILS */
    doc.setFontSize(14);

    doc.setTextColor(
      40,
      40,
      40
    );

    doc.text(
      `Order ID: #JEWEL${orderId}`,
      20,
      85
    );

    doc.text(
      `Status: Payment Successful`,
      20,
      100
    );

    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      20,
      115
    );

    /* 💎 LINE */
    doc.setDrawColor(
      120,
      0,
      0
    );

    doc.line(
      20,
      125,
      190,
      125
    );

    /* ✨ MESSAGE */
    doc.setFontSize(15);

    doc.text(
      "Thank you for shopping with JEWEL16.",
      20,
      145
    );

    doc.text(
      "Your luxury jewellery order has been confirmed.",
      20,
      158
    );

    /* 💎 FOOTER */
    doc.setFillColor(
      20,
      20,
      20
    );

    doc.rect(
      0,
      260,
      210,
      40,
      "F"
    );

    doc.setTextColor(
      255,
      255,
      255
    );

    doc.setFontSize(12);

    doc.text(
      "JEWEL16 Luxury Jewellery",
      20,
      280
    );

    /* 💾 SAVE */
    doc.save(
      `JEWEL16-INVOICE-${orderId}.pdf`
    );

  };

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

          {/* 🧾 DOWNLOAD */}
          <button
            style={invoiceBtn}
            onClick={downloadInvoice}
          >
            Download Invoice
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

  backdropFilter:
    "blur(14px)",

  borderRadius: "30px",

  padding: "42px 26px",

  textAlign: "center",

  animation:
    "pop 0.5s ease",

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

  boxShadow:
    "0 10px 25px rgba(0,150,0,0.3)",
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

/* 🧾 INVOICE */
const invoiceBtn = {
  padding: "15px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(to right, #1a1a1a, #444)",

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
