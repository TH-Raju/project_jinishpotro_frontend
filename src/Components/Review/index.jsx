/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  EllipsisHorizontalIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import { useContext, useState } from "react";
import { ContextData } from "../../Context";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../Shared/Loading/inde";

function getRating(rating) {
  switch (rating) {
    case 1:
      return "Poor";
    case 2:
      return "Nothing special";
    case 3:
      return "Average";
    case 4:
      return "Very good";
    case 5:
      return "Excellent";
    default:
      return "None";
  }
}

const Reviews = ({ review, refetch, categoryId, productId }) => {
  // console.log("rev", review);
  const cookies = new Cookies();
  const name = cookies.get("name");
  const id = cookies.get("id");
  const photo = localStorage.getItem("photo");
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { loading, setLoading } = useContext(ContextData);

  const d = new Date();
  const options = { month: "short", day: "numeric", year: "numeric" };
  const formattedDate = d.toLocaleString("en-US", options);

  // console.log(photo);
  // console.log(formattedDate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleAddReview = (data) => {
    data.rating = rating;
    // console.log(data);

    const revData = {
      categoriyId: categoryId,
      productId: productId,
      reviewData: data,
    };
    setLoading(true);
    fetch(
      "https://jinishpotro-backend-5zxijrpet-th-raju.vercel.app/api/v1/categoriy/product/review",
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(revData),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          setLoading(false);
          refetch();
          document.getElementById("my_modal_5").close();
          toast.success("Review Added");
          navigate(`/categoriy/${categoryId}/${productId}`);
        }
        //   console.log(result);
      });

    // console.log(revData);
  };

  let rateData = rating;

  const delteReview = (data, userId) => {
    if (id === userId) {
      fetch(
        `https://jinishpotro-backend-5zxijrpet-th-raju.vercel.app/api/v1/categoriy/${categoryId}/products/${productId}/review/${data}`,
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
            //   console.log(result);
            navigate(`/categoriy/${categoryId}/${productId}`);
          }
        });
    } else {
      toast.error("Please Login First");
      navigate("/login");
    }
  };

  return (
    <div className="w-[80%] mx-auto py-20">
      {loading && <Loading />}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl sm:text-2xl font-extrabold mb-5">
          <span className="text-rose-700 font-extrabold">I</span> Reviews
        </h1>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          <PlusCircleIcon className="h-6 w-6 text-blue-500" /> Give a Review
        </button>
      </div>

      <form action="" onSubmit={handleSubmit(handleAddReview)}>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box text-black">
            <h3 className="font-bold text-lg">Your opinion matters!</h3>
            <div className=" form-control w-[40%] mx-auto text-center">
              <Rating
                value={rating}
                onChange={setRating}
                onHoverChange={setHoveredRating}
              />
              <div>
                <div>{`Selected: ${getRating(rating)}`}</div>
                <div>{`Hovered: ${getRating(hoveredRating)}`}</div>
              </div>
            </div>

            <div className="form-control  ">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">Review</span>
              </label>
              <textarea
                type="text"
                placeholder="Enter Your Feedback"
                {...register("comment", {
                  required: "Opinion is Required",
                })}
                className="input input-bordered w-full "
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="hidden form-control w-full max-w-xs">
              <input
                type="number"
                value={rating}
                onChange={setRating}
                {...register("rating")}
              />
            </div>
            <div className="hidden form-control w-full max-w-xs">
              <input
                type="text"
                value={photo}
                onChange={setRating}
                {...register("userPhoto")}
              />
            </div>
            <div className="hidden form-control w-full max-w-xs">
              <input
                type="text"
                value={formattedDate}
                onChange={setRating}
                {...register("date")}
              />
            </div>
            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">Name</span>
              </label>
              <input
                type="text"
                value={name}
                {...register("name")}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className=" hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">Id</span>
              </label>
              <input
                type="text"
                value={id}
                placeholder="Enter Categoriy Title"
                {...register("userId")}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            {/* <h1>categoryId ={categoryId}</h1>
            <h1>productId = {productId}</h1> */}
            <div className="modal-action flex items-baseline">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-warning">Close</button>
              </form>
              <div className=" text-center mt-8 md:col-span-2">
                <input
                  className="btn btn-accent mt-4 font-bold md:w-96"
                  value="Add Review"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </dialog>
      </form>

      <div>
        {review?.map((rev) => (
          <div key={rev._id}>
            <div className="container border border-sky-400 flex flex-col mt-3 w-full max-w-5xl mx-auto p-6  divide-y rounded-md divide-gray-700 ">
              <div className="flex justify-between p-4">
                <div className="flex space-x-4">
                  <div>
                    <img
                      src={
                        rev.userPhoto
                          ? rev.userPhoto
                          : "https://source.unsplash.com/100x100/?portrait"
                      }
                      alt=""
                      className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
                    />
                  </div>
                  <div>
                    <div className="grid grid-cols-2 it">
                      <div className="flex dropdown">
                        <h4 className="font-bold">{rev.name}</h4>
                        <label tabIndex={0} className=" m-1">
                          <EllipsisHorizontalIcon className="h-8 w-8 text-white -mt-2" />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] text-black menu p-2 shadow bg-base-100 rounded-box w-32 mt-5"
                        >
                          <li
                            className="btn btn-warning btn-sm"
                            onClick={() => delteReview(rev._id, rev.userId)}
                          >
                            delete
                          </li>
                          <li>
                            <a>Item 2</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <span className="text-xs dark:text-gray-400">
                      {rev.date} 2
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 dark:text-yellow-500">
                  <Rating className="w-28" value={rev.rating} readOnly />
                  <span className="text-xl font-bold">{rev.rating}</span>
                </div>
              </div>
              <div className="px-4 space-y-2 text-sm ">
                <p>{rev.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
