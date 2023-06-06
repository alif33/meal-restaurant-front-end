// import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import Location from "../../../public/img/location-svgrepo-com 1.png";
import { activeResturant } from "../store/resturant/actions";
import { updateData } from "../__lib__/helpers/HttpService";

const LocationForm = ({ locationForm, setLocationForm, children }) => {
  const { admin, resturant } = useSelector((state) => state);

  const dispatch = useDispatch();
  console.log("resturant_resturant", resturant);
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
      }
      console.log("res", res);
      // toast.success(`${res.message}`);
      reset();
      setLocationForm(!locationForm);
      console.log("locationForm", data);
    });
  };
  return (
    <>
      <div
        onClick={() => setLocationForm(!locationForm)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[13px] flex">
            <span className="mr-2">
              <img width="24" height="24" src="/img/location-svgrepo-com 1.png" alt="" />
            </span>
            Location
          </h4>
          <button
            onClick={() => setLocationForm(!locationForm)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Address:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.address ? "border-red-600  " : ""
              }`}
              defaultValue={resturant?.activeResturant?._address}
              type="text"
              placeholder=""
              {...register("_address", {
                required: "Address is required.",
              })}
            />
            <label className="label">
              {errors.address?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.address?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              City:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.city ? "border-red-600  " : ""
              }`}
              defaultValue={resturant?.activeResturant?.city}
              type="text"
              placeholder=""
              {...register("city.", {
                required: "City is required.",
              })}
            />{" "}
            <label className="label">
              {errors.city?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.city?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              State:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.state ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.state}
              placeholder=""
              {...register("state", {
                required: "State is required.",
              })}
            />{" "}
            <label className="label">
              {errors.state?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.state?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Zip Code:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.zipCode ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.zipCode}
              placeholder=""
              {...register("zipCode", {
                required: "Zip Code is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />{" "}
            <label className="label">
              {errors.zipCode?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.zipCode?.message}
                </span>
              )}
              {errors.zipCode?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.zipCode?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Country:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.country ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.country}
              placeholder=""
              {...register("country", {
                required: "Country is required.",
              })}
            />{" "}
            <label className="label">
              {errors.country?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.country?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Longitude:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.long ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.lat}
              placeholder=""
              {...register("long", {
                required: "Longitude is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />{" "}
            <label className="label">
              {errors.long?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.long?.message}
                </span>
              )}
              {errors.long?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.long?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Latitude:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.lat ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.long}
              placeholder=""
              {...register("lat", {
                required: "Latitude is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />{" "}
            <label className="label">
              {errors.lat?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.lat?.message}
                </span>
              )}
              {errors.lat?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.lat?.message}
                </span>
              )}
            </label>
          </div>
          <div className="flex items-center mt-9 pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() => setLocationForm(!locationForm)}
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

export default LocationForm;