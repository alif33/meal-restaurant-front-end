import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { setCoupons } from "../../store/resturant/actions";
import { updateData } from "../../__lib__/helpers/HttpService";

const CouponForm = ({
  couponForm,
  setCouponForm,
  couponFormEditNumber,
  setCouponFormEditNumber,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { auth, resturant } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    _id, 
    name, 
    description, 
    _type, 
    _discount, 
    _condition 
  } = resturant.coupons[couponFormEditNumber];

  const onError = (err) => console.log(err);
  const onSubmit = (data) => {
    updateData(`/resturant/coupon?_id=${_id}`, data, auth.token)
    .then(res=>{
        console.log(res);
        
        if(res.success){
          dispatch(setCoupons(
            resturant?.activeResturant?._id, 
            auth?.token
          ));
          toast.success(`${res.message}`);
        }
    })
  };

  return (
    <>
      <div
        onClick={() => setCouponForm(!couponForm)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[13px] flex">
            <span className="mr-2"></span>
            Edit Coupon
          </h4>
          <button
            onClick={() => setCouponForm(!couponForm)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Name:
            </label>
            <input
              className="input w-full border-2 h-[40.85px] p-3 "
              type="text"
              defaultValue={name}
              placeholder="Coupon"
              {...register("name", {
                // required: "Account Manager Name is required.",
              })}
            />
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Description
            </label>
            <textarea
              className="input w-full border-2 h-[129.17px] p-3"
              type="text"
              defaultValue={description}
              placeholder=""
              {...register("description", {
                // required: " Sales Rep. is required.",
              })}
            />
            <div className="text-end mt-2">
              <button className="border-2 py-1 px-2 rounded-3xl border-lime-500 text-lime-500">
                sentence case{" "}
              </button>
            </div>
          </div>
          <div className="">
            <label className="w-full" htmlFor="">
              Pricing Type:
            </label>
            <div className="flex justify-start items-center pb-4 pt-3">
              <p className="flex justify-center items-center">
                <input
                  name="_type"
                  id="_type"
                  defaultValue={_type}
                  className="mr-2 "
                  value="PERCENTAGE"
                  checked={_type === "PERCENTAGE" ? "true" : "null"}
                  type="radio"
                  {...register("_type", {})}
                />{" "}
                <span className="text-[#717171]">percentage</span>
              </p>
              <p className="flex justify-center items-center ml-5">
                <input
                  className="mr-2"
                  value="FLAT"
                  defaultValue={_type}
                  type="radio"
                  checked={_type === "FLAT" ? "true" : "null"}
                  {...register("_type", {})}
                />{" "}
                <span className="text-[#717171]">flat</span>
              </p>
            </div>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Discount amount:
            </label>
            <input
              className="input w-full border-2 h-[40.85px] p-3 "
              type="text"
              defaultValue={_discount}
              placeholder=""
              {...register("_discount.", {
                // required: " Sales Rep. is required.",
              })}
            />
          </div>
          <div className="pb-4 ">
            <h2 className="text-[#717171] ">Conditions: </h2>

            <div className="flex justify-around items-center gap-2">
              <div className="">
                <label className="w-full" htmlFor="">
                  Day of week:
                </label>

                <select
                  className="input w-full border-2 h-[40.85px] p-3 text-xs"
                  {...register("dayOfWeek")}
                >
                  <option className="w-full " value="orderSubtotal">
                    Order subtotal
                  </option>
                  <option className="w-full" value="orderSubtotal">
                    Order subtotal
                  </option>
                  <option className="w-full" value="orderSubtotal">
                    Order subtotal
                  </option>
                </select>
              </div>
              <div>
                <label className="w-full" htmlFor="">
                  Start time:
                </label>
                <select
                  className="input  border-2 w-[67px] h-[39px] p-3"
                  {...register("startTime")}
                >
                  <option className="w-full" value=""></option>
                </select>
              </div>
              <div>
                <label className="w-full" htmlFor="">
                  Amount:
                </label>
                <input
                  className="input w-[95px]  border-2 h-[36.77px] p-3"
                  type="text"
                  placeholder=""
                  {...register("amount.", {
                    // required: " Sales Rep. is required.",
                  })}
                />
              </div>
            </div>
            <div className="text-end mt-4">
              <button className=" text-[#6FB327] border-[#6FB327] px-4 py-1 rounded-3xl border-[1px]">
                + New Condition
              </button>
            </div>
          </div>
          <div className="flex items-center mt-1 pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() => setCouponForm(!couponForm)}
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

export default CouponForm;
