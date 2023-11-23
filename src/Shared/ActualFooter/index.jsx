/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextData } from "../../Context";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/Github.png";
import facebook from "../../assets/facebook.png";
import logo from "../../assets/jp.png";
import { PhotoProvider, PhotoView } from "react-photo-view";

const ActualFooter = () => {
  const { siteName } = useContext(ContextData);
  const { data: categories } = useQuery({
    queryKey: ["categoriesProducts"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/categoriy");
      const data = await res.json();
      return data.data;
    },
  });

  let year = new Date().getFullYear();

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 mt-32">
      <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
        <div className="md:max-w-md lg:col-span-2">
          <Link
            to="/"
            aria-label="Go home"
            title="Company"
            className="inline-flex items-center"
          >
            <PhotoProvider>
              <PhotoView src={logo}>
                <img src={logo} className="w-8" alt="" />
              </PhotoView>
            </PhotoProvider>
            <span className="ml-2 text-xl font-bold tracking-wide  uppercase">
              {siteName}
            </span>
          </Link>
          <div className="mt-4 lg:max-w-sm">
            <p className="text-sm ">
              Welcome to {siteName} – your go-to online marketplace for a
              seamless shopping experience. Explore a curated collection across
              fashion, electronics, and more. Connect with sellers globally and
              enjoy secure transactions, timely deliveries, and excellent
              customer support.
            </p>
            <p className="mt-4 text-sm ">
              Join our community and discover the joy of convenient online
              shopping. At {siteName}, we bring together unique sellers and
              discerning buyers, offering a diverse range of products with just
              a click. Your journey with us combines variety, convenience, and
              the satisfaction of finding something special.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
          <div>
            <p className="font-bold tracking-wide ">Category</p>
            <ul className="mt-2 space-y-2">
              {categories
                ?.slice(0, 5)
                .reverse()
                .map((categorie) => (
                  <li key={categorie._id}>
                    <Link
                      to={`categoriy/${categorie._id}`}
                      className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                    >
                      {categorie.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className="font-bold tracking-wide ">Products</p>
            <ul className="mt-2 space-y-2">
              {categories
                ?.slice(0, 5)
                .reverse()
                .map((categorie) => (
                  <li key={categorie._id}>
                    <Link
                      to={`categoriy/${categorie._id}`}
                      className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                    >
                      {categorie?.products?.slice(0, 1).map((product) => (
                        <li key={product._id}>
                          <Link
                            to={`categoriy/${categorie._id}/${product._id}`}
                            className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                          >
                            {product.name}
                          </Link>
                        </li>
                      ))}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <p className="font-bold tracking-wide ">JinishPotro</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  to="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Media
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Brochure
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Nonprofit
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Career
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-bold tracking-wide ">Cherry</p>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  to="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Infopreneur
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Personal
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Wiki
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className=" transition-colors duration-300 hover:text-deep-purple-accent-400"
                >
                  Forum
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between pt-5 pb-10 border-t sm:flex-row">
        <p className="text-sm ">
          © Copyright {year}{" "}
          <Link
            className="text-blue-700 underline"
            to={"https://tofajjol-hosen-raju.web.app/"}
            target="__blank"
          >
            TH-Raju
          </Link>
          . All rights reserved.
        </p>
        <div className="flex items-center mt-4 space-x-4 sm:mt-0">
          <Link
            to={"https://www.linkedin.com/in/th-raju/"}
            target="__blank"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <img src={linkedin} className="h-6" alt="" />
          </Link>
          <Link
            to={"https://github.com/TH-Raju"}
            target="__blank"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <img src={github} className="h-6" alt="" />
          </Link>
          <Link
            to={"https://www.facebook.com/rjraju.r8/"}
            target="__blank"
            className="text-gray-500 transition-colors duration-300 hover:text-deep-purple-accent-400"
          >
            <img src={facebook} className="h-6" alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ActualFooter;
