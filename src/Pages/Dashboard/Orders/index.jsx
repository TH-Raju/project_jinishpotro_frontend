/* eslint-disable no-unused-vars */
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Cookies from "universal-cookie";
import { ContextData } from "../../../Context";

const Orders = () => {
  const { loading, setLoading, orderRole, setorderRole } =
    useContext(ContextData);
  const cookies = new Cookies();
  const orderEmail = cookies.get("email");
  let [filterData, setFilterData] = useState([]);

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      let url = `http://localhost:5000/api/v1/order`;

      const res = await fetch(url);
      const data = await res.json();

      // Filter the data to exclude the order with a matching email
      //   const filteredData = data?.message?.filter(
      //     (order) =>
      //       order.email !== orderEmail &&
      //       order.role !== "super_admin" &&
      //       order.role !== "admin" &&
      //       order?.purchesPackage?.status === "active"
      //   );
      // refetch();

      return data.data;
      //   return filteredData;
    },
  });
  // console.log(orders);

  const handleOnchange = (e) => {
    const productName = e.target.value;
    // console.log(productName);

    const filterproductName = orders.filter(
      (item) => item?.productName === productName
    );

    setFilterData(filterproductName);
    // if (filterproductName) {
    //   console.log(filterproductName);
    // }
  };

  const clearFilter = () => {
    filterData = [];
    setFilterData(filterData);
    // console.log(filterData);
  };

  let totalAmount = 0;
  //   console.log(filterData);
  if (filterData.length > 0) {
    filterData.forEach((order) => {
      totalAmount += order?.totalPrice || 0;
    });
  } else {
    orders.forEach((order) => {
      totalAmount += parseFloat(order?.totalPrice) || 0;
    });
  }

  const uniqueProductName = [
    ...new Set(orders.map((order) => order?.productName)),
  ];

  // console.log(parseInt(totalAmount));

  return (
    <div>
      <div className="my-4">
        <span className="font-bold ml-4">Filter Data :</span>
        <select
          className="select select-primary ml-4"
          onChange={handleOnchange}
        >
          <option disabled selected>
            Select
          </option>

          {uniqueProductName.map((productName, i) => (
            <option key={i} value={productName}>
              {productName}
            </option>
          ))}
        </select>

        {filterData.length > 0 && (
          <button className="btn btn-primary  mx-3" onClick={clearFilter}>
            Reset
          </button>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SN</th>
              <th>Client Name</th>
              <th>Client Number</th>
              <th>Product</th>
              <th>Product status</th>
              <th>Bkash Number</th>
              <th>Bkash Transaction</th>
              <th>Price</th>
            </tr>
          </thead>
          {filterData.length > 0 ? (
            <>
              <tbody>
                {/* row 1 */}
                {filterData?.map((order, i) => (
                  <tr key={order._id}>
                    <th>{i + 1}</th>
                    <td>{order?.userName}</td>
                    <td>{order?.userPhone}</td>
                    <td>{order?.productName}</td>
                    <td>
                      <button className="btn btn-xs btn-success">
                        <CheckIcon className="h-4 w-4 text-white font-bold" />{" "}
                      </button>
                      <button className="btn btn-xs btn-error ml-2">
                        <XMarkIcon className="h-4 w-4 text-white font-bold" />{" "}
                      </button>
                    </td>
                    <td>{order?.sendMoney}</td>
                    <td>{order?.transaction}</td>
                    <td>{order?.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </>
          ) : (
            <>
              <tbody>
                {/* row 1 */}
                {orders?.map((order, i) => (
                  <tr key={order._id}>
                    <th>{i + 1}</th>
                    <td>{order?.userName}</td>
                    <td>{order?.userPhone}</td>
                    <td>{order?.productName}</td>

                    <td>
                      <button className="btn btn-xs btn-success">
                        <CheckIcon className="h-4 w-4 text-white font-bold" />{" "}
                      </button>
                      <button className="btn btn-xs btn-error ml-2">
                        <XMarkIcon className="h-4 w-4 text-white font-bold" />{" "}
                      </button>
                    </td>
                    <td>{order?.sendMoney}</td>
                    <td>{order?.transaction}</td>
                    <td>{order?.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </>
          )}
        </table>
        <hr />
      </div>
      <div className="flex justify-end mr-3 lg:mr-20 font-bold text-md">
        <h1 className="mr-5 font-medium">Total Amount </h1>
        <h1>{totalAmount} tk</h1>
      </div>
    </div>
  );
};

export default Orders;
