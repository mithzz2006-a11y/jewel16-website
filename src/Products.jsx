import { useState } from "react";

export default function Products() {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: "Gold Necklace", price: 50000 },
    { id: 2, name: "Diamond Ring", price: 75000 },
    { id: 3, name: "Earrings", price: 20000 },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(item.name + " added to cart");
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", minHeight: "100vh", padding: "40px" }}>
      
      <h1 style={{ color: "maroon" }}>Products</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {products.map((p) => (
          <div key={p.id} style={{ background: "#111", padding: "20px", width: "200px" }}>
            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>

            <button 
              onClick={() => addToCart(p)}
              style={{
                marginTop: "10px",
                padding: "8px 15px",
                background: "maroon",
                color: "white",
                border: "none",
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>
        Cart Items: {cart.length}
      </h2>

    </div>
  );
}