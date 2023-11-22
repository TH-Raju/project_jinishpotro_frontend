/* eslint-disable react/prop-types */
import WishList from "../WishList";

const CardData = ({closeModal}) => {
  return (
     
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-44"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <WishList closeModal={closeModal}/>
      </div>
  );
};

export default CardData;


