import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ContextData } from "../../../Context";
import toast from "react-hot-toast";
import Loading from "../../../Shared/Loading/inde";
import useTitle from "../../../Shared/UseTitle";

const AllProduct = () => {
  const { loading, setLoading } = useContext(ContextData);
  const { data: categories = [], refetch } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await fetch(
        `https://jinishpotro-backend-5zxijrpet-th-raju.vercel.app/api/v1/categoriy/`
      );
      const data = await res.json();

      return data.data;
    },
  });
  let allProduct = [];

  categories.forEach((category) => {
    allProduct.push(
      ...category.products.map((product) => ({
        ...product,
        categoryId: category._id,
      }))
    );
  });
  // console.log(allProduct);

  const delteProduct = (cId, pId) => {
    // console.log(cId);
    // console.log(pId);
    fetch(
      `https://jinishpotro-backend-5zxijrpet-th-raju.vercel.app/api/v1/categoriy/${cId}/products/${pId}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          // console.log(result);
          setLoading(false);
          toast.success("Successfully Delete");
          refetch();
          //   console.log(result);
        }
      });
  };
  useTitle("All Products");

  return (
    <div>
      {loading && <Loading />}
      <div className="w-[80%] lg:w-[90%] mx-auto pt-0 lg:pt-7">
        <div>
          <h2 className="text-3xl text-center md:text-5xl font-bold mb-5 lg:mb-10">
            All <span className="text-rose-700">Products</span>
          </h2>
          <div className="overflow-x-auto">
            <table className="table leading-3">
              <thead className="text-gray-500">
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>View</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {allProduct?.map((order) => (
                  <tr key={order._id} className="hover ">
                    <td className=" ">{order.name}</td>
                    <td className=" ">{order.price}</td>
                    <td className=" ">{order.discount} %</td>
                    <td className=" ">
                      <Link to={`/categoriy/${order.categoryId}/${order._id}`}>
                        <button className="btn btn-xs btn-info ml-2">
                          <EyeIcon className="h-4 w-4 text-white font-bold" />{" "}
                        </button>
                      </Link>
                    </td>
                    <td className=" font-bold">
                      <button
                        className="btn btn-xs btn-error ml-2"
                        onClick={() =>
                          delteProduct(order.categoryId, order._id)
                        }
                      >
                        <TrashIcon className="h-4 w-4 text-white font-bold" />{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
