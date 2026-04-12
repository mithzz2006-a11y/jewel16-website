export default function ProductDetails({
  product,
  setPage,
  cart,
  setCart
}) {
  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">

      <button onClick={() => setPage("products")}>
        ← Back
      </button>

      <div style={wrapper}>

        {/* IMAGE */}
        <img src={product.image} style={image} />

        {/* DETAILS */}
        <div>
          <h1>{product.name}</h1>
          <h2>₹{product.price}</h2>

          <p style={{ marginTop: "10px" }}>
            Premium quality jewelry crafted for elegance and luxury.
          </p>

          <button
            onClick={() => setCart([...cart, product])}
            style={{ marginTop: "20px" }}
          >
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

/* 💎 STYLE */
const wrapper = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "40px",
  marginTop: "30px"
};

const image = {
  width: "100%",
  maxHeight: "400px",
  objectFit: "cover"
};
