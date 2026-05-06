import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";

export default function Profile({
  user,
  setCart,
  setPage,
}) {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setWishlist(
          snap.data().wishlist || []
        );
      }
    });

    return () => unsub();
  }, [user]);

  /* ❤️ REMOVE */
  const removeWishlist = async (item) => {
    try {

      const ref = doc(
        db,
        "users",
        user.uid
      );

      await updateDoc(ref, {
        wishlist: arrayRemove(item),
      });

    } catch (err) {
      console.log(err);
    }
  };

  /* 🛒 MOVE TO CART */
  const moveToCart = (item) => {

    setCart((prev = []) => {

      const existing = prev.find(
        (i) => i.id === item.id
      );

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                qty: (i.qty || 1) + 1,
              }
            : i
        );
      }

      return [
        ...prev,
        { ...item, qty: 1 },
      ];
    });

    setPage("cart");
  };

  return (
    <div style={page}>

      {/* 👤 PROFILE CARD */}
      <div style={profileCard}>

        <div style={avatar}>
          💎
        </div>

        <h2 style={title}>
          My Profile
        </h2>

        <p style={email}>
          {user.email}
        </p>

      </div>

      {/* ❤️ WISHLIST */}
      <div style={wishlistSection}>

        <div style={topRow}>
          <h2 style={wishlistTitle}>
            ❤️ Wishlist
          </h2>

          <p style={count}>
            {wishlist.length} Items
          </p>
        </div>

        {wishlist.length === 0 ? (

          <div style={emptyBox}>
            <h3>No Wishlist Items 💔</h3>

            <p style={emptyText}>
              Save your favorite jewellery
              here for later.
            </p>
          </div>

        ) : (

          <div style={grid}>

            {wishlist.map((item, i) => (
              <div
                key={i}
                style={card}
              >

                {/* IMAGE */}
                <div style={imgWrap}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={img}
                  />
                </div>

                {/* CONTENT */}
                <div style={content}>

                  <h3 style={name}>
                    {item.name}
                  </h3>

                  <p style={price}>
                    ₹{item.price}
                  </p>

                  {/* BUTTONS */}
                  <div style={btnRow}>

                    <button
                      style={cartBtn}
                      onClick={() =>
                        moveToCart(item)
                      }
                    >
                      Add to Cart
                    </button>

                    <button
                      style={removeBtn}
                      onClick={() =>
                        removeWishlist(item)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

/* 🎨 PREMIUM MOBILE SAFE STYLES */

const page = {
  minHeight: "100vh",
  background: "#f5f5f5",
  padding: "20px",
};

/* 👤 PROFILE */

const profileCard = {
  background: "white",
  borderRadius: "24px",
  padding: "30px 20px",
  textAlign: "center",
  boxShadow:
    "0 8px 25px rgba(0,0,0,0.08)",
};

const avatar = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background:
    "linear-gradient(to right, #000, maroon)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  color: "white",
  fontSize: "32px",
};

const title = {
  marginTop: "15px",
  fontSize: "28px",
};

const email = {
  color: "#666",
  marginTop: "8px",
  fontSize: "14px",
};

/* ❤️ WISHLIST */

const wishlistSection = {
  marginTop: "30px",
};

const topRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  flexWrap: "wrap",
  gap: "10px",
};

const wishlistTitle = {
  fontSize: "28px",
};

const count = {
  color: "#777",
};

const emptyBox = {
  background: "white",
  padding: "40px 20px",
  borderRadius: "20px",
  textAlign: "center",
};

const emptyText = {
  color: "#666",
  marginTop: "10px",
};

/* 🛍 GRID */

const grid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px,1fr))",
  gap: "20px",
};

/* 💎 CARD */

const card = {
  background: "white",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow:
    "0 8px 25px rgba(0,0,0,0.08)",
};

const imgWrap = {
  height: "220px",
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const content = {
  padding: "15px",
};

const name = {
  fontSize: "16px",
  marginBottom: "6px",
};

const price = {
  color: "maroon",
  fontWeight: "700",
  fontSize: "18px",
};

/* 🔘 BUTTONS */

const btnRow = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
};

const cartBtn = {
  flex: 1,
  border: "none",
  background:
    "linear-gradient(to right, #000, maroon)",
  color: "white",
  padding: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
};

const removeBtn = {
  flex: 1,
  border: "1px solid #ddd",
  background: "white",
  padding: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
};
