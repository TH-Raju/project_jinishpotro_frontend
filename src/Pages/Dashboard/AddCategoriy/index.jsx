/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../../Context";
import Loading from "../../../Shared/Loading/inde";

const AddCategoriy = () => {
  const navigate = useNavigate();
  const { imgbbAPIKey, loading, setLoading } = useContext(ContextData);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddCategoriy = (data) => {
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

          //save categoriy

          fetch("http://localhost:5000/api/v1/categoriy", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((result) => {
              setLoading(false);
              toast.success("Categoriy Added");
              //   console.log(result);
              navigate("/");
            });
        }
      });
  };

  return (
    <div>
      {loading && <Loading />}
      <div className="w-5/6 mx-auto p-7">
        <h2 className="text-3xl md:text-5xl font-bold mb-10">
          Add New <span className="text-rose-700">Categoriy</span>
        </h2>
        <form
          onSubmit={handleSubmit(handleAddCategoriy)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">
                Categoriy Name
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Categoriy Name"
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
                Categoriy Title
              </span>
            </label>
            <input
              type="text"
              placeholder="Enter Categoriy Title"
              {...register("title", {
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
                Categoriy Details
              </span>
            </label>
            <textarea
              type="text"
              placeholder="Write Details about this Categoriy"
              {...register("detail", {
                required: "categoriy detail is Required",
              })}
              className="input input-bordered w-full max-w-lg"
            />
            {errors.detail && (
              <p className="text-red-500">{errors.detail.message}</p>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <label className="label">
              {" "}
              <span className=" text-xl font-bold">
                Upload Categoriy Image
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
              value="Add Categoriy"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoriy;
