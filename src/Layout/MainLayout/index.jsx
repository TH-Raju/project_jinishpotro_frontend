import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar";
import Footer from "../../Shared/Footer";

const MainLayout = () => {
  return (
    <div className="w-full lg:w-[1400px] mx-auto ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
