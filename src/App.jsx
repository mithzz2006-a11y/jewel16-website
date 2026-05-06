import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import PageWrapper from "./components/PageWrapper";
import Loader from "./components/Loader";

/* PAGES */
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";

/* ✅ NEW */
import Success from "./pages/Success";

export default function App() {

  const [page, setPage] = useState("home");

  const [user, setUser] = useState(null);

  const [cart, setCart] = useState([]);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const unsub =
      onAuthStateChanged(
        auth,
        async (u) => {

          if (u) {

            try {

              const ref = doc(
                db,
                "users",
                u.uid
              );

              const snap =
                await getDoc(ref);

              let isAdmin = false;

              if (snap.exists()) {

                if (
                  snap.data().role ===
                  "admin"
                ) {
                  isAdmin = true;
                }

              } else {

                await setDoc(ref, {
                  email: u.email,
                  role: "user",
                });

              }

              setUser({
                ...u,
                isAdmin,
              });

            } catch (err) {

              console.log(
                "Auth error:",
                err
              );

              setUser({
                ...u,
                isAdmin: false,
              });

            }

          } else {

            setUser(null);

          }

          setLoading(false);

        }
      );

    return () => unsub();

  }, []);

  /* 🔥 LOADER */
  if (loading) {
    return <Loader />;
  }

  /* 🔒 LOGIN */
  if (!user) {
    return (
      <Auth setUser={setUser} />
    );
  }

  return (
    <div style={appContainer}>

      {/* 🔥 NAVBAR */}
      <Navbar
        setPage={setPage}
        cart={cart}
        user={user}
      />

      {/* 🔥 CONTENT */}
      <div style={pageWrapper}>

        <PageWrapper>

          {/* 🏠 HOME */}
          {page === "home" && (
            <Home
              setPage={setPage}
            />
          )}

          {/* 🛍 PRODUCTS */}
          {page === "products" && (
            <Products
              setPage={setPage}
              setCart={setCart}
              setSelectedProduct={
                setSelectedProduct
              }
            />
          )}

          {/* 💎 DETAIL */}
          {page === "detail" && (
            <ProductDetail
              product={selectedProduct}
              setCart={setCart}
              setPage={setPage}
            />
          )}

          {/* 🛒 CART */}
          {page === "cart" && (
            <Cart
              cart={cart}
              setPage={setPage}
            />
          )}

          {/* 💳 CHECKOUT */}
          {page === "checkout" && (
            <Checkout
              cart={cart}
              user={user}
              setPage={setPage}
            />
          )}

          {/* ✅ SUCCESS */}
          {page === "success" && (
            <Success
              setPage={setPage}
            />
          )}

          {/* 📦 ORDERS */}
          {page === "orders" && (
            <MyOrders user={user} />
          )}

          {/* 👤 PROFILE */}
          {page === "profile" && (
            <Profile
              user={user}
              setCart={setCart}
              setPage={setPage}
            />
          )}

          {/* 🔐 ADMIN */}
          {page === "admin" &&
            user?.isAdmin && (
              <Admin
                setPage={setPage}
              />
            )}

        </PageWrapper>

      </div>

      {/* 📱 BOTTOM NAV */}
      <BottomNav
        setPage={setPage}
        cart={cart}
      />

    </div>
  );
}

/* 🎨 STYLES */

const appContainer = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "#f5f5f5",
};

const pageWrapper = {
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "10px",
  paddingBottom: "90px",
};
