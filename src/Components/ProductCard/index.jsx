/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import { useContext } from "react";
import { ContextData } from "../../Context";

// eslint-disable-next-line react/prop-types
const ProductCard = ({ products }) => {
  const { name, price, detail, photo } = products;
  const { theme } = useContext(ContextData);



  return (
    <div>
      <div className="card card-compact text-black w-52 bg-base-100 shadow-xl border border-blue-200 p-2">
        <figure>
          <img src={photo} alt="Shoes" className="h-20" />
        </figure>
        <div className="card-body">
          <h2 className="card-title h-14">{name}</h2>
          <p> Price: {price}</p>
        </div>
        <div className="">
          <button className="btn btn-primary btn-sm w-full">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
