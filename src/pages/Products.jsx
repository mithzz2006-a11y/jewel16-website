import ProductCard from "../components/ProductCard";

export default function Products({ products, setCart }) {
  return (
    <div style={grid}>
      {products?.map((p) => (
        <ProductCard key={p.id} product={p} setCart={setCart} />
      ))}
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  padding: "20px",
};
