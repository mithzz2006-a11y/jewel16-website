export default function Products({ cart, setCart }) {
  const products = [
    { name: "Necklace", price: 459 },
    { name: "Ring", price: 359 },
    { name: "Bracelet", price: 469 }
  ];

  return (
    <div>
      <h1>Collection</h1>

      <div style={grid}>
        {products.map((item, i) => (
          <div key={i} style={card}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <button
              onClick={() => setCart([...cart, item])}
              style={btn}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "30px",
  marginTop: "30px"
};

const card = {
  padding: "20px",
  border: "2px solid black",
  textAlign: "center",
  background: "#fff"
};

const btn = {
  marginTop: "10px",
  padding: "10px",
  border: "1px solid black",
  background: "#fff",
  color: "maroon",
  cursor: "pointer"
};
