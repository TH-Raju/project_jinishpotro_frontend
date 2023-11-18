/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext } from "react";
import { ContextData } from "../../Context";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ products }) => {
  const { name, price, detail, photo, discount } = products;
  const { theme } = useContext(ContextData);

  return (
    <div>
      <div className="card card-compact text-black w-40 md:w-52 bg-base-100 shadow-xl border border-blue-200 p-2">
        <figure>
          <img src={photo} alt="Shoes" className="h-16 md:h-20" />
        </figure>
        <div className="card-body">
          <h2 className="md:card-title h-14 font-bold text-base w-[90%] leading-5">
            {name}
          </h2>
          {/* <p>
            {" "}
            Price: <span className="font-bold">{price}</span>
          </p> */}
        </div>
        <div className="">
          <button className="btn btn-outline btn-info btn-sm w-full ">
            Price <span className="font-bold">{price}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
