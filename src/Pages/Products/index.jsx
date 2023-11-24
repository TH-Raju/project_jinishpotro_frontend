/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { ContextData } from "../../Context";
import { useQuery } from "@tanstack/react-query";
import ProductCategoriy from "../../Components/ProductCategoriy";
import useTitle from "../../Shared/UseTitle";

const Products = () => {
  const {
    count,
    setCount,
    maxCount,
    setMinCount,
    setMaxCount,
    selectedOptions,
    siteName,
  } = useContext(ContextData);
  const { data: categories } = useQuery({
    queryKey: ["categoriesProduct"],
    queryFn: async () => {
      const res = await fetch(
        "https://jinishpotro-backend-5zxijrpet-th-raju.vercel.app/api/v1/categoriy"
      );
      const data = await res.json();
      return data.data;
    },
  });
  useTitle("Products");
  // Initialize max and min variables
  let maxPrice = -Infinity;
  let minPrice = Infinity;
  categories?.forEach((category) => {
    category.products.forEach((product) => {
      const price = product.price;

      // Update max and min values
      if (price > maxPrice) {
        maxPrice = price;
      }

      if (price < minPrice) {
        minPrice = price;
      }
    });
  });

  // console.log(maxPrice);
  // console.log(minPrice);
  setMaxCount(maxPrice);
  setMinCount(minPrice);
  // setCount(minPrice);

  let categorieData = categories?.map((categorie) => categorie.name);
  // console.log(categorieData);
  // console.log(selectedOptions);

  const filteredData = categories?.filter((item) =>
    selectedOptions?.includes(item.name)
  );
  // console.log(filteredData);

  // Filter the data based on the price range
  const filteredPriceData = categories?.reduce((result, category) => {
    const filteredProducts = category.products.filter((product) => {
      const price = product.price;
      // console.log("price", price);
      // console.log("min", minPrice);
      // console.log("max", maxPrice);
      // console.log("count", count);

      // return price >= minPrice && price <= maxPrice;
      return price <= count;
    });

    if (filteredProducts.length > 0) {
      result.push({
        ...category,
        products: filteredProducts,
      });
    }

    return result;
  }, []);

  // Display the filtered data
  // console.log(filteredPriceData);

  return (
    <div>
      {/* Products from {count}
      <div>
        <strong>Selected Options:</strong> {selectedOptions.join(", ")}
      </div> */}
      <div>
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold my-4">
            {siteName} <span className="text-rose-700 ">Products</span>
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
            {filteredData?.length > 0 || filteredPriceData?.length > 0 ? (
              <>
                {filteredData?.map((categorie) => (
                  <ProductCategoriy key={categorie._id} categoriy={categorie} />
                ))}
                {filteredPriceData?.map((categorie) => (
                  <ProductCategoriy key={categorie._id} categoriy={categorie} />
                ))}
              </>
            ) : (
              <>
                {categories?.map((categorie) => (
                  <ProductCategoriy key={categorie._id} categoriy={categorie} />
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
