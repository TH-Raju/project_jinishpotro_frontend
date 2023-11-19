/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import WishList from "../WishList";

const FooterData = ({closeModal}) => {

  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-45"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <WishList closeModal={closeModal}/>
    </div>
  );
};

export default FooterData;
