import { useState } from "react";

export default function Products({ cart, setCart }) { 
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: " Necklace", price: 549 },
    { id: 2, name: " Ring", price: 449 },
    { id: 3, name: "Earrings", price: 449 },
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);
    alert(item.name + " added to cart");
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", minHeight: "100vh", padding: "40px" }}>
      
      <h1 style={{ color: "maroon" }}>Products</h1>
      
      <button 
        onClick={() => window.location.href="/cart"}
        style={{ marginBottom: "20px", padding: "10px", background: "maroon", color: "white", border: "none" }}
>
  Go to Cart
</button>

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