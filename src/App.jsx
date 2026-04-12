import { useState } from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

export default function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>

      {/* NAVBAR */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px",
        background: "#111",
        color: "white"
      }}>
        <h2>JEWEL16 💎</h2>

        <div>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
        </div>
      </div>

      {/* PAGES */}
      {page === "home" && <Home setPage={setPage} />}
      {page === "products" && (
        <Products cart={cart} setCart={setCart} />
      )}
      {page === "cart" && (
        <Cart cart={cart} setPage={setPage} />
      )}
      {page === "checkout" && (
        <Checkout cart={cart} total={total} />
      )}

    </div>
  );
}
