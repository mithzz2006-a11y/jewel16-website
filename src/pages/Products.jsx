import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const snap = await getDocs(collection(db, "products"));
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
    }
    fetchData();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={container}>
      <h2 style={title}>Our Collection</h2>

      <div style={grid}>
        {products.map((p) => (
          <div key={p.id} style={card}>
            
            <div style={imgBox}>
              <img src={p.image} alt={p.name} style={img} />
            </div>

            <h3 style={name}>{p.name}</h3>

            <p style={price}>₹{p.price}</p>

            <button style={btn} onClick={() => addToCart(p)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 💎 STYLES */

const container = {
  padding: "20px",
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
  color: "maroon",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "20px",
};

const card = {
  border: "1px solid #eee",
  padding: "15px",
  background: "white",
  transition: "0.3s",
  cursor: "pointer",
};

const imgBox = {
  height: "200px",
  overflow: "hidden",
};

const img = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "0.3s",
};

const name = {
  fontSize: "16px",
  margin: "10px 0",
};

const price = {
  fontWeight: "bold",
  color: "maroon",
};

const btn = {
  marginTop: "10px",
  width: "100%",
};
