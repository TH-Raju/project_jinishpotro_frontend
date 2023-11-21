/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { ContextData } from "../../../Context";
import { useQuery } from "@tanstack/react-query";
import Categoriy from "../../../Components/Categoriy";
import { Link } from "react-router-dom";

const AllCategoriys = () => {
  const { siteName } = useContext(ContextData);

  const { data: categories } = useQuery({
    queryKey: ["categoriyy"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/categoriy");
      const data = await res.json();
      return data.data;
    },
  });

  //   console.log(categories);
  return (
    <div className="w-[90%] md:w-[80%] mx-auto py-5">
      <div className="text-center mt-20">
        <h1 className="text-3xl sm:text-5xl font-extrabold my-4">
          All <span className="text-rose-700 "> Categories</span>
        </h1>
      </div>
      <div>
        <div className="grid grid-cols-3  gap-3 justify-center">
          {categories?.map((categorie) => (
            <Link to={`/categoriy/${categorie._id}`} key={categorie._id}>
              <div className="card py-3 shadow-xl lg:border-none border border-sky-400">
                <figure className="">
                  <img
                    src={categorie.photo}
                    alt="Shoes"
                    className="rounded-xl h-20 w-fit bg-cover"
                  />
                </figure>
                <div className="my-3 items-center text-center">
                  <h2 className="font-bold w-[90%] mx-auto">
                    {categorie.name}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllCategoriys;
