export default function Products({ cart, setCart, setPage, setSelectedProduct }) {
  const products = [
    {
      name: "Diamond Necklace",
      price: 459,
      image: "https://images.unsplash.com/photo-1602752250015-52934bc45613"
    },
    {
      name: "Gold Ring",
      price: 359,
      image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638"
    },
    {
      name: "Silver Bracelet",
      price: 469,
      image: "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0"
    }
  ];

  return (
    <div className="container">
      <h1>Collection</h1>

      <div className="grid">
        {products.map((item, index) => (
          <div
            key={index}
            className="card"
            onClick={() => {
              setSelectedProduct(item);
              setPage("details");
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={item.image} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
