const products = [
  {
    id: 1,
    name: "Gold Ring",
    price: 500,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Necklace",
    price: 1200,
    image: "https://via.placeholder.com/150"
  },
];

export default function Products({ setCart }) {
  return (
    <div style={grid}>
      {products.map((p) => (
        <div key={p.id} style={card}>
          <img src={p.image} width="100%" />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>

          <button
            onClick={() => setCart((prev) => [...prev, p])}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
  gap: "20px",
  padding: "20px",
};

const card = {
  border: "1px solid #ddd",
  padding: "15px",
  textAlign: "center",
};
