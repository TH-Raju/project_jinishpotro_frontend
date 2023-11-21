import HomeBanner from "../../Components/HomeBanner";
import Discount from "./Discount";
import HomeProducts from "./HomeProduct";
import State from "./State";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <HomeProducts />
      <State />
      <Discount />
    </div>
  );
};

export default Home;
