export default function Products({ cart, setCart, setPage }) {

  const products = [
    { id: 1, name: "Gold Necklace", price: 50000 },
    { id: 2, name: "Diamond Ring", price: 75000 },
    { id: 3, name: "Earrings", price: 20000 },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", padding: "40px" }}>
      
      <h1 style={{ color: "maroon" }}>Products</h1>

      <button 
        onClick={() => setPage("cart")}
        style={{ marginBottom: "20px", padding: "10px", background: "maroon", color: "white", border: "none" }}
      >
        Go to Cart
      </button>

      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((p) => (
          <div key={p.id} style={{ background: "#111", padding: "20px" }}>
            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>

            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
