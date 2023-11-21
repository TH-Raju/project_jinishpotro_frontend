/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext } from "react";
import { ContextData } from "../../Context";

// eslint-disable-next-line react/prop-types
const DiscountProdCard = ({ products }) => {
  const { name, price, detail, photo, discount } = products;
  const { theme } = useContext(ContextData);
  const discountAmount = (price * discount) / 100;
  let actualPrice = price - discountAmount;
  return (
    <div>
      <div className="card card-compact  text-black w-40 md:w-52 bg-base-100 shadow-xl border border-blue-200 ">
        <figure className="">
          <img src={photo} alt="Shoes" className="relative h- md:h-36 w-fit " />
          <div className="badge badge-secondary absolute top-0 right-0">
            {discount}%
          </div>
        </figure>
        <div className="px-2 h-40">
          <h2 className="md:card-title  h-10  font-bold text-base w-[90%] leading-5">
            {name.length >= 10 ? name.slice(0, 15) + "..." : name}
          </h2>
          <p className=" leading-5 h-16">
            <span className="">
              {detail.length >= 30 ? detail.slice(0, 30) + "..." : detail}
            </span>
          </p>
          <p className="text-orange-500 bottom-0">
            $ <span className="font-bold">{actualPrice}</span>
          </p>
          <p className=" bottom-0">
          <del className="font-bold text-orange-600">  $  {price}</del>
             
            <span className=""> - {discount}%</span>
          </p>
        </div>
        {/* <div className="">
          <button className="btn   btn-sm w-full ">
            <p className="text-orange-500 bottom-0">
              $ <span className="font-bold">{price}</span>
            </p>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DiscountProdCard;
