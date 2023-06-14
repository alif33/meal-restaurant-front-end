import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../__lib__/helpers/HttpService";
import { activeResturant } from "../store/resturant/actions";
import { toast } from "react-hot-toast";

const SeoForm = ({ children, seoForm, setSeoForm }) => {
  const { admin, resturant } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    updateData(
      `/restaurant?_id=${resturant?.activeResturant?._id}`,
      data,
      admin?.token
    ).then((res) => {
      if (res.success) {
        dispatch(activeResturant(res.restaurant));
        setSeoForm(!seoForm);
        toast.success(`${res.message}`);
      }
    });
  };
  return (
    <>
      <div
        onClick={() => setSeoForm(!seoForm)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[13px] flex">
            <span className="mr-2">
              <img width="24" height="24" src="/img/seo-svgrepo-com 1.png" alt="" />
            </span>
            SEO
          </h4>
          <button
            onClick={() => setSeoForm(!seoForm)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              GMB Domain:
            </label>
            <input
              className="input w-full border-2 h-[40.85px] p-3 "
              type="text"
              defaultValue={resturant?.activeResturant?.gbmDomain}
              placeholder=""
              {...register("gbmDomain", {
                required: "GMB Domain is required.",
              })}
            />
            {errors.gbmDomain?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.gbmDomain?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Own Website:
            </label>
            <input
              className="input w-full border-2 h-[40.85px] p-3"
              type="text"
              defaultValue={resturant?.activeResturant?.gbmWebsite}
              placeholder=""
              {...register("gbmWebsite", {
                required: "Own Website is required.",
                pattern: {
                  value:
                    /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
                  message: "Enter a valid Website",
                },
              })}
            />
            {errors.gbmWebsite?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.gbmWebsite?.message}
              </span>
            )}
            {errors.gbmWebsite?.type === "pattern" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.gbmWebsite?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              GMB Status:
            </label>
            <input
              className="input w-full border-2 h-[40.85px] p-3"
              type="text"
              defaultValue={resturant?.activeResturant?.gbmStatus}
              placeholder=""
              {...register("gbmStatus", {
                required: "GMB Status is required.",
              })}
            />
            {errors.gbmStatus?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.gbmStatus?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              GMB Role:
            </label>
            <input
              className="input w-full border-2 h-[40.85px] p-3"
              type="text"
              defaultValue={resturant?.activeResturant?.gbmRole}
              placeholder=""
              {...register("gbmRole", {
                required: "GMB Role is required.",
              })}
            />
            {errors.gbmRole?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.gbmRole?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              MealNow Domain:
            </label>
            <input
              className="input w-full border-2 h-[40.85px] p-3"
              type="text"
              defaultValue={resturant?.activeResturant?.mealDomain}
              placeholder=""
              {...register("mealDomain", {
                required: "MealNow Domain is required.",
              })}
            />
            {errors.mealDomain?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.mealDomain?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              GMB Email:
            </label>
            <input
              className="input w-full border-2 h-[40.85px] p-3"
              type="text"
              defaultValue={resturant?.activeResturant?.gbmEmail}
              placeholder=""
              {...register("gbmEmail", {
                required: "Menu Rep. Name is required.",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Enter a valid Email",
                },
              })}
            />
            {errors.gbmEmail?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.gbmEmail?.message}
              </span>
            )}
            {errors.gbmEmail?.type === "pattern" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.gbmEmail?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Password:
            </label>
            <input
              className="input w-full border-2 h-[40.85px] p-3"
              type="text"
              defaultValue={resturant?.activeResturant?.password}
              placeholder=""
              {...register("password", {
                required: "Password is required.",
              })}
            />
            {errors.password?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.password?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              GMB Owner:
            </label>
            <input
              className="input w-full border-2 h-[40.85px] p-3"
              type="text"
              defaultValue={resturant?.activeResturant?.gbmOwner}
              placeholder=""
              {...register("gbmOwner", {
                required: "GMB Owner is required.",
              })}
            />
            {errors.gbmOwner?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.gbmOwner?.message}
              </span>
            )}{" "}
          </div>
          <div className="flex items-center mt-9 pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() => setSeoForm(!seoForm)}
              className={` border border-solid  rounded-3xl flex justify-center items-center hover:text-white py-3 px-4  font-mono bg-transparent text-black transition-all duration-300 ease-in-out capitalize text-xs hover:bg-[#00c220] border-[#00c220] w-auto`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={` border border-solid  rounded-3xl flex justify-center items-center text-white py-3 px-4  font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out capitalize text-xs auto bg-[#00c220] border-[#00c220]`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SeoForm;
