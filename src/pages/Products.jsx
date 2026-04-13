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
      <h1>Products</h1>

      {products.map((item, i) => (
        <div key={i}>
          <img src={item.image} width="100" />
          <p>{item.name}</p>
          <p>₹{item.price}</p>

          <button onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
