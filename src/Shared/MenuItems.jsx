import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

/* eslint-disable no-unused-vars */
const cookies = new Cookies();
const userEmail = cookies.get("email");


const handleLogout = async () => {
  cookies.remove("email", { path: "/" });
  cookies.remove("name", { path: "/" });
  cookies.remove("role", { path: "/" });
  localStorage.clear();
};
export const menuItems = (
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
    {
      userEmail ? <> <li className="">
      <button
        onClick={() => handleLogout()}
        className="hover:bg-red-700 hover:text-white bg-red-500  my-2 md:my-0  rounded-lg duration-100"
      >
        <span>Log out</span>
      </button>
    </li></> 
      :
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
    }
  </>
);
