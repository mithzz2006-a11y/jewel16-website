import { motion } from "framer-motion";

export default function Home({ setPage }) {
  return (
    <div style={container}>

      {/* 💎 HERO SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={hero}
      >

        {/* LOGO */}
        <h1 style={logo}>JEWEL16</h1>

        {/* TAGLINE */}
        <p style={tagline}>
          Crafted for Timeless Elegance
        </p>

        {/* DESCRIPTION */}
        <p style={desc}>
          Discover exclusive collections of luxury jewelry designed to elevate your style.
        </p>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPage("products")}
          style={btn}
        >
          Explore Collection
        </motion.button>

      </motion.div>

    </div>
  );
}

/* 💎 STYLES */

const container = {
  height: "90vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "radial-gradient(circle at top, #1a1a1a, #000000)"
};

const hero = {
  textAlign: "center",
  maxWidth: "600px"
};

const logo = {
  fontSize: "64px",
  fontWeight: "bold",
  letterSpacing: "4px",
  background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: "0 0 30px rgba(255,215,0,0.5)"
};

const tagline = {
  marginTop: "10px",
  fontSize: "18px",
  color: "#ccc",
  letterSpacing: "2px"
};

const desc = {
  marginTop: "20px",
  fontSize: "14px",
  color: "#aaa",
  lineHeight: "1.6"
};

const btn = {
  marginTop: "30px",
  padding: "14px 28px",
  background: "linear-gradient(90deg, #FFD700, #FFA500)",
  color: "black",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
  boxShadow: "0 0 20px rgba(255,215,0,0.5)"
};
