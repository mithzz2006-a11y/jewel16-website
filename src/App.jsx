import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

import Navbar from "./components/Navbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const ADMIN_EMAIL = "mithzz2006@gmail.com";

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
  }, []);

  if (!user) return <Auth setUser={setUser} />;

  return (
    <div>
      <Navbar setPage={setPage} cart={cart} user={user} />

      {page === "home" && <Home setPage={setPage} />}

      {page === "products" && (
        <Products
          setCart={setCart}
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {page === "detail" && (
        <ProductDetail
          product={selectedProduct}
          setCart={setCart}
          setPage={setPage}
        />
      )}

      {page === "cart" && <Cart cart={cart} setPage={setPage} />}
      {page === "checkout" && <Checkout cart={cart} user={user} />}
      {page === "orders" && <MyOrders user={user} />}
      {page === "profile" && <Profile user={user} />}

      {page === "admin" && user.email === ADMIN_EMAIL && <Admin />}
    </div>
  );
}
