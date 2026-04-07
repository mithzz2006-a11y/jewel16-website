export default function Cart({ cart, setCart }) {

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ background: "#0a0a0a", color: "white", minHeight: "100vh", padding: "40px" }}>
      
      <h1 style={{ color: "maroon" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          {cart.map((item, index) => (
            <div key={index} style={{ marginBottom: "20px", background: "#111", padding: "20px" }}>
              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>

              <button 
                onClick={() => removeItem(index)}
                style={{ background: "red", color: "white", border: "none", padding: "5px 10px" }}
              >
                Remove
              </button>
            </div>
          ))}

          <h2>Total: ₹ {total}</h2>
        </div>
      )}

    </div>
  );
}