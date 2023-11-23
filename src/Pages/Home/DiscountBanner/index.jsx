import { Link } from "react-router-dom";

const DiscountBanner = () => {
  return (
    <div className="mb-10">
      <div className="p-6 py-12 bg-rose-900 text-gray-200">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <h2 className="text-center text-6xl tracking-tight font-bold">
              Discover <br className="sm:hidden" />
              Exclusive Deals
            </h2>

            <Link
              to="/products"
              rel="noreferrer noopener"
              className="px-5 mt-4 lg:mt-0 py-3 rounded-md border block dark:bg-gray-50 dark:text-gray-900 dark:border-gray-400"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
