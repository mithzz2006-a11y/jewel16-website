import ProductCard from "../components/ProductCard";

export default function Products({ products, setCart, setPage, setSelectedProduct }) {
  return (
    <div style={grid}>
      {products?.map((p) => (
        <div
          key={p.id}
          onClick={() => {
            setSelectedProduct(p);
            setPage("detail");
          }}
        >
          <ProductCard product={p} setCart={setCart} />
        </div>
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
