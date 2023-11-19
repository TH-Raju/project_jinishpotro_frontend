/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ContextData } from "../../Context";
import Loading from "../../Shared/Loading/inde";

const ConfirmOrder = ({ id, categoryId, categoryName, productData }) => {
  const [quantity, setQuantity] = useState(1);
  const { loading, setLoading } = useContext(ContextData);

  const cookies = new Cookies();
  const userName = cookies.get("name");
  const userId = cookies.get("id");
  const userPhone = cookies.get("phone");
  const userEmail = cookies.get("email");
  const navigate = useNavigate();
  const { name, photo, detail, price, sellerName, discount, review, _id } =
    productData;
  const discountAmount = (price * discount) / 100;
  let actualPrice = price - discountAmount;
  actualPrice = actualPrice * quantity;
  //   console.log(quantity);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // console.log(categoryName);

  const confirmOrder = (data) => {
    // console.log(data);
    data.categoryName = categoryName;
    fetch("http://localhost:5000/api/v1/order/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setLoading(false);
          toast.success("Thanks for your Order");
          //   console.log(result);
          navigate("/");
        } else {
          setLoading(false);
          toast.error("Order not Confirmed");
          //   console.log(result);
          navigate(`/categoriy/${data.categoryId}/${data.productId}`);
        }
      });
  };

  return (
    <div>
      {loading && <Loading />}
      <dialog id={id} className="modal text-black modal-bottom sm:modal-middle">
        <div className="modal-box bg-gray-100">
          <div className="flex justify-center">
            <img src={photo} className="w-40" alt="" />
          </div>
          <h3 className=" text-lg">
            Product Name: <span className="font-bold">{name}</span>
          </h3>
          <h3 className=" text-lg">
            Prodcut Price: <span className="font-bold">${price}</span>
          </h3>
          <h3 className=" text-lg">
            Discount : <span className="font-bold">{discount}%</span>
          </h3>
          <div className="flex gap-4 items-center my-2">
            <h1 className="font-bold">Quantity: </h1>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => setQuantity(quantity + 1)}
            >
              +{" "}
            </button>
            <h1>{quantity <= 1 ? 1 : quantity}</h1>
            <button
              className={`btn btn-sm btn-outline ${
                quantity <= 1 && "btn-disabled"
              }`}
              onClick={() => setQuantity(quantity - 1)}
            >
              -
            </button>
          </div>
          <h3 className=" text-lg">
            Total Amount: <span className="font-bold">${actualPrice}</span>
          </h3>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-warning">Close</button>
              <button
                className="btn btn-success ml-3"
                onClick={() =>
                  document.getElementById("my_modal_50").showModal()
                }
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <form action="" onSubmit={handleSubmit(confirmOrder)}>
        <dialog id="my_modal_50" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Thanks For Your Order!</h3>
            <div className="flex  gap-3">
              <p className="border px-2">{quantity} ps</p>
              <p>{name}</p>
            </div>
            <p>
              Send Amount: <span className="font-bold">${actualPrice}</span>
            </p>
            <p>To</p>
            <p>
              Bkash : <span className="font-bold">01859-053543</span>
            </p>

            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">
                  Total Price
                </span>
              </label>
              <input
                type="number"
                value={actualPrice}
                {...register("totalPrice")}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">Quantity</span>
              </label>
              <input
                type="number"
                value={quantity}
                {...register("quantity")}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">Product Id</span>
              </label>
              <input
                type="text"
                value={id}
                {...register("productId")}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">
                  Categoriy Id
                </span>
              </label>
              <input
                type="text"
                value={categoryId}
                {...register("categoryId")}
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">
                  Categoriy Id
                </span>
              </label>
              <input
                type="text"
                value={categoryName}
                {...register("categoryName")}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">
                  Categoriy Id
                </span>
              </label>
              <input
                type="text"
                value={userId}
                {...register("userId")}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">
                  Product Name
                </span>
              </label>
              <input
                type="text"
                value={name}
                {...register("productName")}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">User Name</span>
              </label>
              <input
                type="text"
                value={userName}
                {...register("userName")}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">Email</span>
              </label>
              <input
                type="text"
                value={userEmail}
                {...register("userEmail")}
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="hidden form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">
                  Phone Number
                </span>
              </label>
              <input
                type="number"
                value={userPhone}
                placeholder="Your Phone number"
                {...register("userPhone", {
                  required: "User Phone Number is Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.userPhone && (
                <p className="text-red-500">{errors.userPhone.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">
                  Bkash Number
                </span>
              </label>
              <input
                type="number"
                placeholder="Sender bkash number"
                {...register("sendMoney", {
                  required: "Bkash Number is Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.sendMoney && (
                <p className="text-red-500">{errors.sendMoney.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">
                  Bkash Transaction Number
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter transaction number"
                {...register("transaction", {
                  required: "Transaction Number is Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.transaction && (
                <p className="text-red-500">{errors.transaction.message}</p>
              )}
            </div>

            <div className="modal-action flex items-baseline">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-warning">Close</button>
              </form>
              <div className=" text-center  md:col-span-2">
                <input
                  className="btn btn-accent  font-bold md:w-96"
                  value="Confirm Order"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </dialog>
      </form>
    </div>
  );
};

export default ConfirmOrder;
