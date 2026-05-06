import { useEffect, useState } from "react";

import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  collection,
  getDocs,
} from "firebase/firestore";

import { db, auth } from "../firebase";

import toast from "react-hot-toast";

export default function ProductDetail({
  product,
  setCart,
  setPage,
}) {

  const [reviews, setReviews] =
    useState([]);

  const [reviewText, setReviewText] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [relatedProducts, setRelatedProducts] =
    useState([]);

  /* 💎 NEW */
  const [selectedImage, setSelectedImage] =
    useState("");

  /* 🔥 LIVE REVIEWS */
  useEffect(() => {

    if (!product?.id) return;

    const ref = doc(
      db,
      "products",
      product.id
    );

    const unsub = onSnapshot(
      ref,
      (snap) => {

        if (snap.exists()) {

          setReviews(
            snap.data().reviews || []
          );

        }

      }
    );

    return () => unsub();

  }, [product]);

  /* 💎 RELATED PRODUCTS */
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        const snap = await getDocs(
          collection(db, "products")
        );

        const data = snap.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))

          .filter(
            (p) => p.id !== product?.id
          )

          .slice(0, 4);

        setRelatedProducts(data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchProducts();

  }, [product]);

  /* 🖼 PRODUCT GALLERY */
  useEffect(() => {

    if (!product) return;

    if (
      product.images &&
      product.images.length > 0
    ) {

      setSelectedImage(
        product.images[0]
      );

    } else {

      setSelectedImage(
        product.image
      );

    }

  }, [product]);

  if (!product) {

    return (
      <div style={{ padding: 20 }}>
        Product not found
      </div>
    );

  }

  /* 🛒 CART */
  const addToCart = () => {

    if ((product.stock ?? 0) <= 0) {

      toast.error(
        "Out of stock ❌"
      );

      return;

    }

    setCart((prev = []) => {

      const existing = prev.find(
        (i) => i.id === product.id
      );

      if (existing) {

        if (
          existing.qty >=
          product.stock
        ) {

          toast.error(
            "Stock limit reached ⚠️"
          );

          return prev;

        }

        return prev.map((i) =>
          i.id === product.id
            ? {
                ...i,
                qty:
                  (i.qty || 1) + 1,
              }
            : i
        );

      }

      return [
        ...prev,
        {
          ...product,
          qty: 1,
        },
      ];

    });

    toast.success(
      "Added to cart 💎"
    );

  };

  /* ⭐ REVIEW */
  const submitReview = async () => {

    try {

      if (!reviewText) {

        toast.error(
          "Write review first"
        );

        return;

      }

      const user =
        auth.currentUser;

      if (!user) {

        toast.error(
          "Login required"
        );

        return;

      }

      const ref = doc(
        db,
        "products",
        product.id
      );

      await updateDoc(ref, {

        reviews: arrayUnion({
          user: user.email,
          rating,
          text: reviewText,
          createdAt:
            new Date().toISOString(),
        }),

      });

      setReviewText("");

      setRating(5);

      toast.success(
        "Review added ⭐"
      );

    } catch (err) {

      console.log(err);

      toast.error(
        "Review failed ❌"
      );

    }

  };

  /* ⭐ AVG */
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, r) =>
              sum + r.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div style={page}>

      {/* 🔙 BACK */}
      <button
        style={backBtn}
        onClick={() =>
          setPage("products")
        }
      >
        ← Back
      </button>

      {/* 💎 PRODUCT */}
      <div style={card}>

        {/* 🖼 IMAGE */}
        <div style={imgWrap}>

          {/* 💎 MAIN IMAGE */}
          <img
            src={
              selectedImage ||
              "https://via.placeholder.com/500"
            }
            alt={product?.name}
            style={img}
          />

          {/* 🏷 STOCK */}
          <div
            style={{
              ...badge,

              background:
                (product.stock ?? 0) > 0
                  ? "#0f9d58"
                  : "#d93025",
            }}
          >
            {(product.stock ?? 0) > 0
              ? "In Stock"
              : "Out of Stock"}
          </div>

          {/* 📸 THUMBNAILS */}
          <div style={thumbWrap}>

            {(product.images &&
            product.images.length > 0
              ? product.images
              : [product.image]
            ).map((image, i) => (

              <img
                key={i}
                src={image}
                alt=""
                onClick={() =>
                  setSelectedImage(image)
                }
                style={{
                  ...thumb,

                  border:
                    selectedImage === image
                      ? "2px solid maroon"
                      : "2px solid transparent",
                }}
              />

            ))}

          </div>

        </div>

        {/* 💎 CONTENT */}
        <div style={content}>

          <h1 style={name}>
            {product?.name}
          </h1>

          <p style={price}>
            ₹{product?.price || 0}
          </p>

          {/* ⭐ RATING */}
          <div style={ratingBox}>

            ⭐ {avgRating}

            <span style={reviewCount}>
              ({reviews.length} reviews)
            </span>

          </div>

          <p style={desc}>
            Premium handcrafted jewellery
            designed with elegance,
            luxury, and timeless beauty.
          </p>

          {/* 💎 INFO */}
          <div style={infoBox}>
            🚚 Free delivery
          </div>

          <div style={infoBox}>
            🔒 Secure payment
          </div>

          <div style={infoBox}>
            💎 Luxury packaging
          </div>

          {/* 🔘 BUTTONS */}
          <div style={btnRow}>

            <button
              style={cartBtn}
              onClick={addToCart}
            >
              Add to Cart
            </button>

            <button
              style={buyBtn}
              onClick={() => {

                addToCart();

                setPage("cart");

              }}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

      {/* ⭐ REVIEW SECTION */}
      <div style={reviewSection}>

        <h2 style={reviewTitle}>
          Customer Reviews ⭐
        </h2>

        {/* ✍ REVIEW FORM */}
        <div style={reviewForm}>

          <select
            value={rating}
            onChange={(e) =>
              setRating(
                Number(
                  e.target.value
                )
              )
            }
            style={select}
          >

            <option value={5}>
              ⭐⭐⭐⭐⭐
            </option>

            <option value={4}>
              ⭐⭐⭐⭐
            </option>

            <option value={3}>
              ⭐⭐⭐
            </option>

            <option value={2}>
              ⭐⭐
            </option>

            <option value={1}>
              ⭐
            </option>

          </select>

          <textarea
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) =>
              setReviewText(
                e.target.value
              )
            }
            style={textarea}
          />

          <button
            style={submitBtn}
            onClick={submitReview}
          >
            Submit Review
          </button>

        </div>

        {/* 💬 REVIEWS */}
        {reviews.length === 0 ? (

          <p style={empty}>
            No reviews yet
          </p>

        ) : (

          reviews.map((r, i) => (

            <div
              key={i}
              style={reviewCard}
            >

              <div style={reviewTop}>

                <p style={reviewUser}>
                  {r.user}
                </p>

                <p style={stars}>
                  {"⭐".repeat(
                    r.rating
                  )}
                </p>

              </div>

              <p style={reviewTextStyle}>
                {r.text}
              </p>

            </div>

          ))

        )}

      </div>

      {/* 💎 RELATED PRODUCTS */}
      <div style={relatedSection}>

        <h2 style={relatedTitle}>
          You May Also Like 💎
        </h2>

        <div style={relatedScroll}>

          {relatedProducts.map((item) => (

            <div
              key={item.id}
              style={relatedCard}
            >

              <img
                src={item.image}
                alt={item.name}
                style={relatedImg}
              />

              <div style={relatedContent}>

                <p style={relatedName}>
                  {item.name}
                </p>

                <p style={relatedPrice}>
                  ₹{item.price}
                </p>

                <button
                  style={relatedBtn}
                  onClick={() => {

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });

                    setPage("products");

                  }}
                >
                  View Product
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* 📱 STICKY MOBILE CART */}
      <div style={stickyBar}>

        <div>

          <p style={stickyPrice}>
            ₹{product?.price || 0}
          </p>

          <p style={stickySmall}>
            Premium Luxury Jewellery
          </p>

        </div>

        <button
          style={stickyBtn}
          onClick={addToCart}
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}

/* 🎨 STYLES */

const page = {
  minHeight: "100vh",
  background: "#f5f5f5",
  padding: "20px",
};

const backBtn = {
  marginBottom: "20px",
  border: "none",
  background: "white",
  padding: "10px 16px",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow:
    "0 2px 10px rgba(0,0,0,0.08)",
};

const card = {
  background: "white",
  borderRadius: "24px",
  overflow: "hidden",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(320px,1fr))",
};

const imgWrap = {
  position: "relative",
  background: "#fafafa",
};

const img = {
  width: "100%",
  height: "100%",
  minHeight: "420px",
  objectFit: "cover",
};

/* 📸 THUMBNAILS */

const thumbWrap = {
  display: "flex",

  gap: "10px",

  padding: "14px",

  overflowX: "auto",

  background: "white",
};

const thumb = {
  width: "70px",

  height: "70px",

  objectFit: "cover",

  borderRadius: "12px",

  cursor: "pointer",

  flexShrink: 0,

  transition: "0.3s",
};

const badge = {
  position: "absolute",
  top: "18px",
  left: "18px",
  color: "white",
  padding: "8px 14px",
  borderRadius: "30px",
  fontSize: "13px",
  fontWeight: "600",
};

const content = {
  padding: "30px",
};

const name = {
  fontSize:
    "clamp(28px, 5vw, 42px)",
};

const price = {
  color: "maroon",
  fontSize: "30px",
  fontWeight: "700",
  marginTop: "10px",
};

const ratingBox = {
  marginTop: "12px",
  fontWeight: "600",
};

const reviewCount = {
  color: "#666",
  marginLeft: "6px",
};

const desc = {
  color: "#666",
  lineHeight: "1.8",
  marginTop: "18px",
};

const infoBox = {
  background: "#fafafa",
  padding: "14px",
  borderRadius: "12px",
  marginTop: "12px",
};

const btnRow = {
  display: "flex",
  gap: "12px",
  marginTop: "25px",
  flexWrap: "wrap",
};

const cartBtn = {
  flex: 1,
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "black",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const buyBtn = {
  flex: 1,
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background:
    "linear-gradient(to right, #4b0000, maroon)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const reviewSection = {
  maxWidth: "1100px",
  margin: "40px auto",
};

const reviewTitle = {
  marginBottom: "20px",
};

const reviewForm = {
  background: "white",
  padding: "20px",
  borderRadius: "18px",
  marginBottom: "25px",
};

const select = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #ddd",
};

const textarea = {
  width: "100%",
  minHeight: "120px",
  marginTop: "15px",
  padding: "15px",
  borderRadius: "12px",
  border: "1px solid #ddd",
};

const submitBtn = {
  marginTop: "15px",
  padding: "14px 20px",
  border: "none",
  borderRadius: "12px",
  background:
    "linear-gradient(to right, #000, maroon)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

const reviewCard = {
  background: "white",
  padding: "18px",
  borderRadius: "18px",
  marginBottom: "15px",
};

const reviewTop = {
  display: "flex",
  justifyContent: "space-between",
};

const reviewUser = {
  fontWeight: "600",
};

const stars = {
  color: "#ffb400",
};

const reviewTextStyle = {
  color: "#555",
  marginTop: "10px",
};

const empty = {
  color: "#666",
};

const relatedSection = {
  maxWidth: "1100px",
  margin: "50px auto",
};

const relatedTitle = {
  marginBottom: "20px",
};

const relatedScroll = {
  display: "flex",
  gap: "16px",
  overflowX: "auto",
  paddingBottom: "10px",
};

const relatedCard = {
  minWidth: "220px",
  background: "white",
  borderRadius: "18px",
  overflow: "hidden",
  flexShrink: 0,
  boxShadow:
    "0 8px 20px rgba(0,0,0,0.08)",
};

const relatedImg = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};

const relatedContent = {
  padding: "14px",
};

const relatedName = {
  fontWeight: "600",
};

const relatedPrice = {
  color: "maroon",
  fontWeight: "700",
  marginTop: "6px",
};

const relatedBtn = {
  marginTop: "12px",
  width: "100%",
  padding: "10px",
  border: "none",
  borderRadius: "10px",
  background:
    "linear-gradient(to right, #000, maroon)",
  color: "white",
  fontWeight: "600",
  cursor: "pointer",
};

/* 📱 STICKY MOBILE CART */

const stickyBar = {
  position: "fixed",
  bottom: "75px",
  left: "50%",
  transform: "translateX(-50%)",

  width: "calc(100% - 20px)",
  maxWidth: "500px",

  background:
    "rgba(15,15,15,0.92)",

  backdropFilter: "blur(14px)",

  border:
    "1px solid rgba(255,255,255,0.08)",

  borderRadius: "18px",

  padding: "14px",

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.3)",

  zIndex: 999,
};

const stickyPrice = {
  color: "white",

  fontWeight: "700",

  fontSize: "18px",
};

const stickySmall = {
  color: "#bbb",

  fontSize: "12px",

  marginTop: "2px",
};

const stickyBtn = {
  padding: "12px 18px",

  border: "none",

  borderRadius: "12px",

  background:
    "linear-gradient(to right, #2b0000, maroon)",

  color: "white",

  fontWeight: "700",

  cursor: "pointer",

  minWidth: "130px",
};
