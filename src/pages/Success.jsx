// ✅ Success.jsx

import { jsPDF } from "jspdf";

export default function Success({
  setPage,
}) {

  const orderId =
    Math.floor(
      100000 + Math.random() * 900000
    );

  /* 🧾 DOWNLOAD PDF */
  const downloadInvoice = () => {

    try {

      const pdf =
        new jsPDF();

      /* HEADER */
      pdf.setFillColor(
        0,
        0,
        0
      );

      pdf.rect(
        0,
        0,
        210,
        35,
        "F"
      );

      pdf.setTextColor(
        255,
        255,
        255
      );

      pdf.setFontSize(24);

      pdf.text(
        "JEWEL16",
        20,
        22
      );

      /* TITLE */
      pdf.setTextColor(
        90,
        0,
        0
      );

      pdf.setFontSize(20);

      pdf.text(
        "Luxury Invoice",
        20,
        55
      );

      /* DETAILS */
      pdf.setTextColor(
        40,
        40,
        40
      );

      pdf.setFontSize(13);

      pdf.text(
        `Order ID: #JEWEL${orderId}`,
        20,
        80
      );

      pdf.text(
        "Status: Payment Successful",
        20,
        92
      );

      pdf.text(
        `Date: ${new Date().toLocaleDateString()}`,
        20,
        104
      );

      /* LINE */
      pdf.line(
        20,
        116,
        190,
        116
      );

      /* MESSAGE */
      pdf.setFontSize(14);

      pdf.text(
        "Thank you for shopping with JEWEL16.",
        20,
        140
      );

      pdf.text(
        "Your order has been confirmed.",
        20,
        152
      );

      /* FOOTER */
      pdf.setFillColor(
        15,
        15,
        15
      );

      pdf.rect(
        0,
        270,
        210,
        27,
        "F"
      );

      pdf.setTextColor(
        255,
        255,
        255
      );

      pdf.setFontSize(11);

      pdf.text(
        "JEWEL16 Luxury Jewellery",
        20,
        286
      );

      /* SAVE */
      pdf.save(
        `JEWEL16-INVOICE-${orderId}.pdf`
      );

    } catch (err) {

      console.log(err);

      alert(
        "Invoice generation failed"
      );

    }

  };

  return (
    <div style={page}>

      <div style={card}>

        <div style={icon}>
          ✓
        </div>

        <h1 style={title}>
          Payment Successful
        </h1>

        <p style={subtitle}>
          Your luxury order has been placed successfully.
        </p>

        <div style={orderBox}>

          <p style={orderLabel}>
            Order ID
          </p>

          <h2 style={orderIdText}>
            #JEWEL{orderId}
          </h2>

        </div>

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

    </div>
  );
}

/* 🎨 STYLES */

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

const invoiceBtn = {
  padding: "15px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(to right, #1a1a1a, #444)",

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
