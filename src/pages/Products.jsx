import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Products({ setPage, setSelectedProduct, cart, setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "products"));
      setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      <div style={grid}>
        {products.map(p => (
          <div key={p.id} style={card}>
            <img src={p.image} style={{ width: "100%" }} />

            <h3 onClick={() => {
              setSelectedProduct(p);
              setPage("productDetails");
            }}>
              {p.name}
            </h3>

            <p>₹{p.price}</p>

            <button onClick={() => setCart([...cart, p])}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px"
};

const card = {
  border: "1px solid #ddd",
  padding: "10px"
};
