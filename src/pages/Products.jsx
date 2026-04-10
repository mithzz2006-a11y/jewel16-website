export default function Products({ cart, setCart, setPage }) {
  const products = [
    { name: "Necklace", price: 459 },
    { name: "Ring", price: 359 },
    { name: "Bracelet", price: 469 }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", padding: "40px" }}>
      <h1 style={{ marginBottom: "10px" }}>Products</h1>

      <button
        onClick={() => setPage("cart")}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          background: "white",
          color: "black",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        Go to Cart ({cart.length})
      </button>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          marginTop: "20px"
        }}
      >
        {products.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gold",
              padding: "20px",
              borderRadius: "10px",
              background: "#111",
              textAlign: "center",
              transition: "transform 0.3s, box-shadow 0.3s",
              boxShadow: "0 0 10px rgba(255, 215, 0, 0.2)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 20px gold";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 0 10px rgba(255, 215, 0, 0.2)";
            }}
          >
            <h3>{item.name}</h3>
            <p style={{ color: "gold", fontSize: "18px" }}>₹{item.price}</p>

            <button
              onClick={() => addToCart(item)}
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "gold",
                color: "black",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
