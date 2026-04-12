export default function Products({
  cart,
  setCart,
  setPage,
  setSelectedProduct
}) {
  const products = [
    {
      name: "Diamond Necklace",
      price: 459,
      image: "https://picsum.photos/300/300?1"
    },
    {
      name: "Gold Ring",
      price: 359,
      image: "https://picsum.photos/300/300?2"
    },
    {
      name: "Silver Bracelet",
      price: 469,
      image: "https://picsum.photos/300/300?3"
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
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelectedProduct(item);
              setPage("details");
            }}
          >
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            {/* ADD BUTTON (STOP PROPAGATION) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCart([...cart, item]);
                alert("Added to cart ✅");
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
