export default function ProductCard({ product, setCart }) {
  return (
    <div style={card}>
      <img src={product.image} style={img} />

      <h3>{product.name}</h3>
      <p style={{ color: "maroon", fontWeight: "bold" }}>
        ₹{product.price}
      </p>

      <button
        style={btn}
        onClick={() => setCart((prev) => [...prev, product])}
      >
        Add to Cart
      </button>
    </div>
  );
}

const card = {
  border: "1px solid #eee",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center",
  transition: "0.3s",
  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
};

const img = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "10px",
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  width: "100%",
  background: "black",
  color: "white",
  border: "none",
  borderRadius: "5px",
};
