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
import toast from "react-hot-toast";
import ConfirmOrder from "../../Components/ConfirmOrder";

const CategoriesProduct = () => {
  const data = useLoaderData();
  // console.log(data.data.review);
  const { name, photo, detail, price, sellerName, discount, review, _id } =
    data.data;
  const { categoryId, productId } = useParams();
  const [rating, setRating] = useState(0);
  const [wishlist, setWishlist] = useState([]);
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

  const discountAmount = (price * discount) / 100;
  const actualPrice = price - discountAmount;

  const productData = {
    id: _id,
    name: name,
    detail: detail,
    photo: photo,
    price: price,
    discount: discount,
  };

  useEffect(() => {
    // Load wishlist from localStorage on component mount
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  function saveWishlistToLocalStorage() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

  function isProductInWishlist(productId) {
    return wishlist.some((item) => item.pId === productId);
  }

  function addToWishlist(productId) {
    if (!isProductInWishlist(productId)) {
      // Add product to the wishlist
      wishlist.push({
        pId: productId,
        cId: categoryId,
        name: name,
        photo: photo,
        price: actualPrice,
      });
      saveWishlistToLocalStorage();
      // console.log(wishlist);
      toast.success(`Product added to wishlist: ${name}`);
      navigate(`/categoriy/${categoryId}`);
    } else {
      toast.error("Product is already in the wishlist.");
    }
  }

  // console.log(wishlist);

  // console.log(categories);
  return (
    <div className="-mt-10 md:mt-8 lg:mt-18">
      <div className=" lg:w-[60%] mx-auto shadow-xl shadow-sky-400 lg:p-10 flex flex-wrap justify-around mt-8 py-10 my-10 ">
        <figure>
          <img
            src={photo}
            className="max-h-56 border border-blue-400"
            alt="Album"
          />
        </figure>
        <div className="w-[70%] md:w-[60%] mx-auto mt-5">
          <div className=" justify-center leading-7">
            <h2 className="text-3xl font-bold mb-5 ">{name}</h2>
            <p>{detail}</p>
            <p>
              Price: <span className="font-bold">${price}</span>
            </p>
            <p>
              Discount: <span className="font-bold">{discount}%</span>
            </p>
            <p>
              Price: <span className="font-bold">${actualPrice}</span>
            </p>
            <div className="bottom-0 mt-12 flex justify-between md:justify-end">
              <button
                className="btn btn-primary btn-sm mb-2 lg:mb-0"
                onClick={() => document.getElementById(_id).showModal()}
              >
                Buy Now
              </button>
              <button
                className="btn btn-primary btn-sm lg:ml-4 ml-2 md:ml-3"
                onClick={() => addToWishlist(_id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <ConfirmOrder
          id={_id}
          categoryId={categoryId}
          productData={productData}
        />
      </div>
      <div className="w-[90%] md:w-[80%] mx-auto mt-20">
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
              to={`/categoriy/${categoryId}/${product._id}`}
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
