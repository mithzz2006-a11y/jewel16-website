import { db, auth } from "../firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

export default function Checkout({ cart, setPage }) {

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("Login required");
      return;
    }

    // 🔥 GET USER PROFILE
    const userSnap = await getDoc(doc(db, "users", user.uid));

    if (!userSnap.exists()) {
      alert("Please complete profile first");
      setPage("profile");
      return;
    }

    const userData = userSnap.data();

    // 🔥 SAVE ORDER
    await addDoc(collection(db, "orders"), {
      email: user.email,
      name: userData.name,
      phone: userData.phone,
      address: userData.address,
      items: cart,
      total,
      status: "Placed",
      createdAt: new Date()
    });

    alert("Order placed successfully ✅");

    setPage("orders");
  };

  return (
    <div style={{ background: "black", color: "white", padding: "20px" }}>
      <h1>Checkout</h1>

      {cart.map((item, i) => (
        <div key={i} style={{ marginBottom: "10px" }}>
          <img src={item.image} width="80" />
          <p>{item.name}</p>
          <p>₹{item.price}</p>
        </div>
      ))}

      <h2>Total: ₹{total}</h2>

      <button
        onClick={placeOrder}
        style={{
          width: "100%",
          padding: "15px",
          background: "maroon",
          color: "white",
          border: "none",
          marginTop: "20px",
          fontWeight: "bold"
        }}
      >
        Place Order
      </button>
    </div>
  );
}
