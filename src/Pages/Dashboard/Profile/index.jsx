/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { ContextData } from "../../../Context";
import Cookies from "universal-cookie";

const Profile = () => {
  const { userRole } = useContext(ContextData);
  const cookies = new Cookies();
  const userName = cookies.get("name");
  return (
    <div className="w-[80%] mx-auto">
      <h1>
        Hi, {userName} you're {userRole}
      </h1>
    </div>
  );
};

export default Profile;
