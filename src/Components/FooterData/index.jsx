import WishList from "../WishList";

const FooterData = () => {
  return (
    <div className="drawer-side">
      <label
        htmlFor="my-drawer-45"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <WishList />
    </div>
  );
};

export default FooterData;
