/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { useContext } from "react";
import { ContextData } from "../../Context";

const Categoriy = ({ categoriy }) => {
  const { name, title, products } = categoriy;
  const { theme } = useContext(ContextData);
  let arr = [];

  return (
    <div className="w-[80%] mx-auto my-20">
      <h1 className="text-2xl sm:text-2xl font-extrabold mb-5">
        <span className="text-rose-700 font-extrabold">I</span> {name}{" "}
        <h1 className="ml-3 mb-4 text-xl font-normal">{title}</h1>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5 gap-6 ">
        {products?.slice(0, 3).map((product) => (
          <ProductCard key={product._id} products={product} />
        ))}
        <Link className="card card-compact w-52 bg-base-100 shadow-xl border border-blue-200 p-2 flex justify-center items-center text-black">
          <h2 className="card-title text-5xl">+</h2>
          <h2 className="card-title text-2xl opacity-20">See More Items</h2>
        </Link>
      </div>
    </div>
  );
};

export default Categoriy;
