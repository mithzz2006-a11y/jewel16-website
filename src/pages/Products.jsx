export default function Products({ cart, setCart }) {
  const products = [
    { name: "Necklace", price: 459 },
    { name: "Ring", price: 359 },
    { name: "Bracelet", price: 469 }
  ];

  return (
    <div className="container">
      <h1>Collection</h1>

      <div className="grid">
        {products.map((item, i) => (
          <div key={i} className="card">
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <button onClick={() => setCart([...cart, item])}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
