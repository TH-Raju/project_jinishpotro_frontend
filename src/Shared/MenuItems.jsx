import { Link } from "react-router-dom";

/* eslint-disable no-unused-vars */
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
);
