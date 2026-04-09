export default function Products({ cart, setCart, setPage }) {

  const products = [
    { name: "Diamond Necklace", price: 50000 },
    { name: "Gold Ring", price: 15000 },
    { name: "Silver Bracelet", price: 5000 }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", padding: "40px" }}>
      <h1 style={{ color: "maroon" }}>Products</h1>

      <button
        onClick={() => setPage("cart")}
        style={{
          marginBottom: "20px",
          padding: "10px",
          background: "maroon",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Go to Cart ({cart.length})
      </button>

      {products.map((item, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>

          <button
            onClick={() => addToCart(item)}
            style={{
              padding: "8px",
              background: "gold",
              border: "none",
              cursor: "pointer"
            }}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
