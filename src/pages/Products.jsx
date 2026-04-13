const products = [
  {
    name: "Gold Ring",
    price: 359,
    image: "https://via.placeholder.com/150"
  }
];

export default function Products({ cart, setCart }) {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      {products.map((p, i) => (
        <div key={i}>
          <img src={p.image} width="100" />
          <h3>{p.name}</h3>
          <p>₹{p.price}</p>

          <button onClick={() => setCart([...cart, p])}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
