import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import {  useSelector, useDispatch } from "react-redux";
import Spinner from "../components/common/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { LogedIn } from "../store/auth/actions";
import { postData } from "../__lib__/helpers/HttpService";

const Login = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const {
      register,
      reset,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const { auth } = useSelector(state=>state);
    const navigate = useNavigate();


    const onError = (err) => console.log(err)

    const onSubmit = (data) => {
      setLoading(true);
      postData("/signin", data)
      .then((res) => {
        setLoading(false);
        if (res?.success) {
          const { token, user } = res;
          toast.success(res?.message);

          dispatch(
            LogedIn({
              user,
              token
            })
          );
          reset();
          navigate("/dashboard");
        }
        if(res?.invalid){
          toast.error(res?.message);
        }
      })
      .catch(err=>{
        console.log(err);
        setLoading(false);
      })
    };

    console.log(loading, "Loading");

    return (
      <div>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="card-img w-36 h-40 absolute top-[5%] left-[5%] ">
          <img width="249" height="285" src="/img/meal-now-logo.png" alt="" />
        </div>
  
        <div className=" w-6/12 mx-auto bg-white shadow-[0_0_20px_3px_#c3c3c3] py-12 px-5 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] ">
          <form 
            onSubmit={handleSubmit(onSubmit, onError)}
            className="w-2/3 mx-auto">
            <h4 className=" text-[#717171] text-2xl mb-10 font-mono font-semibold ">
              MealNow Admin
            </h4>
  
            <div className=" mt-6 border  border-solid border-[#E1E1E1] relative  ">
              <label
                htmlFor="email"
                className="text-sm absolute bg-white -top-2 left-4 "
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                className="bg-[#fff] w-full py-3 px-4 text-black text-base active:bg-transparent focus:bg-transparent focus-visible:bg-transparent focus-within:bg-transparent "
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Enter a valid email",
                  },
                })}
              />
            </div>
            <div>
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-xs text-red-600">
                    {errors?.email?.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-xs text-red-600">
                    {errors?.email?.message}
                  </span>
                )}
              </label>
            </div>
            <div className=" mt-6 border  border-solid border-[#E1E1E1] relative  ">
              <label
                htmlFor="password"
                className="text-sm absolute bg-white -top-2 left-4 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-[#fff] w-full py-3 px-4 text-black text-base focus:bg-transparent focus-visible:bg-transparent focus-within:bg-transparent "
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password required",
                  },
                })}
              />
            </div>
            <div>
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-xs text-red-600">
                    {errors?.password?.message}
                  </span>
                )}
              </label>
            </div>
            <div className="flex items-center justify-between mt-10 ">
              <p className=" text-[#212121] text-sm font-mono ">
                <Link to="/forget-password">
                  Forget password?
                </Link>
              </p>
              <button type="submit" disabled={loading} className=" bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white text-md font-mono hover:bg-transparent transition-all duration-300 ease-in-out focus:outline-none active:outline-none  hover:text-black cursor-pointer py-2 px-12 font-semibold">
                {
                  loading? <Spinner/> :"LOGIN"
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;