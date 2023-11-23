/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import toast from "react-hot-toast";
import { ContextData } from "../../../Context";
import Loading from "../../../Shared/Loading/inde";

const Signup = () => {
  const {
    theme,
    siteName,
    imgbbAPIKey,
    loading,
    setLoading,
    userRole,
    setUserRole,
  } = useContext(ContextData);
  const { register, handleSubmit, reset } = useForm();
  const [errorMsg, setErrorMsg] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibled, setVisibled] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();

  let dataType = "";
  if (visible) {
    dataType = "text";
  } else {
    dataType = "password";
  }

  let dataTyped = "";
  if (visibled) {
    dataTyped = "text";
  } else {
    dataTyped = "password";
  }

  const onSubmit = async (data) => {
    // console.log(data.password);
    setLoading(true);
    let pass = data.password;
    let repass = data.rePassword;
    if (pass !== repass) {
      toast.error("Password Not Matched!!");
      return false;
    } else {
      //   console.log(data);
      const img = data.photo[0];
      const formData = new FormData();
      formData.append("image", img);

      const url = `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          if (imgData.success) {
            data.photo = imgData?.data.url;
            // console.log(data);
            fetch("http://localhost:5000/api/v1/signup", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.success) {
                  // console.log(data);
                  toast.success("Account create Successful.");
                  //   console.log(data?.data.email);
                  cookies.set("email", data?.data.email, { path: "/" });
                  cookies.set("name", data?.data.name, { path: "/" });
                  cookies.set("phone", data?.data.phone, { path: "/" });
                  // cookies.set("role", data?.data.role, { path: "/" });

                  cookies.set("id", data?.data._id, { path: "/" });
                  localStorage.setItem("photo", data?.data.photo);
                  localStorage.setItem(
                    "accessToken",
                    `bearer ${data?.data.accessToken}`
                  );
                  reset();
                  setLoading(false);
                  navigate("/");
                } else {
                  setLoading(false);
                  toast.error("Failed to Create Account");
                  setErrorMsg(data.message);
                }
              });
          }
        });
    }
  };
  return (
    <div>
      {loading && <Loading></Loading>}
      <section className="relative  flex justify-center items-center h-screen pt-44 lg:pt-20 ">
        <div className="w-full px-4 pt-4 pb-12 sm:px-6 sm:pb-16 lg:w-5/6  lg:px-8 ">
          <div className="mx-auto  text-center">
            <h1 className="text-3xl font-bold sm:text-4xl">
              Welcome to <span className="text-rose-700">{siteName}</span>
            </h1>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Create Your Account
            </h1>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            action=""
            className="mx-auto mb-0 mt-8 w-full md:w-[448px] lg:w-full"
          >
            <div className="max-w-md mx-auto">
              <label
                className={`block ${
                  theme ? "text-black" : "text-white"
                } my-2 font-bold`}
              >
                As a <span className="text-red-600">*</span>
              </label>
              <div className="relative border border-black p-2 rounded-full ">
                <div className="flex justify-around">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("role")}
                      value="buyer"
                      className="radio "
                      defaultChecked
                    />
                    <span className="ml-2">Buyer</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="radio"
                      {...register("role")}
                      value="seller"
                      className="radio"
                    />
                    <span className="ml-2">Seller</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
              <div className=" max-w-md">
                <label
                  className={`block ${
                    theme ? "text-black" : "text-white"
                  } my-2 font-bold`}
                >
                  Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    {...register("name", { required: true })}
                    className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>

              <div className=" max-w-md">
                <label
                  className={`block ${
                    theme ? "text-black" : "text-white"
                  } my-2 font-bold`}
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    {...register("email", { required: true })}
                    className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
              <div className=" max-w-md">
                <label
                  className={`block ${
                    theme ? "text-black" : "text-white"
                  } my-2 font-bold`}
                >
                  Phone <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Your Phone Number"
                    {...register("phone", { required: true })}
                    className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>

              <div className=" max-w-md">
                <label
                  className={`block ${
                    theme ? "text-black" : "text-white"
                  } my-2 font-bold`}
                >
                  Photo <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    {...register("photo", { required: true })}
                    className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center">
              <div className=" max-w-md">
                <label
                  className={`block ${
                    theme ? "text-black" : "text-white"
                  } my-2 font-bold`}
                >
                  Password <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={dataType}
                    placeholder="Set Your Password"
                    {...register("password", { required: true })}
                    className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                  {/* className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" */}

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <button onClick={() => setVisible(!visible)} type="button">
                      {visible ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </span>
                </div>
                {errorMsg && (
                  <p className=" mt-3 text-red-500    p-3">{errorMsg + "!!"}</p>
                )}
              </div>
              <div className=" max-w-md">
                <label
                  className={`block ${
                    theme ? "text-black" : "text-white"
                  } my-2 font-bold`}
                >
                  Re-Type Password <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={dataTyped}
                    placeholder="Re-Type Your Password"
                    {...register("rePassword", { required: true })}
                    className="w-full border  px-4 py-3 rounded-md border-gray-700 bg-white text-black focus:dark:border-violet-400"
                  />
                  {/* className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm" */}

                  <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                    <button
                      onClick={() => setVisibled(!visibled)}
                      type="button"
                    >
                      {visibled ? (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                            />
                          </svg>
                        </>
                      )}
                    </button>
                  </span>
                </div>
                {errorMsg && (
                  <p className=" mt-3 text-red-500    p-3">{errorMsg + "!!"}</p>
                )}
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="w-5/12 mt-6 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white hover:bg-blue-900 duration-150"
              >
                Create
              </button>
              <p className="text-sm text-gray-500">
                Already have an account?
                <Link to="/login">
                  <a className="underline ml-2 text-blue-900" href="">
                    Log in
                  </a>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Signup;
