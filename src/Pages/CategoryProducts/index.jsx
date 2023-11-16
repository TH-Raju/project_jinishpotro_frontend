/* eslint-disable no-unused-vars */
import { useLoaderData } from "react-router-dom";

const CategoriesProduct = () => {
  const data = useLoaderData();
  const { name, photo, detail, price, sellerName } = data.data;

  return (
    <div>
      <div className=" lg:w-[60%] mx-auto bg-base-100 shadow-xl lg:p-10 flex justify-around mt-8 py-10">
        <figure>
          <img src={photo} className="h-44" alt="Album" />
        </figure>
        <div className="w-[60%] ">
          <div className=" justify-center leading-7">
            <h2 className="text-3xl font-bold">{name}</h2>
            <p>{detail}</p>
            <p>
              Price: <span className="font-bold">${price}</span>
            </p>
            <div className="bottom-0 mt-12">
              <button className="btn btn-primary btn-sm mb-2 lg:mb-0">
                Buy Now
              </button>
              <button className="btn btn-primary btn-sm lg:ml-4 ml-0 md:ml-3">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesProduct;
