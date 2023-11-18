/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";

const AddToCard = ({ id, categoryId, productData }) => {
  const [quantity, setQuantity] = useState(1);
  const cookies = new Cookies();
  const userName = cookies.get("name")
  const userPhone = cookies.get("phone")
  const userEmail = cookies.get("email")
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

  const confirmOrder = (data) => {
    console.log(data);
  };

  return (
    <div>
      <dialog id={id} className="modal text-black modal-bottom sm:modal-middle">
        <div className="modal-box bg-gray-100">
          <div className="flex justify-center">
            <img src={photo} className="w-40" alt="" />
          </div>
          <h3 className=" text-lg">
            Product Name: <span className="font-bold">{name}</span>
          </h3>
          <h3 className=" text-lg">
            Prodcut Price: <span className="font-bold">{price}</span>
          </h3>
          <h3 className=" text-lg">
            Discount : <span className="font-bold">{discount}</span>
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
            Total Amount: <span className="font-bold">{actualPrice}</span>
          </h3>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-warning">Close</button>
              <button
                className="btn"
                onClick={() =>
                  document.getElementById("my_modal_50").showModal()
                }
              >
                open modal
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <form action="" onSubmit={handleSubmit(confirmOrder)}>
        <dialog id="my_modal_50" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Thanks For Your Order!</h3>
            <p>
              Send : <span className="font-bold">${actualPrice}</span>
            </p>
            <p>To</p>
            <p>
              Bkash : <span className="font-bold">01859-053543</span>
            </p>

            <div className="form-control w-full max-w-xs">
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

            <div className="form-control w-full max-w-xs">
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

            <div className="form-control w-full max-w-xs">
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

            <div className="form-control w-full max-w-xs">
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

            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">ProductId</span>
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
            <div className="form-control w-full max-w-xs">
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

            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text text-xl font-bold">
                  Phone Number
                </span>
              </label>
              <input
                type="number"
                defaultValue={userPhone}
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
              <div className=" text-center mt-8 md:col-span-2">
                <input
                  className="btn btn-accent mt-4 font-bold md:w-96"
                  value="Add Categoriy"
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

export default AddToCard;
