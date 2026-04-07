import { useState } from "react";

export default function Products() {
  const products = [
    { id: 1, name: "Gold Necklace", price: 50000 },
    { id: 2, name: "Diamond Ring", price: 75000 },
    { id: 3, name: "Earrings", price: 20000 },
  ];

  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(item.name + " added to cart");
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", minHeight: "100vh", padding: "40px" }}>
      
      <h1 style={{ color: "maroon" }}>Products</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        {products.map((p) => (
          <div key={p.id} style={{ background: "#111", padding: "20px" }}>
            <h3>{p.name}</h3>
            <p>₹ {p.price}</p>
            <button onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: "40px" }}>Cart ({cart.length})</h2>
    </div>
  );
}