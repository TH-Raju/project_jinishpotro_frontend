import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open lg:mt-16">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content text-right my-2 mr-2">
        <label htmlFor="my-drawer-2" className="btn  drawer-button lg:hidden">
          <Bars3BottomLeftIcon className="h-6 w-6 text-blue-500" />
        </label>
      </div>
      <div className="mt-9 drawer-content w-[480px] md:w-[100%] mx-auto">
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <Link to={`/dashboard/addCategoriy`}>
            <li className="btn btn-outline btn-sm w-full btn-info mb-2">
              Add Categoriy
            </li>
          </Link>
          <Link to={`/dashboard/addProduct`}>
            <li className="btn btn-outline btn-sm w-full btn-info mb-2">
              Add Product
            </li>
          </Link>
          <Link to={`/dashboard/orders`}>
            <li className="btn btn-outline btn-sm w-full btn-info mb-2">
              Orders
            </li>
          </Link>
          
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
