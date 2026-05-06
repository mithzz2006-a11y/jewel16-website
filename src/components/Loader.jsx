export default function Loader() {

  return (
    <div style={page}>

      {/* 💎 GLOW */}
      <div style={glow}></div>

      {/* 💎 LOADER CARD */}
      <div style={card}>

        {/* 🔄 SPINNER */}
        <div style={spinner}></div>

        {/* 💎 BRAND */}
        <h1 style={logo}>
          JEWEL16 💎
        </h1>

        <p style={text}>
          Loading luxury experience...
        </p>

        {/* ✨ SHIMMER */}
        <div style={shimmer}></div>

      </div>

      {/* 🔥 KEYFRAMES */}
      <style>
        {`

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }

          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }

            100% {
              transform: translateX(250%);
            }
          }

          @keyframes pulse {
            0% {
              opacity: 0.6;
              transform: scale(1);
            }

            50% {
              opacity: 1;
              transform: scale(1.05);
            }

            100% {
              opacity: 0.6;
              transform: scale(1);
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
  background:
    "linear-gradient(to bottom right, #000, #2b0000)",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",

  position: "relative",
  overflow: "hidden",

  padding: "20px",
};

/* 💎 GLOW */

const glow = {
  position: "absolute",

  width: "400px",
  height: "400px",

  borderRadius: "50%",

  background:
    "radial-gradient(circle, rgba(128,0,0,0.35), transparent)",

  filter: "blur(40px)",

  animation:
    "pulse 3s ease-in-out infinite",
};

/* 💎 CARD */

const card = {
  width: "100%",
  maxWidth: "360px",

  background:
    "rgba(255,255,255,0.08)",

  border:
    "1px solid rgba(255,255,255,0.12)",

  backdropFilter: "blur(18px)",

  borderRadius: "28px",

  padding: "40px 25px",

  textAlign: "center",

  position: "relative",

  overflow: "hidden",

  boxShadow:
    "0 12px 40px rgba(0,0,0,0.35)",
};

/* 🔄 SPINNER */

const spinner = {
  width: "70px",
  height: "70px",

  margin: "0 auto",

  border:
    "5px solid rgba(255,255,255,0.15)",

  borderTop:
    "5px solid white",

  borderRadius: "50%",

  animation:
    "spin 1s linear infinite",
};

/* 💎 LOGO */

const logo = {
  marginTop: "25px",

  color: "white",

  fontSize:
    "clamp(28px, 5vw, 38px)",

  letterSpacing: "1px",
};

/* ✨ TEXT */

const text = {
  marginTop: "10px",

  color: "#ddd",

  fontSize: "14px",

  lineHeight: "1.7",
};

/* ✨ SHIMMER */

const shimmer = {
  position: "absolute",

  top: 0,
  left: 0,

  width: "40%",
  height: "100%",

  background:
    "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",

  transform: "translateX(-100%)",

  animation:
    "shimmer 2.2s infinite",
};
