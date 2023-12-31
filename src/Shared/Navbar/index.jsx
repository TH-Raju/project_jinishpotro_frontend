import { useContext, useState } from "react";
import { ContextData } from "../../Context";
import { ShoppingCartIcon, SunIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import defaultPic from "../../assets/default.png";
import CardData from "../../Components/CardData";
import logo from "../../assets/jp.png";

const Navbar = () => {
  const { siteName, theme, setTheme } = useContext(ContextData);
  const [isModalVisible, setModalVisible] = useState(false);
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

  let wishlist = [];
  let totalData = 0;
  const savedWishlist = localStorage.getItem("wishlist");
  if (savedWishlist) {
    wishlist = JSON.parse(savedWishlist);
    updateTotalData();
  }

  function updateTotalData() {
    totalData = wishlist.length;
    // console.log(totalData);
  }

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const menuItems = (
    <>
      <li>
        <Link to="/">
          <p>Home</p>
        </Link>
      </li>
      <li>
        <Link to="/products">
          <p>Products</p>
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
    <div className="lg:block hidden text-white">
      <div className="navbar fixed top-0 z-40 bg-rose-900  lg:w-[1400px] mx-auto  px-5">
        <div className="navbar-start ">
          <div className="dropdown"></div>
          <div className="flex items-center">
            <img src={logo} className="h-10 mt-2 -mr-3" alt="" />
            <Link className="btn btn-ghost normal-case text-xl ">
              {siteName}
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-md font-bold">
            {menuItems}
          </ul>
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

          <div>
            <div className="drawer drawer-end z-40">
              <input
                id="my-drawer-44"
                type="checkbox"
                className="drawer-toggle"
              />
              <label
                onClick={() => openModal()}
                htmlFor="my-drawer-44"
                className="btn drawer-button  border border-none bg-transparent"
              >
                <h2 className="card-title relative">
                  <ShoppingCartIcon className="h-6 w-6  text-blue-500" />
                </h2>
                <div className="badge badge-secondary badge-sm mb-8 ml-10 absolute  ">
                  {totalData ? totalData : 0}
                </div>
              </label>
              {isModalVisible && <CardData closeModal={closeModal} />}
            </div>
          </div>
          {userEmail && (
            <div className="dropdown dropdown-hover  dropdown-end hidden lg:block ">
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
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40"
              >
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
      </div>
    </div>
  );
};

export default Navbar;
