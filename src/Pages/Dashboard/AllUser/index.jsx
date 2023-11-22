/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "universal-cookie";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import ConfirmModal from "../../../Shared/ConfirmModal/inde";
import { ContextData } from "../../../Context";

const AllUser = () => {
  const { userRole } = useContext(ContextData);
  const [deleteUser, setDeleteUser] = useState(null);
  const cookies = new Cookies();
  const userEmail = cookies.get("email");
  const superAdmin = "super_admin";
  const closeModal = () => {
    setDeleteUser(null);
  };

  const { data: users = [], refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/api/v1/user");
      const data = await res.json();

      // Filter the data to exclude the user with a matching email
      const filteredData = data?.data?.filter(
        (user) => user.email !== userEmail && user.role !== "super_admin"
      );
      // refetch();

      return filteredData;
    },
  });
  //   console.log(users);
  // console.log(users.map((user) => user.role));
  const handleDeleteUser = (user) => {
    fetch(
      `http://localhost:5000/api/v1/user/delete/user/${user._id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("User Delete successfully");
          refetch();
        }
      });
  };

  const handleMakeAdmin = (id) => {
    fetch(
      `http://localhost:5000/api/v1/user/update/admin/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Make admin successful");
          refetch();
        }
      });
  };
  const handleMakeUser = (id) => {
    fetch(
      `http://localhost:5000/api/v1/user/update/to/user/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success ) {
          toast.success("Make User successful");
          refetch();
        }
      });
  };

  return (
    <div className="max-h-screen">
      <h2 className="  md:text-4xl text-2xl my-4 font-bold text-center">
        All User
      </h2>
      <Toaster />
      <div className="lg:w-[90%] w-[100%] mx-auto overflow-x-scroll rounded-lg ">
        <table className="mb-5  table min-w-full  text-sm bg-gray-100">
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Visit</th>
              {userRole === "super_admin" && (
                <>
                  <th>Make Admin</th>
                  <th>Delete</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) &&
              users?.map((user, i) => (
                <tr
                  key={user._id}
                  className="border border-gray-300  hover:bg-gray-200 duration-200"
                >
                  <th className="  ">{i + 1}</th>
                  <td className="">{user.name}</td>
                  <td className="">{user.email}</td>
                  <td className="">{user.role}</td>
                  <td className="">
                    <Link to={`/userDetails/${user._id}`}>
                      <EyeIcon className="h-6 text-center"></EyeIcon>
                    </Link>
                  </td>
                  {userRole === "super_admin" && (
                    <>
                      <td className="text-xs ">
                        {user?.role !== "admin" ? (
                          <button
                            onClick={() => handleMakeAdmin(user._id)}
                            className="btn bg-sky-700 hover:bg-sky-900 text-white btn-sm  "
                          >
                            Make Admin
                          </button>
                        ) : (
                          <button
                            onClick={() => handleMakeUser(user._id)}
                            className="btn btn-outline btn-success btn-sm"
                          >
                            <span className="text-black">Make User</span>
                          </button>
                        )}
                      </td>
                      <td>
                        <label
                          onClick={() => setDeleteUser(user)}
                          htmlFor="confirmation-modal"
                          className="btn bg-red-600 hover:bg-red-900 text-white  btn-sm "
                        >
                          Delete
                        </label>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {deleteUser && (
        <ConfirmModal
          title={`Are You sure you want to delete?`}
          message={`If You delete ${deleteUser.name}. It cannot be undone.`}
          closeModal={closeModal}
          successButtonName="Delete"
          successAction={handleDeleteUser}
          modalData={deleteUser}
        ></ConfirmModal>
      )}
    </div>
  );
};

export default AllUser;
