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
  gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
  gap: "15px",
  padding: "15px",
};
