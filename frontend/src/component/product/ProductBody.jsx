import ProductFilter from "./ProductFilter";
import ProductTitle from "./ProductTitle";

export default function ProductBody() {
  return (
    <div className="ProductBody">
      <ProductTitle />
      <ProductFilter />
    </div>
  );
}
