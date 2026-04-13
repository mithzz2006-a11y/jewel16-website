export default function ProductDetails({ product, setCart, cart, setPage }) {
  if (!product) return <h2>No product</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <img src={product.image} width="300" />

      <h2>{product.name}</h2>
      <p>₹{product.price}</p>

      <button onClick={() => setCart([...cart, product])}>
        Add to Cart
      </button>

      <button onClick={() => setPage("checkout")}>
        Buy Now
      </button>
    </div>
  );
}
