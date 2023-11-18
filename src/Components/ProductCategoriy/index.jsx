/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { useContext } from "react";
import { ContextData } from "../../Context";

const ProductCategoriy = ({ categoriy }) => {
  const { name, title, products, _id } = categoriy;
  const { theme } = useContext(ContextData);
  let arr = [];

  return (
    <div className="w-[90%] md:w-[80%] mx-auto my-20">
      <h1 className="text-2xl sm:text-2xl font-extrabold mb-5">
        <span className="text-rose-700 font-extrabold">I</span> {name}{" "}
        <h1 className="ml-3 mb-4 text-xl font-normal">{title}</h1>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5 gap-6 ">
        {products?.map((product) => (
          <Link key={product._id} to={`/categoriy/${_id}/${product._id}`}>
            <ProductCard products={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCategoriy;
