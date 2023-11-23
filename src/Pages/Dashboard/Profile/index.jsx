/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { ContextData } from "../../../Context";
import Cookies from "universal-cookie";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";


const Profile = () => {
  const { userRole } = useContext(ContextData);
  const [stateName, setStateName] = useState("personal");
  const cookies = new Cookies();
  const userName = cookies.get("name");
  const userPhone = cookies.get("phone");
  const userEmail = cookies.get("email");
  const userPhoto = localStorage.getItem("photo");
  return (
    <div className="w-[80%] mx-auto">
      <h1>
        Hi, {userName} you're {userRole}
      </h1>
      <div className="w-[80%] mx-auto">
        <div className="card lg:card-side shadow-xl justify-between">
          <figure>
            <PhotoProvider>
              <PhotoView src={userPhoto}>
                <img src={userPhoto} className="h-40" alt="Album" />
              </PhotoView>
            </PhotoProvider>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold">{userName}</h2>
            <div>
              <p>Email: {userEmail}</p>
              <p>Phone: {userPhone}</p>
              <p>Profile: <span className="font-bold">{userRole}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
