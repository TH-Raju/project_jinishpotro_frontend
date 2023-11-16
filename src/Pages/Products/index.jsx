/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { ContextData } from "../../Context";
import { useQuery } from "@tanstack/react-query";
import Categoriy from "../../Components/Categoriy";

const Products = () => {
  const { count, selectedOptions, siteName } = useContext(ContextData);
  const { data: categories } = useQuery({
    queryKey: ["categoriesProduct"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/categoriy");
      const data = await res.json();
      return data.data;
    },
  });

  let categorieData = categories?.map((categorie) => categorie.name);
  // console.log(categorieData);
  // console.log(selectedOptions);

  const filteredData = categories?.filter((item) =>
    selectedOptions.includes(item.name)
  );
  // console.log(filteredData);

  return (
    <div>
      Products from {count}
      <div>
        <strong>Selected Options:</strong> {selectedOptions.join(", ")}
      </div>
      <div>
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold my-4">
            Product <span className="text-rose-700 ">Categories</span>
          </h1>
          <p className="w-[80%] lg:w-[60%] mx-auto">
            "Discover endless possibilities at{" "}
            <span className="text-rose-700">{siteName}</span> Our diverse range
            of products ensures there's something for everyone. From electronics
            to fashion, home essentials to gadgets – explore it all in one
            place. Shop convenience, shop variety with us!"
          </p>
        </div>
        <div>
          {/* <h1>Products {categories.length}</h1> */}

          <div>
            {filteredData.length > 0 ? (
              <>
                {filteredData?.map((categorie) => (
                  <Categoriy key={categorie._id} categoriy={categorie} />
                ))}
              </>
            ) : (
              <>
                {categories?.map((categorie) => (
                  <Categoriy key={categorie._id} categoriy={categorie} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
