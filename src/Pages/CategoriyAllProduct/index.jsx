/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductCategoriy from "../../Components/ProductCategoriy";
import ProductCard from "../../Components/ProductCard";
import { useContext } from "react";
import { ContextData } from "../../Context";
import useTitle from "../../Shared/UseTitle";

const CategoriyAllProduct = () => {
  const data = useLoaderData();
  const { name, photo, detail, price, sellerName } = data.data;
  const { id } = useParams();
  const { siteName } = useContext(ContextData);
  const { data: categories } = useQuery({
    queryKey: ["singleCategoriyProduct"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/categoriy/${id}`);
      const data = await res.json();
      return data.data;
    },
  });
  useTitle("Categoriy Product")
  // console.log(categories);
  // console.log(data.data);
  // console.log(name);
  return (
    <div className="-mt-5 pt-8 md:pt-4">
      <div className="w-[90%] md:w-[80%] mx-auto md:mt-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold my-4">
            {categories ? categories.name : "Loading..."}
            <span className="text-rose-700 "> Products</span>
          </h1>
        </div>
        <h1 className="text-2xl sm:text-2xl font-extrabold mb-5">
          <span className="text-rose-700 font-extrabold">I</span> {name}{" "}
          <h1 className="ml-3 mb-4 text-xl font-normal">{detail}</h1>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5 gap-7 ">
          {categories?.products?.map((product) => (
            <Link key={product._id} to={`/categoriy/${id}/${product._id}`}>
              <ProductCard products={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriyAllProduct;
