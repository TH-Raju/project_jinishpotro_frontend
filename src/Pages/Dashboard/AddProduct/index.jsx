/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../../Context";
import Loading from "../../../Shared/Loading/inde";
import Cookies from "universal-cookie";
import { useQuery } from "@tanstack/react-query";
import useTitle from "../../../Shared/UseTitle";

const AddProduct = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const sellerName = cookies.get("name");
  const sellerId = cookies.get("id");
  const { imgbbAPIKey, loading, setLoading } = useContext(ContextData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddProduct = (data) => {
    data.discount = parseFloat(data.discount);
    data.price = parseInt(data.price);
    // console.log(data);
    setLoading(true);
    const img = data.photo[0];
    const formData = new FormData();
    formData.append("image", img);

    const url = `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          data.photo = imgData?.data.url;

          //save Product

          fetch("http://localhost:5000/api/v1/categoriy/product", {
            method: "PUT",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((result) => {
              setLoading(false);
              toast.success("Product Added");
              //   console.log(result);
              navigate("/");
            });
        }
      });
  };

  const { data: categories } = useQuery({
    queryKey: ["categoriy"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/categoriy");
      const data = await res.json();
      return data.data;
    },
  });
  //   console.log(categories);

  useTitle("Add Product")

  return (
    <div>
      {loading && <Loading />}
      <div className="w-5/6 mx-auto p-7">
        <h2 className="text-3xl md:text-5xl font-bold mb-10">
          Add New <span className="text-rose-700">Product</span>
        </h2>
        <form
          onSubmit={handleSubmit(handleAddProduct)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">
                Select Categorie
              </span>
            </label>
            <select
              {...register("categoriyId")}
              className="input input-bordered w-full max-w-xs"
            >
              <option defaultValue>Select a Categorie</option>
              {categories?.map((categorie) => (
                <option
                  className="font-bold text-md"
                  key={categorie._id}
                  value={categorie._id}
                >
                  {categorie.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Product Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Product Name"
              {...register("name", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">
                Product Details
              </span>
            </label>
            <textarea
              type="text"
              placeholder="Write Details about this Product"
              {...register("detail", {
                required: "Product detail is Required",
              })}
              className="input input-bordered w-full max-w-lg"
            />
            {errors.detail && (
              <p className="text-red-500">{errors.detail.message}</p>
            )}
          </div>

          <div className="form-control hidden w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Seller Name</span>
            </label>
            <input
              type="text"
              defaultValue={sellerName}
              {...register("sellerName", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control hidden w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Seller ID</span>
            </label>
            <input
              type="text"
              value={sellerId}
              {...register("sellerId", {
                required: "Seller Id Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Price</span>
            </label>
            <input
              type="number"
              placeholder="Enter Price"
              {...register("price", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">Discount</span>
            </label>
            <input
              type="number"
              placeholder="Enter Discount"
              {...register("discount", {
                required: "Name is Required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">
                Upload Product Image
              </span>
            </label>
            <input
              type="file"
              {...register("photo", {
                required: "Image is Required",
              })}
              className="input w-full max-w-xs border border-black pt-2"
            />
            {errors.photo && (
              <p className="text-red-500">{errors.photo.message}</p>
            )}
          </div>

          <div className=" text-center mt-8 md:col-span-2">
            <input
              className="btn btn-accent mt-4 font-bold md:w-96"
              value="Add Product"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
