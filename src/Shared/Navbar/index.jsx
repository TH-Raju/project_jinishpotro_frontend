import { useContext } from "react";
import { ContextData } from "../../Context";
import { SunIcon } from "@heroicons/react/24/solid";
import { menuItems } from "../MenuItems";

const Navbar = () => {
  const { siteName, theme, setTheme } = useContext(ContextData);

  return (
    <div className="lg:block hidden ">
      <div className="navbar fixed top-0 z-40 bg-gray-400">
        <div className="navbar-start ">
          <div className="dropdown">
            {/* <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content  z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menuItems}
            </ul> */}
          </div>
          <a className="btn btn-ghost normal-case text-xl ">{siteName}</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-md font-bold">
            {menuItems}
          </ul>
        </div>
        <div className="navbar-end">
          <div
            className={`btn btn-sm  ${
              theme
                ? "bg-black text-white hover:bg-gray-800 duration-200"
                : "bg-white hover:bg-gray-400 duration-200 hover:text-white"
            }`}
            onClick={() => setTheme(!theme)}
          >
            {theme ? (
              <p className="flex justify-center items-center ">
                {" "}
                <SunIcon className="h-6 w-6 text-blue-500" />
                <p>Dark</p>
              </p>
            ) : (
              <p className="flex justify-center items-center ">
                {" "}
                <SunIcon className="h-6 w-6 text-blue-500" />
                <p>Light</p>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
