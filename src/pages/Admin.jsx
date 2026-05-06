import { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export default function Admin({
  setPage,
}) {

  const [products, setProducts] =
    useState([]);

  const [form, setForm] =
    useState({
      name: "",
      price: "",
      image: "",
      image2: "",
      image3: "",
      stock: "",
    });

  /* 🔥 REALTIME PRODUCTS */
  useEffect(() => {

    const unsub = onSnapshot(
      collection(db, "products"),
      (snap) => {

        const data =
          snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setProducts(data);

      }
    );

    return () => unsub();

  }, []);

  /* ➕ ADD PRODUCT */
  const addProduct = async () => {

    if (
      !form.name ||
      !form.price ||
      !form.stock
    ) {

      alert("Fill all fields");

      return;

    }

    const images = [
      form.image,
      form.image2,
      form.image3,
    ].filter(Boolean);

    await addDoc(
      collection(db, "products"),
      {
        name: form.name,

        price: Number(
          form.price
        ),

        image:
          form.image || "",

        /* 💎 NEW */
        images,

        stock: Number(
          form.stock
        ),

        createdAt:
          new Date(),
      }
    );

    setForm({
      name: "",
      price: "",
      image: "",
      image2: "",
      image3: "",
      stock: "",
    });

    alert("Product added");

  };

  /* ✏️ EDIT */
  const editProduct = async (
    product
  ) => {

    const newName = prompt(
      "Enter new name",
      product.name
    );

    const newPrice = prompt(
      "Enter new price",
      product.price
    );

    const newStock = prompt(
      "Enter stock",
      product.stock
    );

    if (
      !newName ||
      !newPrice ||
      !newStock
    )
      return;

    await updateDoc(
      doc(
        db,
        "products",
        product.id
      ),
      {
        name: newName,

        price:
          Number(newPrice),

        stock:
          Number(newStock),
      }
    );

    alert("Product updated");

  };

  /* 🗑 DELETE */
  const deleteProduct = async (
    id
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) return;

    await deleteDoc(
      doc(db, "products", id)
    );

    alert("Product deleted");

  };

  return (
    <div style={container}>

      <h1 style={title}>
        Admin Dashboard 💎
      </h1>

      <button
        onClick={() =>
          setPage("home")
        }
        style={backBtn}
      >
        ⬅ Back to Home
      </button>

      {/* ➕ ADD PRODUCT */}
      <div style={formBox}>

        <h2 style={formTitle}>
          Add Product
        </h2>

        <input
          placeholder="Product Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name:
                e.target.value,
            })
          }
          style={input}
        />

        <input
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({
              ...form,
              price:
                e.target.value,
            })
          }
          style={input}
        />

        <input
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({
              ...form,
              stock:
                e.target.value,
            })
          }
          style={input}
        />

        {/* 🖼 IMAGES */}
        <input
          placeholder="Main Image URL"
          value={form.image}
          onChange={(e) =>
            setForm({
              ...form,
              image:
                e.target.value,
            })
          }
          style={input}
        />

        <input
          placeholder="Second Image URL"
          value={form.image2}
          onChange={(e) =>
            setForm({
              ...form,
              image2:
                e.target.value,
            })
          }
          style={input}
        />

        <input
          placeholder="Third Image URL"
          value={form.image3}
          onChange={(e) =>
            setForm({
              ...form,
              image3:
                e.target.value,
            })
          }
          style={input}
        />

        <button
          onClick={addProduct}
          style={btn}
        >
          Add Product
        </button>

      </div>

      {/* 📦 PRODUCTS */}
      <div style={grid}>

        {products.map(
          (product) => (

            <div
              key={product.id}
              style={card}
            >

              <img
                src={
                  product.image
                }
                alt=""
                style={img}
              />

              <h3>
                {product.name}
              </h3>

              <p>
                ₹{product.price}
              </p>

              <p style={stock}>
                Stock:
                {" "}
                {product.stock ?? 0}
              </p>

              {product.stock ===
                0 && (
                <p style={out}>
                  Out of Stock
                </p>
              )}

              <div style={btnRow}>

                <button
                  onClick={() =>
                    editProduct(
                      product
                    )
                  }
                  style={editBtn}
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteProduct(
                      product.id
                    )
                  }
                  style={deleteBtn}
                >
                  Delete
                </button>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

/* 🎨 PREMIUM STYLES */

const container = {
  padding: "20px",

  minHeight: "100vh",

  background:
    "linear-gradient(to bottom, #f5f5f5, #ffffff)",
};

const title = {
  color: "maroon",

  fontSize:
    "clamp(28px, 5vw, 42px)",
};

const backBtn = {
  marginBottom: "20px",

  padding: "12px 18px",

  background:
    "linear-gradient(to right, #000, maroon)",

  color: "white",

  border: "none",

  borderRadius: "12px",

  cursor: "pointer",

  fontWeight: "600",
};

const formBox = {
  background:
    "rgba(255,255,255,0.8)",

  backdropFilter:
    "blur(12px)",

  padding: "24px",

  marginBottom: "35px",

  borderRadius: "24px",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
};

const formTitle = {
  marginBottom: "18px",
};

const input = {
  display: "block",

  width: "100%",

  padding: "14px",

  marginBottom: "12px",

  border:
    "1px solid #ddd",

  borderRadius: "14px",

  outline: "none",

  fontSize: "14px",
};

const btn = {
  padding: "14px 18px",

  background:
    "linear-gradient(to right, #2b0000, maroon)",

  color: "white",

  border: "none",

  borderRadius: "14px",

  cursor: "pointer",

  fontWeight: "700",

  width: "100%",
};

const grid = {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px,1fr))",

  gap: "24px",
};

const card = {
  background: "white",

  padding: "16px",

  borderRadius: "22px",

  textAlign: "center",

  boxShadow:
    "0 10px 24px rgba(0,0,0,0.06)",
};

const img = {
  width: "100%",

  height: "180px",

  objectFit: "cover",

  borderRadius: "16px",
};

const stock = {
  fontSize: "13px",

  color: "gray",
};

const out = {
  color: "red",

  fontWeight: "700",
};

const btnRow = {
  display: "flex",

  gap: "10px",

  marginTop: "14px",
};

const editBtn = {
  flex: 1,

  padding: "10px",

  background: "black",

  color: "white",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",
};

const deleteBtn = {
  flex: 1,

  padding: "10px",

  background: "maroon",

  color: "white",

  border: "none",

  borderRadius: "10px",

  cursor: "pointer",
};
