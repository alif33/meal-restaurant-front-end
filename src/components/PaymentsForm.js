// import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import Payment from "../../../public/img/Payments.png";
import { activeResturant } from "../store/resturant/actions";
import { updateData } from "../__lib__/helpers/HttpService";
import { toast } from "react-hot-toast";

const PaymentsForm = ({ paymentsForm, setPaymentsForm, children }) => {
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
        setPaymentsForm(!paymentsForm);
        toast.success(`${res.message}`)
      }
    });
  };
  return (
    <>
      <div
        onClick={() => setPaymentsForm(!paymentsForm)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[13px] flex">
            <span className="mr-2">
              <img width="22" height="14.3" src="/img/Payments.png" alt="" />
            </span>
            Payments
          </h4>
          <button
            onClick={() => setPaymentsForm(!paymentsForm)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Payment Type:
            </label> 
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.paymentType ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.paymentType}
              placeholder=""
              {...register("paymentType", {
                required: "Payment Type is required.",
              })}
            />
            {errors.paymentType?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.paymentType?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Email Statement to:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.emailStatement_ ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.emailStatement_}
              placeholder=""
              {...register("emailStatement_", {
                required: " Email Statement to. is required.",
                pattern: {
                  value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                  message: "Enter a valid Email",
                },
              })}
            />
            {errors.emailStatement_?.type === "pattern" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.emailStatement_?.message}
              </span>
            )}
            {errors.emailStatement_?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.emailStatement_?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Payment Frequency:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.paymentFrequency ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.paymentFrequency}
              placeholder=""
              {...register("paymentFrequency", {
                required: "Payment Frequency is required.",
              })}
            />
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Flat Fee (MealNow):
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.flatFee ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.flatFee}
              placeholder=""
              {...register("flatFee", {
                required: "Flat Fee is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />
            {errors.flatFee?.type === "pattern" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.flatFee?.message}
              </span>
            )}
            {errors.flatFee?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.flatFee?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Free Trial End Date:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.trialEndDate ? "border-red-600  " : ""
              }`}
              type="date"
              defaultValue={resturant?.activeResturant?.trialEndDate}
              placeholder=""
              {...register("trialEndDate", {
                required: "Free Trial End Date is required.",
              })}
            />
            {errors.flatFee?.type === "trialEndDate" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.flatFee?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Processing Fee:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.processingFee ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.processingFee}
              placeholder=""
              {...register("processingFee", {
                required: " Processing Fee is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />
            {errors.processingFee?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.processingFee?.message}
              </span>
            )}
            {errors.processingFee?.type === "pattern" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.processingFee?.message}
              </span>
            )}
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Contact Method:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.contactMethod ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={resturant?.activeResturant?.contactMethod}
              placeholder=""
              {...register("contactMethod", {
                required: "Contact Method is required.",
              })}
            />
            {errors.contactMethod?.type === "required" && (
              <span className="label-text-alt text-xs text-red-600">
                {errors?.contactMethod?.message}
              </span>
            )}
          </div>
          <div className="flex items-center mt-9 pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() => setPaymentsForm(!paymentsForm)}
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

export default PaymentsForm;
