import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";
import { useState } from "react";

export default function ProductCard({ product, setCart }) {
  const [liked, setLiked] = useState(false);

  const toggleWishlist = async (e) => {
    e.stopPropagation();

    const user = auth.currentUser;
    if (!user) {
      alert("Login required");
      return;
    }

    const ref = doc(db, "users", user.uid);

    try {
      if (liked) {
        await updateDoc(ref, {
          wishlist: arrayRemove(product)
        });
        setLiked(false);
      } else {
        await updateDoc(ref, {
          wishlist: arrayUnion(product)
        });
        setLiked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = (e) => {
    e.stopPropagation();

    if ((product.stock ?? 0) <= 0) {
      alert("Out of stock ❌");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: (i.qty || 1) + 1 }
            : i
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  return (
    <div style={card}>

      {/* ❤️ WISHLIST */}
      <div style={heart} onClick={toggleWishlist}>
        {liked ? "❤️" : "🤍"}
      </div>

      <img src={product.image} style={img} />

      <h3 style={name}>{product.name}</h3>
      <p style={price}>₹{product.price}</p>

      <button style={btn} onClick={addToCart}>
        Add to Cart
      </button>

    </div>
  );
}

/* styles same as before */
