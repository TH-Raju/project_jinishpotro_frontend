/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../Components/ProductCard";
import DiscountProdCard from "../../../Components/DiscountProdCard";
import { Link } from "react-router-dom";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import DiscountBanner from "../DiscountBanner";

const Discount = () => {
  const { data: categories } = useQuery({
    queryKey: ["discountProduct"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/categoriy");
      const data = await res.json();
      return data.data;
    },
  });

  let slidesPerView = 4; // Default value for large screens
  let spacePerView = 10; // Default value for large screens

  if (window?.innerWidth <= 768) {
    slidesPerView = 2; // Small screens
    spacePerView = 100;
  } else if (window?.innerWidth <= 1024) {
    slidesPerView = 3; // Medium screens
    spacePerView = 50;
  }

  return (
    <div className="w-[90%] md:w-[80%] mx-auto  min-h-screen">
      <DiscountBanner />
      <h1 className="text-2xl sm:text-2xl font-extrabold mb-5">
        <span className="text-rose-700 font-extrabold">I</span> Discount{" "}
        <h1 className="ml-3 mb-4 text-xl font-normal">Products</h1>
      </h1>
      <div className="w-[80%] mx-auto">
        <Swiper
          slidesPerView={slidesPerView}
          spaceBetween={spacePerView}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper "
        >
          {categories?.map((categorie) => (
            <div key={categorie._id}>
              {categorie?.products?.map((product) => (
                <div key={product._id}>
                  {product.discount >= 1 && (
                    <Link
                      key={product._id}
                      to={`/categoriy/${categorie._id}/${product._id}`}
                    >
                      <SwiperSlide>
                        <DiscountProdCard
                          products={product}
                          categoriyId={categorie._id}
                        />
                      </SwiperSlide>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Discount;
