import { motion } from "framer-motion";

export default function Home({ setPage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      style={{
        height: "90vh",
        background: "linear-gradient(to right, #000000, #1a1a1a)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}
    >

      <h1 style={{
        fontSize: "60px",
        color: "gold",
        marginBottom: "10px"
      }}>
        JEWEL16 💎
      </h1>

      <p style={{
        fontSize: "20px",
        color: "#ccc",
        marginBottom: "30px"
      }}>
        Experience Luxury Like Never Before
      </p>

      <button
        onClick={() => setPage("products")}
        style={{
          padding: "12px 25px",
          background: "gold",
          color: "black",
          border: "none",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        Explore Collection
      </button>

    </motion.div>
  );
}
