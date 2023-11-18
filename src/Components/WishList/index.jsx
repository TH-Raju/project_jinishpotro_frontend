/* eslint-disable no-unused-vars */
const WishList = () => {
  let wishlist = [];
  const savedWishlist = localStorage.getItem("wishlist");
  if (savedWishlist) {
    wishlist = JSON.parse(savedWishlist);
  }

  return (
    <ul className="menu   w-80 min-h-full bg-base-200 text-base-content">
      {/* Sidebar content here */}

      {
      wishlist.map((wish) => (
        <li key={wish._id} className="border border-sky-400">
          <div className="flex justify-between gap-2">
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
            <div>
              <button className="btn btn-sm btn-primary">ok</button>
              <button className="btn btn-sm btn-warning ml-1">No</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default WishList;
