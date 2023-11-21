/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { ContextData } from "../../../Context";
import { useQuery } from "@tanstack/react-query";

const State = () => {
  const { siteName, theme } = useContext(ContextData);

  const { data: categories } = useQuery({
    queryKey: ["categorieProduct"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/categoriy");
      const data = await res.json();
      return data.data;
    },
  });
  const { data: users } = useQuery({
    queryKey: ["allUser"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/user");
      const data = await res.json();
      return data.data;
    },
  });
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let monthName = months[month];

  function formatNumber(number) {
    if (number >= 1000 && number < 10000) {
      return (number / 1000).toFixed(1) + "k";
    } else if (number >= 10000) {
      return (number / 1000).toFixed(0) + "k";
    } else {
      return number?.toString();
    }
  }
  let totalProduct = 0;

  categories?.map((cat) => (totalProduct += cat.products.length));
  //   console.log(totalProduct);
  function calculatePercentage(value, total) {
    return total > 0 ? ((value / total) * 100).toFixed(0) : 0;
  }

  let totalCategoriy = categories?.length;
  let totalUser = users?.length;
  let formatCategoriyNumber = formatNumber(totalCategoriy);
  let formatProductNumber = formatNumber(totalProduct);
  let formatUserNumber = formatNumber(totalUser);

  return (
    <div className="text-center my-20">
      <div>
        <h1 className="text-3xl sm:text-5xl font-extrabold my-4">
          {siteName} <span className="text-rose-700 ">States</span>
        </h1>
      </div>
      <div className={`stats  stats-vertical lg:stats-horizontal  shadow `}>
        <div className="stat place-items-center">
          <div className="stat-title">Categoriy</div>
          <div className="stat-value">{formatCategoriyNumber}</div>
          <div className="stat-desc">
            From 2023 January 1st to {year} {monthName} {day}
            {day < 10 ? `${"st"}` : `${"th"}`}
          </div>
        </div>

        <div className="stat place-items-center border border-rose-900 border-l-2">
          <div className="stat-title">Users</div>
          <div className="stat-value text-secondary">{formatUserNumber}</div>
          <div className="stat-desc text-secondary">
            From 2023 January 1st to {year} {monthName} {day}
            {day < 10 ? `${"st"}` : `${"th"}`}
          </div>
        </div>

        <div className="stat place-items-center border border-rose-900 border-l-2">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{formatProductNumber}</div>
          <div className="stat-desc">
            <span role="img" aria-label="down-arrow">
              ⬆︎
            </span>{" "}
            {totalProduct} ({calculatePercentage(totalProduct, totalCategoriy)}
            %)
          </div>
        </div>
      </div>
    </div>
  );
};

export default State;
