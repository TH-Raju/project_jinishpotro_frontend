/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ContextData } from "../../Context";
import { Link } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
const HomeBanner = ({ categorie }) => {
  const { theme } = useContext(ContextData);
  // console.log(categorie);
  return (
    <div>
      <section
        className={`relative bg-cover bg-center bg-no-repeat lg:pt-28  `}
        style={{ backgroundImage: `url(${categorie.photo})` }}
      >
        <div
          className={`absolute inset-0 bg-white/75 sm:bg-transparent ${
            theme ? "sm:from-white/95" : "sm:from-black/95"
          }  sm:to-white/25 sm:bg-gradient-to-r `}
        ></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex  lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className=" text-3xl font-extrabold sm:text-5xl">
              Let us find your
              <strong className="block font-extrabold text-rose-700">
                {categorie.name}
              </strong>
            </h1>

            <p className=" mt-4 max-w-lg sm:text-xl/relaxed">
              {categorie.detail}
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                to={`categoriy/${categorie._id}`}
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeBanner;
