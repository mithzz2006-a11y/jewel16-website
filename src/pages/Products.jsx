import ProductCard from "../components/ProductCard";

export default function Products({ products, setCart }) {
  return (
    <div style={container}>
      
      <h1 style={title}>Our Premium Collection 💎</h1>
      <p style={subtitle}>
        Discover elegance crafted for modern luxury lovers
      </p>

      <div style={grid}>
        {products?.map((p) => (
          <ProductCard key={p.id} product={p} setCart={setCart} />
        ))}
      </div>

    </div>
  );
}

const container = {
  padding: "20px",
  background: "#fff",
  minHeight: "100vh",
};

const title = {
  textAlign: "center",
  color: "maroon",
};

const subtitle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#555",
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
  gap: "15px",
};
