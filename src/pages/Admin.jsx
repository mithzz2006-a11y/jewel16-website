import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

export default function Admin({ setPage }) {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  // 🔐 STRICT ADMIN CHECK
  if (!auth.currentUser || auth.currentUser.email !== "mithzz2006@email.com") {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h1>Access Denied ❌</h1>
      </div>
    );
  }

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  const loadProducts = async () => {
    const snap = await getDocs(collection(db, "products"));
    setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const loadOrders = async () => {
    const snap = await getDocs(collection(db, "orders"));
    setOrders(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const addProduct = async () => {
    await addDoc(collection(db, "products"), {
      ...newProduct,
      price: Number(newProduct.price)
    });

    setNewProduct({ name: "", price: "", image: "" });
    loadProducts();
  };

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    loadProducts();
  };

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
    loadOrders();
  };

  return (
    <div style={{ padding: "20px", background: "black", color: "white" }}>
      <h1 style={{ color: "maroon" }}>Admin Dashboard</h1>

      <button onClick={() => setPage("home")}>Back</button>

      {/* ADD PRODUCT */}
      <h2>Add Product</h2>

      <input
        placeholder="Name"
        value={newProduct.name}
        onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}
      />

      <input
        placeholder="Price"
        value={newProduct.price}
        onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}
      />

      <input
        placeholder="Image URL"
        value={newProduct.image}
        onChange={(e)=>setNewProduct({...newProduct,image:e.target.value})}
      />

      <button onClick={addProduct}>Add</button>

      {/* PRODUCTS */}
      <h2>Products</h2>

      {products.map(p => (
        <div key={p.id}>
          <p>{p.name} - ₹{p.price}</p>
          <button onClick={()=>deleteProduct(p.id)}>Delete</button>
        </div>
      ))}

      {/* ORDERS */}
      <h2>Orders</h2>

      {orders.map(o => (
        <div key={o.id}>
          <p>{o.email}</p>
          <p>₹{o.total}</p>
          <p>Status: {o.status}</p>

          <button onClick={()=>updateStatus(o.id,"Shipped")}>Ship</button>
          <button onClick={()=>updateStatus(o.id,"Delivered")}>Deliver</button>
        </div>
      ))}
    </div>
  );
}
