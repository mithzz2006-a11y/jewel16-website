import { useState } from "
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar({
  setPage,
  cart,
  user,
}) {

  const [menuOpen, setMenuOpen] =
    useStat
  return (
    <div style={nav}>

      {/* ✨ TOP */}
      <div style={topRow}>

        {/* 💎 LOGO */}
        <h2
          style={logo}
          onClick={() =>
            setPage("home")
          }
        >
          JEWEL16 💎
        </h2>

        {/* 🔥 MENU */}
        <div style={menuWrap}>

          <button
            style={dots}
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            ⋮
          </button>

          {menuOpen && (

            <div style={dropdown}>

              <div style={glassGlow}></div>

              <p style={userInfo}>
                {user?.email}
              </p>

              <div style={line}></div>

              {/* 👤 PROFILE */}
              <p
                style={item}
                onClick={() => {

                  setMenuOpen(false);

                  setPage("profile");

                }}
              >
                👤 Profile
              </p>

              {/* 📦 ORDERS */}
              <p
                style={item}
                onClick={() => {

                  setMenuOpen(false);

                  setPage("orders");

                }}
              >
                📦 My Orders
              </p>

              <div style={line}></div>

              {/* 🚪 LOGOUT */}
              <p
                style={logout}
                onClick={async () => {

                  try {

                    setMenuOpen(false);

                    await signOut(auth);

                  } catch (err) {

                    console.log(err);

                  }

                }}
              >
                🚪 Logout
              </p>

            </div>

          )}

        </div>

      </div>

      {/* 🔥 NAVIGATION */}
      <div style={bottomRow}>

        <button
          style={btn}
          onClick={() =>
            setPage("home")
          }
        >
          Home
        </button>

        <button
          style={btn}
          onClick={() =>
            setPage("products")
          }
        >
          Products
        </button>

        <button
          style={btn}
          onClick={() =>
            setPage("cart")
          }
        >
          Cart ({cart?.length || 0})
        </button>

        {user?.isAdmin && (

          <button
            style={btn}
            onClick={() =>
              setPage("admin")
            }
          >
            Admin
          </button>

        )}

      </div>

    </div>
  );
}

/* 🎨 ULTRA PREMIUM GLASS UI */

const nav = {
  position: "sticky",

  top: 0,

  zIndex: 1000,

  padding: "12px",

  backdropFilter:
    "blur(18px)",

  background:
    "rgba(10,10,10,0.72)",

  borderBottom:
    "1px solid rgba(255,255,255,0.06)",

  boxShadow:
    "0 8px 30px rgba(0,0,0,0.25)",
};

/* 🔥 TOP */
const topRow = {
  display: "flex",

  justifyContent:
    "space-between",

  alignItems: "center",
};

/* 🔥 BOTTOM */
const bottomRow = {
  display: "flex",

  justifyContent:
    "space-around",

  marginTop: "12px",

  gap: "10px",

  flexWrap: "wrap",
};

/* 💎 LOGO */
const logo = {
  color: "white",

  cursor: "pointer",

  fontSize:
    "clamp(20px, 4vw, 28px)",

  fontWeight: "800",

  letterSpacing: "1px",

  textShadow:
    "0 0 20px rgba(128,0,0,0.5)",
};

/* 🔘 BUTTONS */
const btn = {
  padding: "10px 18px",

  border: "none",

  borderRadius: "14px",

  background:
    "rgba(255,255,255,0.06)",

  color: "white",

  fontWeight: "600",

  cursor: "pointer",

  backdropFilter:
    "blur(12px)",

  transition: "0.3s",

  boxShadow:
    "0 4px 14px rgba(0,0,0,0.15)",
};

/* 🔥 MENU */
const menuWrap = {
  position: "relative",
};

const dots = {
  width: "42px",

  height: "42px",

  borderRadius: "14px",

  border: "none",

  background:
    "rgba(255,255,255,0.08)",

  color: "white",

  fontSize: "20px",

  cursor: "pointer",

  backdropFilter:
    "blur(12px)",

  boxShadow:
    "0 4px 14px rgba(0,0,0,0.2)",
};

/* 💎 DROPDOWN */
const dropdown = {
  position: "absolute",

  top: "52px",

  right: 0,

  width: "220px",

  padding: "16px",

  borderRadius: "24px",

  overflow: "hidden",

  background:
    "rgba(20,20,20,0.85)",

  backdropFilter:
    "blur(22px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.4)",
};

const glassGlow = {
  position: "absolute",

  width: "180px",

  height: "180px",

  top: "-60px",

  right: "-40px",

  background:
    "radial-gradient(circle, rgba(128,0,0,0.45), transparent)",

  filter: "blur(40px)",
};

const userInfo = {
  color: "#ddd",

  fontSize: "12px",

  marginBottom: "12px",

  wordBreak: "break-all",

  position: "relative",

  zIndex: 2,
};

const line = {
  height: "1px",

  background:
    "rgba(255,255,255,0.08)",

  margin: "10px 0",
};

const item = {
  padding: "12px",

  color: "white",

  cursor: "pointer",

  borderRadius: "14px",

  transition: "0.3s",

  position: "relative",

  zIndex: 2,
};

const logout = {
  ...item,

  color: "#ffb3b3",
};
