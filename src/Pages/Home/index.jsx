import HomeBanner from "../../Components/HomeBanner";
import AllCategoriys from "./AllCategoriys";
import Discount from "./Discount";
import HomeProducts from "./HomeProduct";
import State from "./State";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <AllCategoriys />
      <HomeProducts />
      <State />
      <Discount />
    </div>
  );
};

export default Home;
