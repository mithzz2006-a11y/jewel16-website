import { motion } from "framer-motion";

export default function Home({ setPage, user }) {
  return (
    <div style={container}>

      {/* 🔥 HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={hero}
      >
        <h1 style={logo}>JEWEL16 💎</h1>

        <p style={tagline}>
          Timeless Elegance. Crafted for You.
        </p>

        <button style={btn} onClick={() => setPage("products")}>
          Explore Collection
        </button>
      </motion.div>

      {/* 🔥 USER INFO */}
      {user && (
        <div style={profileBox}>
          <p>Welcome,</p>
          <h3>{user.email}</h3>
        </div>
      )}

      {/* 🔥 FEATURES */}
      <div style={features}>
        <div style={card}>
          <h3>💎 Premium Quality</h3>
          <p>Certified jewellery with best craftsmanship</p>
        </div>

        <div style={card}>
          <h3>🚚 Fast Delivery</h3>
          <p>Secure & fast delivery across India</p>
        </div>

        <div style={card}>
          <h3>🔐 Secure Payment</h3>
          <p>100% safe payment with Razorpay</p>
        </div>
      </div>

    </div>
  );
}

/* 🔥 STYLES */

const container = {
  minHeight: "100vh",
  background: "white",
  color: "maroon",
  padding: "20px"
};

const hero = {
  textAlign: "center",
  marginTop: "80px"
};

const logo = {
  fontSize: "50px",
  fontWeight: "bold"
};

const tagline = {
  marginTop: "10px",
  fontSize: "18px",
  color: "black"
};

const btn = {
  marginTop: "30px",
  padding: "12px 30px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px"
};

const features = {
  display: "flex",
  justifyContent: "center",
  gap: "20px",
  marginTop: "80px",
  flexWrap: "wrap"
};

const card = {
  border: "1px solid black",
  padding: "20px",
  borderRadius: "10px",
  width: "250px",
  textAlign: "center"
};

const profileBox = {
  marginTop: "40px",
  textAlign: "center",
  borderTop: "1px solid black",
  paddingTop: "20px"
};
