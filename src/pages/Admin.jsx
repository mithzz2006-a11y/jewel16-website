import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

export default function Admin({ setPage }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const user = auth.currentUser;
    if (!user) return setIsAdmin(false);

    const snap = await getDoc(doc(db, "users", user.uid));

    if (snap.exists() && snap.data().role === "admin") {
      setIsAdmin(true);
      loadData();
    } else {
      setIsAdmin(false);
    }
  };

  const loadData = async () => {
    const p = await getDocs(collection(db, "products"));
    setProducts(p.docs.map(d => ({ id: d.id, ...d.data() })));

    const o = await getDocs(collection(db, "orders"));
    setOrders(o.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  if (isAdmin === null) return <h2>Loading...</h2>;
  if (!isAdmin) return <h2>Access Denied ❌</h2>;

  // ➕ ADD / UPDATE PRODUCT
  const saveProduct = async () => {
    if (editId) {
      await updateDoc(doc(db, "products", editId), {
        ...newProduct,
        price: Number(newProduct.price)
      });
      setEditId(null);
    } else {
      await addDoc(collection(db, "products"), {
        ...newProduct,
        price: Number(newProduct.price)
      });
    }

    setNewProduct({ name: "", price: "", image: "" });
    loadData();
  };

  // ✏️ EDIT
  const editProduct = (p) => {
    setNewProduct(p);
    setEditId(p.id);
  };

  // ❌ DELETE
  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, "products", id));
    loadData();
  };

  // 🚚 ORDER STATUS
  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "orders", id), { status });
    loadData();
  };

  return (
    <div style={{ padding: "20px", background: "black", color: "white" }}>
      <h1 style={{ color: "maroon" }}>Admin Dashboard</h1>

      <button onClick={() => setPage("home")}>⬅ Back</button>

      {/* ADD / EDIT PRODUCT */}
      <h2>{editId ? "Edit Product" : "Add Product"}</h2>

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

      {/* IMAGE PREVIEW */}
      {newProduct.image && (
        <img src={newProduct.image} width="120" />
      )}

      <br/>
      <button onClick={saveProduct}>
        {editId ? "Update" : "Add"}
      </button>

      {/* PRODUCTS */}
      <h2 style={{ marginTop: "30px" }}>Products</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
        {products.map(p => (
          <div key={p.id} style={card}>
            <img src={p.image} width="100" />
            <p>{p.name}</p>
            <p>₹{p.price}</p>

            <button onClick={()=>editProduct(p)}>Edit</button>
            <button onClick={()=>deleteProduct(p.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* ORDERS */}
      <h2 style={{ marginTop: "30px" }}>Orders</h2>

      {orders.map(o => (
        <div key={o.id} style={orderCard}>
          <p><b>{o.email}</b></p>
          <p>₹{o.total}</p>
          <p>Status: {o.status}</p>

          <button onClick={()=>updateStatus(o.id,"Processing")}>Processing</button>
          <button onClick={()=>updateStatus(o.id,"Shipped")}>Shipped</button>
          <button onClick={()=>updateStatus(o.id,"Delivered")}>Delivered</button>
        </div>
      ))}
    </div>
  );
}

/* 🔥 STYLES */

const card = {
  border: "1px solid white",
  padding: "10px",
  width: "150px",
  textAlign: "center"
};

const orderCard = {
  border: "1px solid white",
  padding: "10px",
  marginBottom: "10px"
};
