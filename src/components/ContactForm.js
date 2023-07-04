// import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import Contact from "../../../public/img/contact-svgrepo-com 1 (1).png";
import { activeRestaurant } from "../store/restaurant/actions";
import { updateData } from "../__lib__/helpers/HttpService";
import { toast } from "react-hot-toast";

const ContactForm = ({ contactForm, setContactForm, children }) => {
  const { admin, restaurant } = useSelector((state) => state);

  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    updateData(
      `/restaurant?_id=${restaurant?.activeRestaurant?._id}`,
      data,
      admin?.token
    ).then((res) => {
      if (res.success) {
        dispatch(activeRestaurant(res.restaurant));
        setContactForm(!contactForm);
        toast.success(`${res.message}`);
      }

    });
  };
  return (
    <>
      <div
        onClick={() => setContactForm(!contactForm)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[13px] flex">
            <span className="mr-2">
              <img width="24" height="24" src="/img/contact-svgrepo-com 1 (1).png" alt="" />
            </span>
            Contact
          </h4>
          <button
            onClick={() => setContactForm(!contactForm)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Owners Name:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.ownerName ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.ownerName}
              placeholder=""
              {...register("ownerName", {
                required: "Owner Name is required.",
              })}
            />
            <label className="label">
              {errors.ownerName?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.ownerName?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Owners Phone:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.ownerPhone ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.ownerPhone}
              placeholder=""
              {...register("ownerPhone", {
                required: "Owner Phone is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />
            <label className="label">
              {errors.ownerPhone?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.ownerPhone?.message}
                </span>
              )}
              {errors.ownerPhone?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.ownerPhone?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Owners Email:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.ownerEmail ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.ownerEmail}
              placeholder=""
              {...register("ownerEmail", {
                required: "Owner Email is required.",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Enter a valid Email",
                },
              })}
            />
            <label className="label">
              {errors.ownerEmail?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.ownerEmail?.message}
                </span>
              )}
              {errors.ownerEmail?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.ownerEmail?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Secondary Contact Name:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.secCName ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.secCName}
              placeholder=""
              {...register("secCName", {
                required: "Secondary Contact Name is required.",
              })}
            />
            <label className="label">
              {errors.secCName?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.secCName?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Secondary Contact Phone:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.secCPhone ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.secCPhone}
              placeholder=""
              {...register("secCPhone", {
                required: "Secondary Contact Phone is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />
            <label className="label">
              {errors.secCPhone?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.secCPhone?.message}
                </span>
              )}
              {errors.secCPhone?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.secCPhone?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Secondary Contact Email:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.secCEmail ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.secCEmail}
              placeholder=""
              {...register("secCEmail", {
                required: "Secondary Contact Email is required.",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Enter a valid Email",
                },
              })}
            />
            <label className="label">
              {errors.secCEmail?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.secCEmail?.message}
                </span>
              )}
              {errors.secCEmail?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.secCEmail?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Restaurant Phone:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.resturantPhone ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.resturantPhone}
              placeholder=""
              {...register("resturantPhone", {
                required: "Restaurant Phone is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />
            <label className="label">
              {errors.resturantPhone?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.resturantPhone?.message}
                </span>
              )}
              {errors.resturantPhone?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.resturantPhone?.message}
                </span>
              )}
            </label>
          </div>
          <div className="flex items-center mt-9 pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() => setContactForm(!contactForm)}
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

export default ContactForm;
