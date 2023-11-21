/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../Components/ProductCard";
import DiscountProdCard from "../../../Components/DiscountProdCard";
import { Link } from "react-router-dom";

const Discount = () => {
  const { data: categories } = useQuery({
    queryKey: ["discountProduct"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/categoriy");
      const data = await res.json();
      return data.data;
    },
  });
  return (
    <div className="w-[90%] md:w-[80%] mx-auto  min-h-screen">
      {categories?.map((cat) =>
        cat?.products?.map(
          (pro) =>
            pro.discount >= 1 && (
              <>
                <h1 className="text-2xl sm:text-2xl font-extrabold mb-5">
                  <span className="text-rose-700 font-extrabold">I</span>{" "}
                  Discount{" "}
                  <h1 className="ml-3 mb-4 text-xl font-normal">Products</h1>
                </h1>
                <div>
                  {categories?.map((categorie) => (
                    <div key={categorie._id}>
                      {categorie?.products?.map((product) => (
                        <div key={product._id}>
                          {product.discount >= 1 && (
                            <Link
                              key={product._id}
                              to={`/categoriy/${categorie._id}/${product._id}`}
                            >
                              <DiscountProdCard products={product} />
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </>
            )
        )
      )}
    </div>
  );
};

export default Discount;
