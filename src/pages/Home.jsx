import { useEffect, useState } from "react";

export default function Home({
  setPage,
}) {

  /* 💎 AUTO HERO SLIDER */
  const heroImages = [
    "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0",
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f",
    "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1",
  ];

  const [current, setCurrent] =
    useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrent((prev) =>
          (prev + 1) %
          heroImages.length
        );

      }, 4000);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div style={page}>

      {/* 🔥 HERO */}
      <div
        style={{
          ...hero,

          backgroundImage:
            `
            linear-gradient(
              rgba(0,0,0,0.6),
              rgba(30,0,0,0.7)
            ),
            url(${heroImages[current]})
          `,
        }}
      >

        {/* ✨ GLOW */}
        <div style={glow}></div>

        {/* 💎 CONTENT */}
        <div style={heroContent}>

          <p style={smallText}>
            PREMIUM LUXURY JEWELLERY
          </p>

          <h1 style={title}>
            JEWEL16 💎
          </h1>

          <p style={subtitle}>
            Where Luxury Meets Elegance
          </p>

          <button
            style={btn}
            onClick={() =>
              setPage("products")
            }
          >
            Explore Collection
          </button>

        </div>

      </div>

      {/* 💎 COLLECTION */}
      <div style={section}>

        <h2 style={heading}>
          Our Collections
        </h2>

        <div style={grid}>

          <div style={card}>

            <img
              src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0"
              style={img}
            />

            <div style={cardOverlay}></div>

            <p style={cardText}>
              Gold Jewellery
            </p>

          </div>

          <div style={card}>

            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
              style={img}
            />

            <div style={cardOverlay}></div>

            <p style={cardText}>
              Diamond Collection
            </p>

          </div>

          <div style={card}>

            <img
              src="https://images.unsplash.com/photo-1602751584552-8ba73aad10e1"
              style={img}
            />

            <div style={cardOverlay}></div>

            <p style={cardText}>
              Bracelets
            </p>

          </div>

        </div>

      </div>

      {/* 🛡 TRUST */}
      <div style={trust}>

        <div style={trustItem}>
          <h3>🔒 Secure Payment</h3>

          <p>
            Safe & encrypted transactions
          </p>
        </div>

        <div style={trustItem}>
          <h3>🚚 Fast Delivery</h3>

          <p>
            Quick & reliable shipping
          </p>
        </div>

        <div style={trustItem}>
          <h3>💎 Premium Quality</h3>

          <p>
            Luxury crafted jewellery
          </p>
        </div>

      </div>

      {/* ✨ KEYFRAMES */}
      <style>
        {`

          @keyframes pulse {

            0% {
              transform: scale(1);
              opacity: 0.7;
            }

            50% {
              transform: scale(1.1);
              opacity: 1;
            }

            100% {
              transform: scale(1);
              opacity: 0.7;
            }

          }

          @keyframes float {

            0% {
              transform: translateY(0px);
            }

            50% {
              transform: translateY(-10px);
            }

            100% {
              transform: translateY(0px);
            }

          }

        `}
      </style>

    </div>
  );
}

/* 🎨 PREMIUM STYLES */

const page = {
  background: "#0b0b0b",
  overflow: "hidden",
};

/* 🔥 HERO */

const hero = {
  minHeight:
    "clamp(55vh, 75vh, 90vh)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  textAlign: "center",

  padding: "20px",

  color: "white",

  position: "relative",

  overflow: "hidden",

  backgroundSize: "cover",

  backgroundPosition: "center",

  transition:
    "background-image 1s ease",
};

const glow = {
  position: "absolute",

  width: "500px",
  height: "500px",

  borderRadius: "50%",

  background:
    "radial-gradient(circle, rgba(128,0,0,0.35), transparent)",

  filter: "blur(40px)",

  animation:
    "pulse 5s infinite",
};

const heroContent = {
  zIndex: 2,
};

const smallText = {
  letterSpacing: "4px",

  color: "#ddd",

  fontSize: "12px",

  marginBottom: "14px",
};

const title = {
  fontSize:
    "clamp(42px, 9vw, 90px)",

  fontWeight: "800",

  letterSpacing: "2px",

  textShadow:
    "0 0 25px rgba(255,255,255,0.2)",

  animation:
    "float 4s ease-in-out infinite",
};

const subtitle = {
  marginTop: "12px",

  fontSize:
    "clamp(14px, 3vw, 22px)",

  color: "#ddd",

  lineHeight: "1.8",
};

const btn = {
  marginTop: "28px",

  padding: "15px 28px",

  border: "none",

  borderRadius: "14px",

  background:
    "linear-gradient(to right, #2b0000, maroon)",

  color: "white",

  fontWeight: "700",

  fontSize: "15px",

  cursor: "pointer",

  boxShadow:
    "0 10px 30px rgba(128,0,0,0.4)",

  transition: "0.3s",
};

/* 💎 COLLECTION */

const section = {
  padding:
    "clamp(40px, 7vw, 90px) 20px",

  background:
    "linear-gradient(to bottom, #0b0b0b, #140000)",
};

const heading = {
  textAlign: "center",

  color: "white",

  fontSize:
    "clamp(28px, 6vw, 48px)",

  marginBottom: "40px",
};

const grid = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px,1fr))",

  gap: "24px",
};

const card = {
  position: "relative",

  overflow: "hidden",

  borderRadius: "24px",

  cursor: "pointer",

  minHeight: "320px",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.3)",
};

const cardOverlay = {
  position: "absolute",

  inset: 0,

  background:
    "linear-gradient(transparent, rgba(0,0,0,0.8))",
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",

  transition: "0.5s",
};

const cardText = {
  position: "absolute",

  bottom: "20px",
  left: "20px",

  color: "white",

  fontWeight: "700",

  fontSize: "20px",

  zIndex: 2,
};

/* 🛡 TRUST */

const trust = {
  display: "flex",

  flexWrap: "wrap",

  justifyContent: "center",

  gap: "20px",

  padding: "60px 20px",

  background:
    "linear-gradient(to bottom, #140000, #000)",

  textAlign: "center",
};

const trustItem = {
  width: "240px",

  padding: "24px",

  borderRadius: "22px",

  background:
    "rgba(255,255,255,0.05)",

  color: "white",

  backdropFilter: "blur(10px)",

  border:
    "1px solid rgba(255,255,255,0.08)",
};
