import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import ProductCard from "../components/ProductCard";

export default function Products({
  setCart,
  setPage,
  setSelectedProduct,
}) {

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [activeFilter, setActiveFilter] =
    useState("All");

  /* 🔥 FIRESTORE CONNECT */
  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "products"),
      (snap) => {

        try {

          const data =
            snap.docs.map((doc) => {

              const d =
                doc.data() || {};

              return {
                id: doc.id,
                name:
                  d.name ||
                  "No Name",
                price:
                  Number(d.price) ||
                  0,
                image:
                  d.image || "",
                stock:
                  Number(d.stock) ||
                  0,
              };

            });

          setProducts(data);

        } catch (err) {

          console.error(
            "Error fetching products:",
            err
          );

        }

      }
    );

    return () => unsub();

  }, []);

  /* 🔍 FILTER */
  const filteredProducts =
    products.filter((p) => {

      const matchesSearch =
        p.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      if (
        activeFilter === "All"
      ) {

        return matchesSearch;

      }

      return (
        matchesSearch &&
        p.name
          .toLowerCase()
          .includes(
            activeFilter.toLowerCase()
          )
      );

    });

  const filters = [
    "All",
    "Bracelet",
    "Ring",
  ];

  return (
    <div style={page}>

      {/* 🔥 HERO */}
      <div style={hero}>

        <div style={overlay}></div>

        <h1 style={title}>
          Our Collection 💎
        </h1>

        <p style={subtitle}>
          Explore handcrafted luxury jewellery
        </p>

        <button
          style={btn}
          onClick={() =>
            setPage("cart")
          }
        >
          View Cart
        </button>

      </div>

      {/* 💎 BRAND */}
      <div style={brand}>

        <h2 style={brandTitle}>
          Luxury You Can Trust
        </h2>

        <p style={brandText}>
          At JEWEL16, every piece is crafted
          with precision, passion, and perfection.
          Experience jewellery that defines
          elegance and confidence.
        </p>

      </div>

      {/* 🔍 FLOATING SEARCH */}
      <div style={stickySearch}>

        <input
          type="text"
          placeholder="Search jewellery..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={searchInput}
        />

        {/* 💎 FILTER CHIPS */}
        <div style={chipsWrap}>

          {filters.map((f) => (

            <button
              key={f}
              onClick={() =>
                setActiveFilter(f)
              }
              style={{
                ...chip,

                background:
                  activeFilter === f
                    ? "linear-gradient(to right, #2b0000, maroon)"
                    : "white",

                color:
                  activeFilter === f
                    ? "white"
                    : "#333",
              }}
            >
              {f}
            </button>

          ))}

        </div>

      </div>

      {/* 🛍 PRODUCT GRID */}
      <div style={grid}>

        {filteredProducts.length === 0 ? (

          <p style={empty}>
            No products found
          </p>

        ) : (

          filteredProducts.map((p) => (

            <div
              key={p.id}
              style={cardWrap}
              onClick={() => {

                setSelectedProduct(p);

                setPage("detail");

              }}
            >

              <div
                onClick={(e) =>
                  e.stopPropagation()
                }
              >

                <ProductCard
                  product={p}
                  setCart={setCart}
                />

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

/* 🎨 PREMIUM STYLES */

const page = {
  background: "#f5f5f5",
  minHeight: "100vh",
};

/* 🔥 HERO */

const hero = {
  minHeight: "28vh",

  display: "flex",

  flexDirection: "column",

  justifyContent: "center",

  alignItems: "center",

  textAlign: "center",

  padding: "25px 15px",

  background:
    "linear-gradient(to right, #000, #400000)",

  color: "white",

  position: "relative",

  overflow: "hidden",

  borderRadius:
    "0 0 25px 25px",
};

const overlay = {
  position: "absolute",

  width: "100%",

  height: "100%",

  top: 0,

  left: 0,

  background:
    "radial-gradient(circle, rgba(255,255,255,0.08), transparent)",
};

const title = {
  fontSize:
    "clamp(28px, 6vw, 48px)",

  fontWeight: "700",

  letterSpacing: "1px",

  zIndex: 1,
};

const subtitle = {
  marginTop: "10px",

  color: "#ddd",

  fontSize:
    "clamp(13px, 3vw, 17px)",

  zIndex: 1,
};

const btn = {
  marginTop: "18px",

  padding: "12px 24px",

  background: "white",

  border: "none",

  borderRadius: "10px",

  fontWeight: "600",

  cursor: "pointer",

  fontSize: "14px",

  boxShadow:
    "0 8px 20px rgba(255,255,255,0.15)",

  zIndex: 1,
};

/* 💎 BRAND */

const brand = {
  textAlign: "center",

  padding:
    "40px 20px 20px",
};

const brandTitle = {
  fontSize:
    "clamp(24px, 5vw, 36px)",

  marginBottom: "10px",
};

const brandText = {
  maxWidth: "700px",

  margin: "0 auto",

  color: "#666",

  lineHeight: "1.7",

  fontSize: "14px",
};

/* 🔍 STICKY SEARCH */

const stickySearch = {
  position: "sticky",

  top: "70px",

  zIndex: 50,

  padding: "10px 15px",

  backdropFilter:
    "blur(14px)",

  background:
    "rgba(245,245,245,0.75)",
};

const searchInput = {
  width: "100%",

  padding: "15px",

  borderRadius: "18px",

  border: "1px solid #ddd",

  fontSize: "15px",

  outline: "none",

  background: "white",

  boxShadow:
    "0 6px 18px rgba(0,0,0,0.06)",
};

/* 💎 CHIPS */

const chipsWrap = {
  display: "flex",

  gap: "10px",

  overflowX: "auto",

  paddingTop: "14px",

  paddingBottom: "5px",
};

const chip = {
  padding: "10px 18px",

  border: "none",

  borderRadius: "30px",

  cursor: "pointer",

  fontWeight: "600",

  whiteSpace: "nowrap",

  boxShadow:
    "0 4px 10px rgba(0,0,0,0.06)",
};

/* 🛍 GRID */

const grid = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(180px, 1fr))",

  gap: "20px",

  padding: "20px",
};

const cardWrap = {
  cursor: "pointer",

  transition: "0.3s",
};

const empty = {
  textAlign: "center",

  color: "#555",

  padding: "20px",
};
