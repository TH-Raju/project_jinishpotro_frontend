/* eslint-disable no-unused-vars */
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Cookies from "universal-cookie";
import { ContextData } from "../../../Context";
import toast from "react-hot-toast";
import Loading from "../../../Shared/Loading/inde";

const Orders = () => {
  const { loading, setLoading, orderRole, setorderRole, userRole } =
    useContext(ContextData);
  const cookies = new Cookies();
  const orderEmail = cookies.get("email");
  const userId = cookies.get("id");
  let [filterData, setFilterData] = useState([]);
  let actualData = [];
  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      let url = `http://localhost:5000/api/v1/order`;

      const res = await fetch(url);
      const data = await res.json();

      // Filter the data to exclude the order with a matching email
      // const filteredData = data?.message?.filter(
      //   (order) =>
      //     order.email !== orderEmail &&
      //     order.role !== "super_admin" &&
      //     order.role !== "admin" &&
      //     order?.purchesPackage?.status === "active"
      // );
      // refetch();
      if (userRole === "seller") {
        const filteredOrder = await data?.data?.filter(
          (order) => order?.sellerId === userId
        );
        return filteredOrder;
      } else {
        return data.data;
      }
      // console.log(filteredOrder);

      // return filteredOrder;
      //   console.log("seller");
      // }

      // return data.data;
    },
  });
  // console.log(orders);
  // console.log(userId);

  if (userRole === "seller") {
    const filteredOrder = orders?.filter((order) => order?.sellerId === userId);
    actualData = filteredOrder;
    // console.log(filteredOrder);
  } else {
    actualData = orders;
  }
  // console.log(actualData);

  const handleOnchange = (e) => {
    const categoryName = e.target.value;
    // console.log(productName);

    const filterproductName = orders.filter(
      (item) => item?.categoryName === categoryName
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
    ...new Set(orders.map((order) => order?.categoryName)),
  ];

  //   console.log(uniqueProductName);
  // console.log(parseInt(totalAmount));

  const delteOrder = (data) => {
    // console.log(data);
    fetch(`http://localhost:5000/api/v1/order/${data}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.acknowledged) {
          // console.log(result);
          setLoading(false);
          toast.success("Successfully Delete");
          refetch();
          //   console.log(result);
        }
      });
  };

  const updateOrder = (data) => {
    // console.log(data);
    data.status = "Confirm";
    fetch(`http://localhost:5000/api/v1/order/update/${data._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          // console.log(result);
          setLoading(false);
          toast.success("Order Confirmed");
          refetch();
          //   console.log(result);
        }
      });
  };
  const cancelOrder = (data) => {
    // console.log(data);
    data.status = "Cancel";
    fetch(`http://localhost:5000/api/v1/order/update/${data._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          // console.log(result);
          setLoading(false);
          toast.success("Order Canceled");
          refetch();
          //   console.log(result);
        }
      });
  };

  return (
    <div className="w-[90%] mx-auto ">
      {loading && <Loading />}
      <div className="my-4">
        <span className="font-bold ml-4">Filter Data :</span>
        <select
          className="select select-primary ml-4 text-black"
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
          <thead className="text-gray-300">
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
                      {order.status === "Pending" ? (
                        <div className="text-center">
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() => updateOrder(order)}
                          >
                            <CheckIcon className="h-4 w-4 text-white font-bold" />{" "}
                          </button>
                          <button
                            className="btn btn-xs btn-error ml-2"
                            onClick={() => cancelOrder(order)}
                          >
                            <XMarkIcon className="h-4 w-4 text-white font-bold" />{" "}
                          </button>
                        </div>
                      ) : (
                        <>
                          {order.status === "Pending" ? (
                            <>
                              <button
                                className="btn btn-xs btn-success"
                                onClick={() => updateOrder(order)}
                              >
                                <CheckIcon className="h-4 w-4 text-white font-bold" />{" "}
                              </button>
                              <button
                                className="btn btn-xs btn-error ml-2"
                                onClick={() => cancelOrder(order)}
                              >
                                <XMarkIcon className="h-4 w-4 text-white font-bold" />{" "}
                              </button>
                            </>
                          ) : (
                            <>
                              {order?.status === "Confirm" ? (
                                <>
                                  <button className="btn w-full btn-success btn-xs text-sm">
                                    Confirmed
                                  </button>
                                </>
                              ) : (
                                <div className="text-center">
                                  <button
                                    className="btn btn-error w-full btn-xs text-sm "
                                    onClick={() => delteOrder(order?._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
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
                {actualData?.map((order, i) => (
                  <tr key={order._id}>
                    <th>{i + 1}</th>
                    <td>{order?.userName}</td>
                    <td>{order?.userPhone}</td>
                    <td>{order?.productName}</td>

                    <td>
                      {order.status === "Pending" ? (
                        <div className="text-center">
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() => updateOrder(order)}
                          >
                            <CheckIcon className="h-4 w-4 text-white font-bold" />{" "}
                          </button>
                          <button
                            className="btn btn-xs btn-error ml-2"
                            onClick={() => cancelOrder(order)}
                          >
                            <XMarkIcon className="h-4 w-4 text-white font-bold" />{" "}
                          </button>
                        </div>
                      ) : (
                        <>
                          {order.status === "Pending" ? (
                            <>
                              <button
                                className="btn btn-xs btn-success"
                                onClick={() => updateOrder(order)}
                              >
                                <CheckIcon className="h-4 w-4 text-white font-bold" />{" "}
                              </button>
                              <button
                                className="btn btn-xs btn-error ml-2"
                                onClick={() => cancelOrder(order)}
                              >
                                <XMarkIcon className="h-4 w-4 text-white font-bold" />{" "}
                              </button>
                            </>
                          ) : (
                            <>
                              {order?.status === "Confirm" ? (
                                <>
                                  <button className="btn w-full btn-success btn-xs text-sm">
                                    Confirmed
                                  </button>
                                </>
                              ) : (
                                <div className="text-center">
                                  <button
                                    className="btn btn-error w-full btn-xs text-sm "
                                    onClick={() => delteOrder(order?._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              )}
                            </>
                          )}
                        </>
                      )}
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
