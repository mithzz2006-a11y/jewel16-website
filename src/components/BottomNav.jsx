export default function BottomNav({ setPage, cart }) {
  return (
    <div style={nav}>

      <div style={item} onClick={() => setPage("home")}>
        <span>🏠</span>
        <p>Home</p>
      </div>

      <div style={item} onClick={() => setPage("products")}>
        <span>🛍</span>
        <p>Shop</p>
      </div>

      <div style={item} onClick={() => setPage("cart")}>
        <span>🛒</span>
        <p>Cart ({cart?.length || 0})</p>
      </div>

    </div>
  );
}

/* 🎨 APP STYLE NAVBAR */

const nav = {
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: "65px",
  background: "white",
  borderTop: "1px solid #eee",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  zIndex: 2000,
  boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
};

const item = {
  textAlign: "center",
  fontSize: "12px",
  cursor: "pointer",
};
