/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { ContextData } from "../../../Context";
import { EyeIcon, XMarkIcon, TrashIcon } from "@heroicons/react/24/solid";
import Cookies from "universal-cookie";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Loading from "../../../Shared/Loading/inde";

const Profile = () => {
  const { userRole, loading, setLoading } = useContext(ContextData);
  const [stateName, setStateName] = useState("order");
  const [activeTab, setActiveTab] = useState("order");
  const cookies = new Cookies();
  const userName = cookies.get("name");
  const userPhone = cookies.get("phone");
  const userEmail = cookies.get("email");
  const userId = cookies.get("id");
  const userPhoto = localStorage.getItem("photo");

  const stateChange = (d) => {
    setStateName(d);
    setActiveTab(d);
  };

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["personalOrders"],
    queryFn: async () => {
      let url = `http://localhost:5000/api/v1/order`;
      const res = await fetch(url);
      const data = await res.json();
      const filteredOrder = await data?.data?.filter(
        (order) => order?.userId === userId
      );
      return filteredOrder;
    },
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["CategoriyProducts"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/api/v1/categoriy/`);
      const data = await res.json();

      return data.data;
    },
  });
  // console.log(categories);
  let allProduct = [];

  categories.forEach((category) => {
    allProduct.push(
      ...category.products.map((product) => ({
        ...product,
        categoryId: category._id,
      }))
    );
  });
  allProduct = allProduct.filter((pro) => pro.sellerId === userId);
  // console.log(allProduct);

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
  const delteProduct = (cId, pId) => {
    // console.log(cId);
    // console.log(pId);
    fetch(`http://localhost:5000/api/v1/categoriy/${cId}/products/${pId}`, {
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

  return (
    <div className="w-[80%] mx-auto">
      {loading && <Loading />}
      <h1>
        Hi, {userName} you're {userRole}
      </h1>
      <div className="w-[80%] mx-auto">
        <div className="card lg:card-side shadow-xl justify-between">
          <figure>
            <PhotoProvider>
              <PhotoView src={userPhoto}>
                <img src={userPhoto} className="h-40" alt="Album" />
              </PhotoView>
            </PhotoProvider>
          </figure>
          <div className="card-body">
            <h2 className="card-title text-3xl font-bold">{userName}</h2>
            <div>
              <p>Email: {userEmail}</p>
              <p>Phone: {userPhone}</p>
              <p>
                Profile: <span className="font-bold">{userRole}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* new */}
      <div>
        <div className="w-[90%] mx-auto">
          <div className="tabs my-3">
            <button
              className={`tab tab-lifted text-lg ${
                activeTab === "order" ? "tab-active" : ""
              }`}
              onClick={() => stateChange("order")}
            >
              Your Orders
            </button>
            <button
              className={`tab tab-lifted text-lg ${
                activeTab === "product" ? "tab-active" : ""
              }`}
              onClick={() => stateChange("product")}
            >
              Your Product
            </button>
            <button
              className={`tab tab-lifted text-lg ${
                activeTab === "family" ? "tab-active" : ""
              }`}
              onClick={() => stateChange("family")}
            >
              Family Information
            </button>
          </div>

          {/* order  */}

          <div>
            {stateName === "order" && (
              <>
                <h1 className="text-center text-2xl border border-blue-700 rounded-full font-bold mb-5">
                  Order Information
                </h1>
                <div className="overflow-x-auto">
                  <table className="table leading-3">
                    <thead className="text-gray-300">
                      <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>View</th>
                        <th>Cancel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.map((order) => (
                        <tr key={order._id} className="hover ">
                          <td className=" font-bold">{order.productName}</td>
                          <td className=" font-bold">{order.quantity}</td>
                          <td className=" font-bold">{order.status}</td>
                          <td className=" font-bold">
                            <Link
                              to={`/categoriy/${order.categoryId}/${order.productId}`}
                            >
                              <button className="btn btn-xs btn-info ml-2">
                                <EyeIcon className="h-4 w-4 text-white font-bold" />{" "}
                              </button>
                            </Link>
                          </td>
                          <td className=" font-bold">
                            <button
                              className="btn btn-xs btn-error ml-2"
                              onClick={() => delteOrder(order._id)}
                            >
                              <XMarkIcon className="h-4 w-4 text-white font-bold" />{" "}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
          {/* product  */}
          <div>
            {stateName === "product" && (
              <div>
                <h1 className="text-center text-2xl border border-blue-700 rounded-full font-bold mb-5 ">
                  Product Information
                </h1>
                <div className="overflow-x-auto">
                  <table className="table leading-3">
                    <thead className="text-gray-300">
                      <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>View</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allProduct?.map((order) => (
                        <tr key={order._id} className="hover ">
                          <td className=" ">{order.name}</td>
                          <td className=" ">{order.price}</td>
                          <td className=" ">{order.discount}</td>
                          <td className=" ">
                            <Link
                              to={`/categoriy/${order.categoryId}/${order._id}`}
                            >
                              <button className="btn btn-xs btn-info ml-2">
                                <EyeIcon className="h-4 w-4 text-white font-bold" />{" "}
                              </button>
                            </Link>
                          </td>
                          <td className=" font-bold">
                            <button
                              className="btn btn-xs btn-error ml-2"
                              onClick={() =>
                                delteProduct(order.categoryId, order._id)
                              }
                            >
                              <TrashIcon className="h-4 w-4 text-white font-bold" />{" "}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Family  */}
          <div>
            {stateName === "family" && (
              <>
                <h1 className="text-center text-2xl border border-blue-700 rounded-full font-bold mb-5 ">
                  Family Information
                </h1>
                <table className="table leading-3">
                  {/* <tbody>
                    <tr className="hover">
                      <th className="font-normal"> Father Occupation : </th>
                      <td>
                        <span className=" font-bold">{fatherOccupation}</span>{" "}
                      </td>
                    </tr>
                    <tr className="hover">
                      <th className="font-normal"> Mother Occupation : </th>
                      <td>
                        <span className=" font-bold">{motherOccupation}</span>{" "}
                      </td>
                    </tr>
                    <tr className="hover">
                      <th className="font-normal"> Brother : </th>
                      <td>
                        <span className=" font-bold">{brother}</span>{" "}
                      </td>
                    </tr>
                    <tr className="hover">
                      <th className="font-normal"> Sister : </th>
                      <td>
                        <span className=" font-bold">{sister}</span>{" "}
                      </td>
                    </tr>
                    <tr className="hover">
                      <th className="font-normal">About Family : </th>
                      <td>
                        <span className=" font-bold">{myfamily}</span>{" "}
                      </td>
                    </tr>
                  </tbody> */}
                </table>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
