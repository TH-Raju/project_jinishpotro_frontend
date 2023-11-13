import { useContext } from "react";
import { ContextData } from "../../Context";
import { SunIcon } from "@heroicons/react/24/solid";

import defaultPic from "../../assets/default.png";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

const Footer = () => {
  const { siteName, theme, setTheme } = useContext(ContextData);

  //   console.log(theme);
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const photo = localStorage.getItem("photo");
  const navigate = useNavigate();

  const handleLogout = async () => {
    cookies.remove("email", { path: "/" });
    cookies.remove("name", { path: "/" });
    cookies.remove("role", { path: "/" });
    cookies.remove("id", { path: "/" });
    localStorage.clear();
    navigate("/login");
  };
  const menuItems = (
    <>
      <li>
        <Link to="/">
          <p>Home</p>
        </Link>
      </li>
      <li>
        <Link to="/range">
          <p>Range</p>
        </Link>
      </li>
      <li>
        <Link to="/wishlist">
          <p>User</p>
        </Link>
      </li>
      {userEmail ? (
        <></>
      ) : (
        <>
          <li>
            <Link to="/login">
              <p>Login</p>
            </Link>
          </li>
          <li>
            <Link to="/signup">
              <p>Sign up</p>
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className={`navbar bg-gray-400 bottom-0 fixed lg:hidden pb-5`}>
        <div className="navbar-start">
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
              className="menu menu-sm -mt-48  dropdown-content  z-[1] p-2 shadow bg-gray-500 rounded-box w-52 text-white"
            >
              {menuItems}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl ">{siteName}</a>
        </div>
        <div className="navbar-end flex items-center gap-3">
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
          {userEmail && (
            <div className="dropdown dropdown-hover  dropdown-top ">
              <div className="avatar online mt-1">
                <div className="w-10 rounded-full">
                  <img
                    src={photo ? photo : defaultPic}
                    className="object-cover"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content -ml-28  z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
              >
                {/* <Link to={`/profile`}>
                <li className=" mb-2">
                  <button className="hover:bg-primary hover:text-white my-2 bg-sky-500  rounded-lg duration-100">
                    Profile
                  </button>
                </li>
              </Link> */}
                <Link to={`/dashboard`}>
                  <li className=" mb-2">
                    <button className="hover:bg-primary hover:text-white my-2 bg-sky-500  rounded-lg duration-100">
                      Dashboard
                    </button>
                  </li>
                </Link>
                <li className="">
                  <button
                    onClick={() => handleLogout()}
                    className="hover:bg-red-700 hover:text-white bg-red-500    rounded-lg duration-100"
                  >
                    <span>Log out</span>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menuItems}</ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
