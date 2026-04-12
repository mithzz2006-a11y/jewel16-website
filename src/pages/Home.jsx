import { auth } from "../firebase";

export default function Home({ setPage }) {
  const user = auth.currentUser;

  return (
    <div style={container}>

      {/* 🔥 USER INFO (3 LINES) */}
      {user && (
        <div style={userBox}>
          <p><b>Email:</b> {user.email}</p>
          <p><b>User ID:</b> {user.uid}</p>
          <p><b>Status:</b> Logged In ✅</p>
        </div>
      )}

      {/* 💎 BRAND */}
      <h1 style={logo}>JEWEL16</h1>

      <p style={tagline}>Luxury Redefined</p>

      <button onClick={() => setPage("products")} style={btn}>
        Explore Collection
      </button>

    </div>
  );
}

/* 💎 STYLES */

const container = {
  height: "80vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "#fff"
};

const userBox = {
  position: "absolute",
  top: "100px",
  left: "40px",
  border: "1px solid black",
  padding: "15px",
  background: "#fff",
  color: "maroon",
  fontSize: "14px"
};

const logo = {
  fontSize: "60px",
  color: "maroon",
  letterSpacing: "4px"
};

const tagline = {
  color: "black",
  marginTop: "10px"
};

const btn = {
  marginTop: "20px",
  padding: "12px 24px",
  border: "2px solid black",
  background: "#fff",
  color: "maroon",
  cursor: "pointer",
  fontWeight: "bold"
};
