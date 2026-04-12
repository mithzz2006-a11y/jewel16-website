import { useState } from "react";

export default function ProductDetails({
  product,
  setPage,
  cart,
  setCart,
  setCheckoutItem
}) {
  const [qty, setQty] = useState(1);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">

      <button onClick={() => setPage("products")}>← Back</button>

      <div style={wrap}>
        <img src={product.image} style={img} />

        <div>
          <h1>{product.name}</h1>
          <h2>₹{product.price}</h2>

          {/* QUANTITY */}
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span style={{ margin: "0 10px" }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={() => {
              setCart([...cart, { ...product, qty }]);
              alert("Added to cart");
            }}
            style={{ marginTop: "10px" }}
          >
            Add to Cart
          </button>

          {/* 🔥 BUY NOW (FIXED) */}
          <button
            onClick={() => {
              const item = { ...product, qty };
              setCheckoutItem(item);   // 👉 IMPORTANT
              setPage("checkout");     // 👉 MUST MATCH APP
            }}
            style={{ marginTop: "10px" }}
          >
            Buy Now
          </button>

        </div>
      </div>
    </div>
  );
}

const wrap = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px"
};

const img = {
  width: "100%",
  height: "300px",
  objectFit: "cover"
};
