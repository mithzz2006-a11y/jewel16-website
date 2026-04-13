import { useState } from "react";

export default function ProductDetails({ product, setPage, cart, setCart }) {
  const [qty, setQty] = useState(1);

  if (!product) {
    return <h2 style={{ padding: "20px" }}>Product not found</h2>;
  }

  const addToCart = () => {
    const items = Array(qty).fill(product);
    setCart([...cart, ...items]);
    alert("Added to cart ✅");
  };

  const buyNow = () => {
    addToCart();
    setPage("checkout");
  };

  return (
    <div style={container}>
      
      {/* LEFT IMAGE */}
      <div style={left}>
        <img src={product.image} alt={product.name} style={img} />
      </div>

      {/* RIGHT DETAILS */}
      <div style={right}>
        <h2 style={title}>{product.name}</h2>

        <p style={price}>₹{product.price}</p>

        <p style={desc}>
          Premium quality jewellery crafted with elegance and precision.
        </p>

        {/* QUANTITY */}
        <div style={qtyBox}>
          <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>

        {/* BUTTONS */}
        <button style={cartBtn} onClick={addToCart}>
          Add to Cart
        </button>

        <button style={buyBtn} onClick={buyNow}>
          Buy Now
        </button>
      </div>
    </div>
  );
}

/* 💎 STYLES */

const container = {
  display: "flex",
  flexWrap: "wrap",
  gap: "30px",
  padding: "30px",
};

const left = {
  flex: "1",
  minWidth: "300px",
};

const img = {
  width: "100%",
  border: "1px solid #eee",
};

const right = {
  flex: "1",
  minWidth: "300px",
};

const title = {
  fontSize: "24px",
  marginBottom: "10px",
};

const price = {
  fontSize: "20px",
  color: "maroon",
  marginBottom: "10px",
};

const desc = {
  marginBottom: "20px",
  color: "#555",
};

const qtyBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
};

const cartBtn = {
  width: "100%",
  marginBottom: "10px",
};

const buyBtn = {
  width: "100%",
  background: "black",
  color: "white",
};
