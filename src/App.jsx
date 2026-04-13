import { useState } from "react";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  const [page, setPage] = useState("home");
  const [cart, setCart] = useState([]);

  return (
    <>
      <nav>
        <h1>JEWEL16 💎</h1>
        <div>
          <button onClick={() => setPage("home")}>Home</button>
          <button onClick={() => setPage("products")}>Products</button>
          <button onClick={() => setPage("cart")}>
            Cart ({cart.length})
          </button>
        </div>
      </nav>

      {page === "home" && <Home />}
      {page === "products" && (
        <Products cart={cart} setCart={setCart} />
      )}
      {page === "cart" && (
        <Cart cart={cart} setPage={setPage} />
      )}
      {page === "checkout" && <Checkout cart={cart} />}
    </>
  );
}

export default App;
