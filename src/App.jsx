import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  return (
    <>
      {page === "home" && <Home setPage={setPage} />}
      {page === "products" && <Products cart={cart} setCart={setCart} setPage={setPage} />}
      {page === "cart" && <Cart cart={cart} setCart={setCart} setPage={setPage} />}
    </>
  );
}
