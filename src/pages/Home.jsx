import { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Home({ setPage }) {
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div style={container}>

      {/* 🔥 PROFILE ICON */}
      {user && (
        <div style={profileWrapper}>
          <div style={icon} onClick={() => setOpen(!open)}>
            👤
          </div>

          {open && (
            <div style={dropdown}>
              <p style={{ marginBottom: "10px" }}>
                {user.email}
              </p>

              <button onClick={() => setPage("orders")} style={dropBtn}>
                My Orders
              </button>

              <button onClick={logout} style={dropBtn}>
                Logout
              </button>
            </div>
          )}
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

const profileWrapper = {
  position: "absolute",
  top: "30px",
  right: "40px"
};

const icon = {
  fontSize: "24px",
  cursor: "pointer",
  border: "1px solid black",
  padding: "10px",
  borderRadius: "50%",
  background: "#fff"
};

const dropdown = {
  marginTop: "10px",
  background: "#fff",
  border: "1px solid black",
  padding: "15px",
  minWidth: "200px",
  textAlign: "center"
};

const dropBtn = {
  display: "block",
  width: "100%",
  marginTop: "8px",
  padding: "8px",
  border: "1px solid black",
  background: "#fff",
  color: "maroon",
  cursor: "pointer"
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
