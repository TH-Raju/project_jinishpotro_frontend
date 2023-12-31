/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
/* eslint-disable no-unused-vars */
const WishList = ({ closeModal }) => {
  const navigate = useNavigate();
  let wishlist = [];
  const savedWishlist = localStorage.getItem("wishlist");
  if (savedWishlist) {
    wishlist = JSON.parse(savedWishlist);
  }
  let totalData = 0;
  function updateTotalData() {
    totalData = wishlist.length;
    // console.log(totalData);
  }

  function saveWishlistToLocalStorage() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }

  function removeFromWishlist(productId, cId) {
    wishlist = wishlist.filter((item) => item.pId !== productId);
    // Update totalData
    updateTotalData();
    // console.log(wishlist);

    // Save wishlist to localStorage
    saveWishlistToLocalStorage();
  }

  const remove = () => {
    closeModal();
    navigate(`/`);
    toast.success("Product removed from wishlist.");
  };
  const buy = () => {
    // navigate(`/categoriy/${cId}/${productId}`);
    toast.success("Please Confirm Your Order.");
  };

  const confirmOrder = (pId, cId) => {
    closeModal();
    navigate(`/categoriy/${cId}/${pId}`);
    removeFromWishlist(pId, cId);
    setTimeout(() => {
      document.getElementById(pId).showModal();
    }, 1000);
  };

  return (
    <ul className="menu   w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}

      {wishlist.map((wish) => (
        <li key={wish.pId} className=" border border-sky-400 my-2">
          <div>
            <Link
              to={`/categoriy/${wish.cId}/${wish.pId}`}
              className="grid grid-cols-2 gap-2"
            >
              <div>
                <img src={wish.photo} className="h-14" alt="" />
              </div>
              <div>
                <h1>{wish.name}</h1>
                <h1>
                  Price:
                  <span className="font-bold"> {wish.price}</span>
                </h1>
              </div>
            </Link>
            <div>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => {
                  confirmOrder(wish.pId, wish.cId);
                  buy();
                }}
              >
                ok
              </button>
              <button
                className="btn btn-sm btn-warning ml-1"
                onClick={() => {
                  removeFromWishlist(wish.pId, wish.cId);
                  remove();
                }}
              >
                No
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WishList;
