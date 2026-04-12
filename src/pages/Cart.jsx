import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Cart({ cart, setCart, setPage, user }) {

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    if (!user) {
      alert("Login first");
      setPage("auth");
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        userEmail: user.email,
        items: cart,
        total,
        status: "Pending",
        date: new Date().toISOString()
      });

      alert("Order placed successfully 🎉");
      setCart([]);
      setPage("orders");

    } catch (err) {
      console.error(err);
      alert("Error placing order ❌");
    }
  };

  return (
    <div style={container}>
      <h1 style={title}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={{ color: "#aaa" }}>Cart is empty</p>
      ) : (
        <>
          {cart.map((item, i) => (
            <div key={i} style={itemCard}>
              {item.name} - ₹{item.price}
            </div>
          ))}

          <h3 style={totalStyle}>Total: ₹{total}</h3>

          <button onClick={placeOrder} style={btn}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

/* 💎 STYLES */

const container = {
  background: "#000",          // 🔥 BLACK BACKGROUND
  minHeight: "80vh",
  padding: "40px",
  color: "white"
};

const title = {
  color: "maroon",
  marginBottom: "20px"
};

const itemCard = {
  padding: "15px",
  marginBottom: "10px",
  border: "1px solid maroon",
  background: "#111",
  borderRadius: "6px"
};

const totalStyle = {
  marginTop: "20px",
  color: "white"
};

const btn = {
  marginTop: "20px",
  padding: "12px 20px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  borderRadius: "6px"
};
