import { useEffect, useState } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
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

  /* ⭐ ADD REVIEW */
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

        {/* IMAGE */}
        <div style={imgWrap}>

          <img
            src={
              product?.image ||
              "https://via.placeholder.com/500"
            }
            alt={product?.name}
            style={img}
          />

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

        </div>

        {/* CONTENT */}
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

          {/* INFO */}
          <div style={infoBox}>
            🚚 Free delivery
          </div>

          <div style={infoBox}>
            🔒 Secure payment
          </div>

          <div style={infoBox}>
            💎 Luxury packaging
          </div>

          {/* BUTTONS */}
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

        {/* ADD REVIEW */}
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

        {/* REVIEWS */}
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
                    r
