export default function Cart({ cart, setCart, setPage }) {

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ background: "#0a0a0a", color: "white", padding: "40px" }}>
      
      <h1 style={{ color: "maroon" }}>Cart</h1>

      <button onClick={() => setPage("products")}>
        Back to Products
      </button>

      {cart.length === 0 ? (
        <p>No items</p>
      ) : (
        <>
          {cart.map((item, index) => (
            <div key={index}>
              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>
              <button onClick={() => removeItem(index)}>Remove</button>
            </div>
          ))}

          <h2>Total: ₹ {total}</h2>
        </>
      )}

    </div>
  );
}
