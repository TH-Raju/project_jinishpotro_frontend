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
      <div className="mt-9 drawer-content ">
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
            <li className=" mb-2">add</li>
          </Link>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
