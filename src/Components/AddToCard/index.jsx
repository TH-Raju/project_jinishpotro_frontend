/* eslint-disable no-unused-vars */

import { useState } from "react";

/* eslint-disable react/prop-types */
const AddToCard = ({ id, productData }) => {
  const { quantity, setQuantity } = useState(0);
  const { name, photo, detail, price, sellerName, discount, review, _id } =
    productData;
  const discountAmount = (price * discount) / 100;
  const actualPrice = price - discountAmount;
  return (
    <div>
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
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
          <h3 className=" text-lg">
            Total Amount: <span className="font-bold">{actualPrice}</span>
          </h3>
          <p className="py-4">{detail}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddToCard;
