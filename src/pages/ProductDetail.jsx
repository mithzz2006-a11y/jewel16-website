export default function ProductDetail({ product, setCart, setPage }) {
  if (!product) return <h2 style={{ padding: "20px" }}>Product not found</h2>;

  return (
    <div style={container}>
      
      {/* IMAGE */}
      <div style={left}>
        <img src={product.image} style={img} />
      </div>

      {/* DETAILS */}
      <div style={right}>
        <h1 style={title}>{product.name}</h1>

        <p style={price}>₹{product.price}</p>

        <p style={desc}>
          Experience premium quality jewellery crafted with precision and elegance.
        </p>

        <div style={btnBox}>
          <button
            style={cartBtn}
            onClick={() => setCart((prev) => [...prev, product])}
          >
            Add to Cart
          </button>

          <button
            style={buyBtn}
            onClick={() => {
              setCart((prev) => [...prev, product]);
              setPage("checkout");
            }}
          >
            Buy Now
          </button>
        </div>

        <p style={trust}>🔒 Secure Payment | 🚚 Fast Delivery</p>
      </div>

    </div>
  );
}

/* 🎨 STYLES */

const container = {
  display: "flex",
  flexWrap: "wrap",
  gap: "30px",
  padding: "30px",
  minHeight: "100vh",
  background: "#fff",
};

const left = {
  flex: "1 1 300px",
};

const img = {
  width: "100%",
  borderRadius: "10px",
};

const right = {
  flex: "1 1 300px",
};

const title = {
  color: "maroon",
};

const price = {
  fontSize: "24px",
  margin: "10px 0",
};

const desc = {
  color: "#555",
};

const btnBox = {
  display: "flex",
  gap: "10px",
  marginTop: "20px",
  flexWrap: "wrap",
};

const cartBtn = {
  padding: "12px 20px",
  background: "black",
  color: "white",
  border: "none",
};

const buyBtn = {
  padding: "12px 20px",
  background: "maroon",
  color: "white",
  border: "none",
};

const trust = {
  marginTop: "20px",
  color: "green",
};
