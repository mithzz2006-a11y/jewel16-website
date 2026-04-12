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

  const addToCart = () => {
    setCart([...cart, { ...product, qty }]);
    alert("Added to cart ✅");
  };

  const buyNow = () => {
    setCheckoutItem({ ...product, qty });
    setPage("checkout");
  };

  return (
    <div className="container">

      <button onClick={() => setPage("products")}>← Back</button>

      <div style={wrapper}>

        <img src={product.image} style={image} />

        <div>
          <h1>{product.name}</h1>
          <h2>₹{product.price}</h2>

          {/* 🔢 QUANTITY */}
          <div style={{ marginTop: "10px" }}>
            <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
            <span style={{ margin: "0 10px" }}>{qty}</span>
            <button onClick={() => setQty(qty + 1)}>+</button>
          </div>

          <button onClick={addToCart} style={{ marginTop: "15px" }}>
            Add to Cart
          </button>

          <button onClick={buyNow} style={{ marginTop: "10px" }}>
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}

const wrapper = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "30px",
  marginTop: "20px"
};

const image = {
  width: "100%",
  maxHeight: "400px",
  objectFit: "cover"
};
