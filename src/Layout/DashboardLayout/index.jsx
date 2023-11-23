/* eslint-disable no-unused-vars */
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ContextData } from "../../Context";
import Cookies from "universal-cookie";
import { PhotoProvider, PhotoView } from "react-photo-view";

const DashboardLayout = () => {
  const { userRole } = useContext(ContextData);
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const userName = cookies.get("name");
  const photo = localStorage.getItem("photo");
  let verify = false;
  let verifyAdmin = false;
  const validRoles = ["seller", "admin", "super_admin"];
  const validAdminRoles = ["admin", "super_admin"];

  if (validRoles.includes(userRole)) {
    verify = true;
  }

  if (validAdminRoles.includes(userRole)) {
    verifyAdmin = true;
  }
  return (
    <div className="drawer  lg:drawer-open lg:pt-16 mb-10">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content text-right my-2 mr-2">
        <label htmlFor="my-drawer-2" className="btn  drawer-button lg:hidden">
          <Bars3BottomLeftIcon className="h-6 w-6 text-blue-500" />
        </label>
      </div>
      <div className="mt-14 lg:mt-0 drawer-content w-[480px] md:w-[100%] mx-auto  shadow-[0px_20px_28px_10px_#00000024]">
        <Outlet />
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu pt-10 p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <Link to={`/dashboard/profile`}>
            <li className="btn btn-outline btn-sm w-full btn-info mb-2">
              Profile
            </li>
          </Link>

          {verify && (
            <>
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
              {verifyAdmin && (
                <>
                <Link to={`/dashboard/alluser`}>
                  <li className="btn btn-outline btn-sm w-full btn-info mb-2">
                    All User
                  </li>
                </Link>
                <Link to={`/dashboard/allproduct`}>
                  <li className="btn btn-outline btn-sm w-full btn-info mb-2">
                    All Product
                  </li>
                </Link>
                </>
              )}
            </>
          )}

          <div className="text-center mt-[100%]">
            {" "}
            {/* "mt-auto" adds margin-top to push the button to the bottom */}
            <div className="flex items-center gap-2 bg-gradient-to-tr from-sky-200 to-sky-400 p-4 hover:bg-gradient-to-bl hover:from-sky-200 hover:to-sky-400 rounded-full duration-300">
              <PhotoProvider>
                <PhotoView src={photo}>
                  <img
                    alt="Admin"
                    src={photo}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </PhotoView>
              </PhotoProvider>

              <div>
                <p className="text-sm text-start">
                  <strong className="block font-medium">{userName}</strong>

                  <span> {userEmail}</span>
                </p>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
