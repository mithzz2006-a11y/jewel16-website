import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

export default function Admin({ setPage }) {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    price: "",
    image: ""
  });

  /* 🔥 REAL-TIME PRODUCTS */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(data);
    });

    return () => unsub();
  }, []);

  /* ➕ ADD PRODUCT */
  const addProduct = async () => {
    if (!form.name || !form.price) {
      alert("Fill all fields");
      return;
    }

    await addDoc(collection(db, "products"), {
      name: form.name,
      price: Number(form.price),
      image: form.image || "",
      createdAt: new Date()
    });

    setForm({ name: "", price: "", image: "" });
    alert("Product added");
  };

  /* ✏️ EDIT PRODUCT */
  const editProduct = async (product) => {
    const newName = prompt("Enter new name", product.name);
    const newPrice = prompt("Enter new price", product.price);

    if (!newName || !newPrice) return;

    await updateDoc(doc(db, "products", product.id), {
      name: newName,
      price: Number(newPrice)
    });

    alert("Product updated");
  };

  /* 🗑 DELETE PRODUCT */
  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "products", id));
    alert("Product deleted");
  };

  return (
    <div style={container}>

      <h1 style={title}>Admin Dashboard</h1>

      <button onClick={() => setPage("home")} style={backBtn}>
        ⬅ Back to Home
      </button>

      {/* ➕ ADD PRODUCT */}
      <div style={formBox}>
        <h2>Add Product</h2>

        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          style={input}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          style={input}
        />

        <input
          placeholder="Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({ ...form, image: e.target.value })
          }
          style={input}
        />

        <button onClick={addProduct} style={btn}>
          Add Product
        </button>
      </div>

      {/* 📦 PRODUCT LIST */}
      <div style={grid}>
        {products.map((product) => (
          <div key={product.id} style={card}>

            <img
              src={product.image}
              alt=""
              style={img}
            />

            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => editProduct(product)}
                style={editBtn}
              >
                Edit
              </button>

              <button
                onClick={() => deleteProduct(product.id)}
                style={deleteBtn}
              >
                Delete
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

/* 🎨 STYLES */

const container = {
  padding: "20px",
  background: "white",
  minHeight: "100vh"
};

const title = {
  color: "maroon"
};

const backBtn = {
  marginBottom: "20px",
  padding: "10px",
  background: "black",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const formBox = {
  border: "1px solid #eee",
  padding: "20px",
  marginBottom: "30px",
  borderRadius: "10px"
};

const input = {
  display: "block",
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  border: "1px solid #ccc"
};

const btn = {
  padding: "10px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
  gap: "20px"
};

const card = {
  border: "1px solid #eee",
  padding: "15px",
  borderRadius: "10px",
  textAlign: "center"
};

const img = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "8px"
};

const editBtn = {
  padding: "8px",
  background: "black",
  color: "white",
  border: "none",
  cursor: "pointer"
};

const deleteBtn = {
  padding: "8px",
  background: "maroon",
  color: "white",
  border: "none",
  cursor: "pointer"
};
