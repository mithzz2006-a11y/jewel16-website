export default function ProductDetail({ product, setCart, setPage }) {

  if (!product) {
    return <div style={{ padding: 20 }}>Product not found</div>;
  }

  const addToCart = () => {
    if ((product.stock ?? 0) <= 0) {
      alert("Out of stock ❌");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);

      if (existing) {
        if (existing.qty >= product.stock) {
          alert("Stock limit reached ⚠️");
          return prev;
        }

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
    <div style={container}>

      <button onClick={() => setPage("products")}>
        ← Back
      </button>

      <img src={product.image} style={img} />

      <h2>{product.name}</h2>

      <p style={price}>₹{product.price}</p>

      <p>Stock: {product.stock ?? 0}</p>

      <button style={btn} onClick={addToCart}>
        Add to Cart
      </button>

    </div>
  );
}

const container = { padding: 20, textAlign: "center" };
const img = { width: "100%", height: 250, objectFit: "cover" };
const price = { color: "maroon", fontWeight: "bold" };
const btn = { padding: 12, marginTop: 10 };
