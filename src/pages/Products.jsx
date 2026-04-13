import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Products({ cart, setCart, setPage }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, "products"));
      setProducts(snap.docs.map(doc => doc.data()));
    };
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      {products.map((p, i) => (
        <div key={i}>
          <img src={p.image} width="120" />
          <p>{p.name}</p>
          <p>₹{p.price}</p>

          <button onClick={() => setCart([...cart, p])}>
            Add to Cart
          </button>
        </div>
      ))}

      <button onClick={() => setPage("cart")}>Go to Cart</button>
    </div>
  );
}
