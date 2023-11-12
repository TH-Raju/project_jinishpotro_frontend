import { useContext } from "react";
import { ContextData } from "../../Context";
import { SunIcon } from "@heroicons/react/24/solid";
import { menuItems } from "../MenuItems";

const Footer = () => {
  const { siteName, theme, setTheme } = useContext(ContextData);

  //   console.log(theme);

  return (
    <div>
      <div className={`navbar bg-gray-400 bottom-0 fixed lg:hidden pb-5`}>
        <div className="navbar-start">
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
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
        <div className="navbar-end">
          <a className="btn btn-ghost normal-case text-xl ">{siteName}</a>

          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              className="menu menu-sm -mt-48 -ml-24 dropdown-content  z-[1] p-2 shadow bg-gray-500 rounded-box w-52 text-white"
            >
              {menuItems}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
