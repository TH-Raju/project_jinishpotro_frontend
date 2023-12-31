import { useContext } from "react";
import { ContextData } from "../../../Context";
import { useQuery } from "@tanstack/react-query";
import Categoriy from "../../../Components/Categoriy";

/* eslint-disable react/no-unescaped-entities */
const HomeProducts = () => {
  const { siteName } = useContext(ContextData);

  const { data: categories } = useQuery({
    queryKey: ["categoriy"],
    queryFn: async () => {
      const res = await fetch(
        "https://jinishpotro-backend-5zxijrpet-th-raju.vercel.app/api/v1/categoriy"
      );
      const data = await res.json();
      return data.data;
    },
  });

  //   console.log(categories);
  return (
    <div>
      <div className="text-center mt-20">
        <h1 className="text-3xl sm:text-5xl font-extrabold my-4">
          Categories <span className="text-rose-700 "> Product</span>
        </h1>
        <p className="w-[80%] lg:w-[60%] mx-auto">
          "Discover endless possibilities at{" "}
          <span className="text-rose-700">{siteName}</span> Our diverse range of
          products ensures there's something for everyone. From electronics to
          fashion, home essentials to gadgets – explore it all in one place.
          Shop convenience, shop variety with us!"
        </p>
      </div>
      <div>
        {/* <h1>Products {categories.length}</h1> */}

        <div>
          {categories?.map((categorie) => (
            <Categoriy
              key={categorie._id}
              categoriy={categorie}
              categoryId={categorie._id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;
