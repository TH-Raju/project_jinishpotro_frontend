import { useContext } from "react";
import { ContextData } from "../../Context";

const Products = () => {
  const { count, selectedOptions } = useContext(ContextData);
  return (
    <div>
      Products from {count}
      <div>
        <strong>Selected Options:</strong> {selectedOptions.join(", ")}
      </div>
    </div>
  );
};

export default Products;
