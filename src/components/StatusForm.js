// import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
// import Status from "../../../public/img/status-info-svgrepo-com 1.png";
import { activeRestaurant } from "../store/restaurant/actions";
import { updateData } from "../__lib__/helpers/HttpService";
import { toast } from "react-hot-toast";

const StatusForm = ({ statusForm, setStatusForm, children }) => {
  const { admin, restaurant } = useSelector((state) => state);
  // const { activeRestaurant } = resturant;
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
        setStatusForm(!statusForm);
        toast.success(`${res.message}`)
      }

    });
  };
  return (
    <>
      <div
        // onClick={() => setStatusForm(!statusForm)}
        className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  "
      >
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[13px] flex">
            <span className="mr-2">
              <img width="24" height="24" src="/img/status-info-svgrepo-com 1.png" alt="" />
            </span>
            Status
          </h4>
          <button
            onClick={() => setStatusForm(!statusForm)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-10">
            <label className="w-full mb-5" htmlFor="">
              Shop Status:
            </label>
            {/* <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.shopStatus ? "border-red-600  " : ""
              }`}
              type="text"
              placeholder=""
              {...register("shopStatus", {
                required: "Shop Status is required.",
              })}
            /> */}
            <select
              className={`input w-full border-2  h-[50.85px] p-3 text-xs mt-5 ${
                errors.shopStatus ? "border-red-600  " : ""
              }`}
              defaultValue={restaurant?.activeRestaurant?.status}
              {...register("status", {
                required: "Shop Status is required.",
              })}
            >
              <option value="">Select Shop Status</option>
              <option value="LIVE">Live</option>
              <option value="DISABLE">Disable</option>
            </select>
            <label className="label">
              {errors.shopStatus?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.shopStatus?.message}
                </span>
              )}
            </label>
          </div>
          <div className="flex items-center mt-[360px] pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() => setStatusForm(!statusForm)}
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

export default StatusForm;
