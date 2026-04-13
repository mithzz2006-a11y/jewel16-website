export default function Products({ cart, setCart }) {

  const products = [
    { name: "Necklace", price: 459, image: "https://via.placeholder.com/300" },
    { name: "Ring", price: 359, image: "https://via.placeholder.com/300" },
    { name: "Bracelet", price: 469, image: "https://via.placeholder.com/300" }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert("Added to cart ✅");
  };

  return (
    <div>
      <h1 style={{ marginBottom: "20px" }}>Products</h1>

      <div style={grid}>
        {products.map((item, index) => (
          <div key={index} style={card}>
            <img src={item.image} style={img} />

            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <button onClick={() => addToCart(item)}>
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
  gap: "25px"
};

const card = {
  padding: "20px",
  border: "1px solid #ddd",
  textAlign: "center",
  background: "white",
  transition: "0.3s"
};

const img = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  marginBottom: "10px"
};
