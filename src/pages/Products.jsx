import { useState } from "react";

export default function Products({ cart, setCart }) {
  const [addedIndex, setAddedIndex] = useState(null);

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

  const addToCart = (item, index) => {
    setCart([...cart, item]);
    setAddedIndex(index);

    setTimeout(() => setAddedIndex(null), 1500);
  };

  return (
    <div className="container">

      <h1 style={{ marginBottom: "20px" }}>Collection</h1>

      <div className="grid">

        {products.map((item, index) => (
          <div key={index} style={card}>

            {/* IMAGE */}
            <div style={imgWrapper}>
              <img src={item.image} alt={item.name} style={img} />
            </div>

            {/* DETAILS */}
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            {/* BUTTON */}
            <button onClick={() => addToCart(item, index)}>
              {addedIndex === index ? "Added ✓" : "Add to Cart"}
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

/* 💎 STYLES */

const card = {
  border: "2px solid black",
  padding: "15px",
  textAlign: "center",
  background: "#fff",
  transition: "0.3s"
};

const imgWrapper = {
  width: "100%",
  height: "200px",
  overflow: "hidden",
  marginBottom: "10px"
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "0.4s"
};
