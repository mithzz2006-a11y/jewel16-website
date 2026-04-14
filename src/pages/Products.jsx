import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Gold Ring",
    price: 500,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0"
  },
  {
    id: 2,
    name: "Diamond Necklace",
    price: 2000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f"
  },
  {
    id: 3,
    name: "Gold Chain",
    price: 1500,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1"
  },
];

export default function Products({ setCart }) {
  return (
    <div style={grid}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} setCart={setCart} />
      ))}
    </div>
  );
}

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
  gap: "20px",
  padding: "20px",
};
