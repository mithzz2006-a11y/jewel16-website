import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Products({
  setPage,
  setSelectedProduct,
  cart,
  setCart,
}) {
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
      <h2>Our Collection</h2>

      <div style={grid}>
        {products.map(p => (
          <div key={p.id} style={card}>

            <div onClick={() => {
              setSelectedProduct(p);
              setPage("productDetails");
            }}>
              <img src={p.image} style={img} />
              <h3>{p.name}</h3>
            </div>

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
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "20px",
};

const card = {
  border: "1px solid #eee",
  padding: "15px",
};

const img = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
};
