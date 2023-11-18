/* eslint-disable no-const-assign */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductCategoriy from "../../Components/ProductCategoriy";
import ProductCard from "../../Components/ProductCard";
import { useContext, useEffect, useState } from "react";
import { ContextData } from "../../Context";
import Reviews from "../../Components/Review";
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";
import AddToCard from "../../Components/AddToCard";
import toast from "react-hot-toast";

const CategoriesProduct = () => {
  const data = useLoaderData();
  // console.log(data.data.review);
  const { name, photo, detail, price, sellerName, discount, review, _id } =
    data.data;
  const { categoryId, productId } = useParams();
  const [rating, setRating] = useState(0);
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  const { siteName, totalData } = useContext(ContextData);
  const { data: categories, refetch } = useQuery({
    queryKey: ["singleCategoriy"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/api/v1/categoriy/${categoryId}`
      );
      const data = await res.json();
      return data.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const productData = {
    id: _id,
    name: name,
    detail: detail,
    photo: photo,
    price: price,
    discount: discount,
  };

  let wishlist = [];
  function saveWishlistToLocalStorage() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

  function isProductInWishlist(productId) {
    return wishlist.some((item) => item._id === productId);
  }

  function addToWishlist(productId) {
    if (!isProductInWishlist(productId)) {
      // Add product to the wishlist
      wishlist.push({
        _id: productId,
        name: name,
        photo: photo,
        price: price,
        // Add other product details as needed
      });
      saveWishlistToLocalStorage();
      toast.success(`Product added to wishlist: ${name}`);
      navigate(`/categoriy/${categoryId}/${productId}`);
    } else {
      toast.error("Product is already in the wishlist.");
    }
  }

  // console.log(wishlist);

  // console.log(categories);
  return (
    <div>
      <div className=" lg:w-[60%] mx-auto bg-base-100 shadow-xl lg:p-10 flex justify-around mt-8 py-10 my-10">
        <figure>
          <img
            src={photo}
            className="max-h-56 border border-blue-400"
            alt="Album"
          />
        </figure>
        <div className="w-[60%] ">
          <div className=" justify-center leading-7">
            <h2 className="text-3xl font-bold">{name}</h2>
            <p>{detail}</p>
            <p>
              Price: <span className="font-bold">${price}</span>
            </p>
            <div className="bottom-0 mt-12">
              <button
                className="btn btn-primary btn-sm mb-2 lg:mb-0"
                onClick={() => document.getElementById(_id).showModal()}
              >
                Buy Now
              </button>
              <button
                className="btn btn-primary btn-sm lg:ml-4 ml-0 md:ml-3"
                onClick={() => addToWishlist(_id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <AddToCard id={_id} productData={productData} />
      </div>
      <div className="w-[80%] mx-auto mt-20">
        {/* <p>Category ID: {categoryId}</p>
        <p>Product ID: {productId}</p> */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-5xl font-extrabold my-4">
            More
            <span className="text-rose-700 ">
              {" "}
              {categories ? categories.name : "Loading..."}
            </span>
          </h1>
        </div>
        <h1 className="text-2xl sm:text-2xl font-extrabold mb-5">
          <span className="text-rose-700 font-extrabold">I</span> {name}{" "}
          <h1 className="ml-3 mb-4 text-xl font-normal">{detail}</h1>
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-5 gap-7 ">
          {categories?.products?.slice(0, 10).map((product) => (
            <Link
              key={product._id}
              to={`/categoriy/${categoryId}/${productId}`}
            >
              <ProductCard products={product} />
            </Link>
          ))}
        </div>
      </div>
      <Reviews
        review={review}
        refetch={refetch}
        categoryId={categoryId}
        productId={productId}
      />
    </div>
  );
};

export default CategoriesProduct;