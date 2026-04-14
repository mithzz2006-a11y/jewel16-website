export default function Navbar({ setPage, isAdmin }) {
  return (
    <div style={nav}>

      <h2 onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
        JEWEL16 💎
      </h2>

      <div style={links}>
        <button onClick={() => setPage("products")}>Products</button>
        <button onClick={() => setPage("cart")}>Cart</button>
        <button onClick={() => setPage("orders")}>My Orders</button>
        <button onClick={() => setPage("profile")}>Profile</button>

        {isAdmin && (
          <button onClick={() => setPage("admin")}>
            Admin
          </button>
        )}
      </div>

    </div>
  );
}

const nav = {
  display: "flex",
  justifyContent: "space-between",
  padding: "15px",
  background: "black",
  color: "white"
};

const links = {
  display: "flex",
  gap: "10px"
};
