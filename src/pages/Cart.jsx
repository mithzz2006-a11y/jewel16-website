import toast from "react-hot-toast";

export default function Products({ cart, setCart, setPage }) {
  const products = [
    { name: "Necklace", price: 459 },
    { name: "Ring", price: 359 },
    { name: "Bracelet", price: 469 }
  ];

  const addToCart = (item) => {
    setCart([...cart, item]);

    // 🔥 PREMIUM POPUP
    toast.success(item.name + " added to cart 🛒", {
      style: {
        background: "#111",
        color: "white",
        border: "1px solid maroon"
      }
    });
  };

  return (
    <div style={{ background: "#0a0a0a", color: "white", padding: "40px", minHeight: "100vh" }}>
      
      <h1 style={{ marginBottom: "10px", color: "maroon" }}>Products</h1>

      <button
        onClick={() => setPage("cart")}
        style={{
          marginBottom: "20px",
          padding: "10px 15px",
          background: "maroon",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        Go to Cart ({cart.length})
      </button>

      {/* 🔥 PRODUCT GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          marginTop: "20px"
        }}
      >
        {products.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid maroon",
              padding: "20px",
              borderRadius: "10px",
              background: "#111",
              textAlign: "center",
              transition: "0.3s",
              boxShadow: "0 0 10px rgba(128,0,0,0.5)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 20px maroon";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 10px rgba(128,0,0,0.5)";
            }}
          >
            <h3>{item.name}</h3>
            <p style={{ fontSize: "18px" }}>₹{item.price}</p>

            <button
              onClick={() => addToCart(item)}
              style={{
                marginTop: "10px",
                padding: "10px",
                background: "maroon",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "5px"
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
