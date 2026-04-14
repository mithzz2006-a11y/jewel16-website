import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const addProduct = async () => {
    await addDoc(collection(db, "products"), {
      name,
      price: Number(price),
      image,
    });

    alert("Product Added ✅");
    setName("");
    setPrice("");
    setImage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Panel 🔐</h1>

      <input placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <input placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
      <br />
      <input placeholder="Image URL" value={image} onChange={(e) => setImage(e.target.value)} />

      <br />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}
