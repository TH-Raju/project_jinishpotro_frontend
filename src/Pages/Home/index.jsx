/* eslint-disable no-unused-vars */
import HomeBanner from "../../Components/HomeBanner";
import AllCategoriys from "./AllCategoriys";
import Discount from "./Discount";
import HomeProducts from "./HomeProduct";
import State from "./State";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useQuery } from "@tanstack/react-query";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Testimonial from "./Testimonial";
import useTitle from "../../Shared/UseTitle";

const Home = () => {
  const { data: categories } = useQuery({
    queryKey: ["categoriyBanner"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/categoriy");
      const data = await res.json();
      return data.data;
    },
  });

  useTitle("Home");

  return (
    <div>
      <Swiper
        spaceBetween={30}
        loop={true}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-b-xl "
      >
        {categories?.map((categorie) => (
          <SwiperSlide key={categorie._id}>
            <HomeBanner categorie={categorie} />
          </SwiperSlide>
        ))}
      </Swiper>
      <AllCategoriys />
      <HomeProducts />
      <State />
      <Discount />
      <Testimonial />
    </div>
  );
};

export default Home;
