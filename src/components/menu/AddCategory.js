import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, setCategories } from "../../store/menu/actions";
import { setRestaurant } from "../../store/resturant/actions";
import {
  authPost,
  postData,
  _getData,
} from "../../__lib__/helpers/HttpService";
import { toSentenceCase } from "../../__lib__/helpers/Validator";

const AddCategory = ({ categoryModal, setCategoryModal }) => {
  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { resturant, auth, menu } = useSelector((state) => state);
  const dispatch = useDispatch();
  const formData = watch();


  useEffect(() => {
    dispatch(setRestaurant(auth.token));
    dispatch(setCategories(resturant.activeResturant?._id));
  }, []);


  const handleCaseSentence = ()=>{
   const _description = toSentenceCase(formData?.description)
   setValue('description', _description)
  }



  const onSubmit = async (data) => {
    console.log("calling");
    authPost(
      "/menu/category",
      { ...data, resturant: resturant.activeResturant?._id },
      auth.token
    )
      .then((res) => {
        console.log(res);
        dispatch(setCategories(resturant.activeResturant?._id));
        reset();
        setCategoryModal(!categoryModal);
      })
      .catch((err) => {
        console.log(err);
      });
  }





  return (
    <>
      <div
        onClick={() => setCategoryModal(!categoryModal)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[16px] flex">
            <span className="mr-2"></span>
            Add Category
          </h4>
          <button
            type="button"
            onClick={() => setCategoryModal(!categoryModal)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Category Name:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.name ? "border-red-600  " : ""
              }`}
              type="text"
              {...register("name", {
                required: "Category Name is required.",
              })}
            />
            <label className="label">
              {errors.name?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.name?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Description
            </label>
            <textarea
              className={`input w-full border-2  h-[129.17px] p-3   ${
                errors.description ? "border-red-600  " : ""
              }`}
              type="text"
              {...register("description", {
                required: "Description is required.",
              })}
            />
            <label className="label">
              {errors.description?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.description?.message}
                </span>
              )}
            </label>
            <div className="text-end mt-2">
              <button type="button" onClick={handleCaseSentence} className="border py-1 px-2 rounded-3xl border-lime-500 text-lime-500">
                sentence case{" "}
              </button>
            </div>
          </div>
          <div className="pb-4 ">
            <h2 className="text-[#717171] font-bold">Restrictions: </h2>
            <div className="flex justify-around items-center gap-2 mt-3">
              <div className="w-200">
                <label className="w-full text-gray-400" htmlFor="">
                  From Date:
                </label>
                <input
                  type="date"
                  className={`input w-full border-2  h-[39px] w-[160px]p-3   ${
                    errors._date ? "border-red-600  " : ""
                  }`}
                  // className="input border h-[39px] w-[160px]"
                  {...register("_date", {
                    required: " From Date is required.",
                  })}
                />
                <label className="label block">
                  {errors._date?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?._date?.message}
                    </span>
                  )}
                </label>
              </div>
              <div>
                <label className="w-full text-gray-400" htmlFor="">
                  To Date:
                </label>
                <input
                  type="date"
                  className={`input w-full border-2  h-[39px] w-[160px]p-3   ${
                    errors.date_ ? "border-red-600  " : ""
                  }`}
                  // className="input border h-[36.77px] w-[160px]"
                  placeholder=""
                  {...register("date_", {
                    required: "To Date is required.",
                  })}
                />
                <label className="label block">
                  {errors.date_?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.date_?.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Delivery Method:
            </label>
            <select
              className={`input border-2  h-[40.85px] w-3/4 pt-2   ${
                errors.deliveryMethod ? "border-red-600  " : ""
              }`}
              // className="input w-3/4 border h-[40.85px] pt-2"
              {...register("deliveryMethod", {
                required: "Delivery Method is required.",
              })}
            >
              <option value="">Select...</option>
              <option value="cod">COD</option>
              <option value="bkash">BKASH</option>
              <option value="upay">UPAY</option>
            </select>
            <label className="label block">
              {errors.deliveryMethod?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.deliveryMethod?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-5 ">
            <h2 className="text-[#717171] font-bold">Availabilities: </h2>
            <div className="flex justify-around items-center gap-2 mt-3 pb-10">
              <div className="">
                <label className="w-full text-gray-400" htmlFor="">
                  Day of week:
                </label>

                <select
                  className={`input w-full border-2 h-[36.77px] text-xs  ${
                    errors.dayWeek ? "border-red-600  " : ""
                  }`}
                  // className="input w-full border h-[40.85px] p-3 text-xs"
                  {...register("dayWeek", {
                    required: "Required.",
                  })}
                >
                  <option value="">Select...</option>
                  <option className="w-full" value="Saturday">
                    Saturday
                  </option>
                  <option className="w-full" value="Sunday">
                    Sunday
                  </option>
                  <option className="w-full" value="Monday">
                    Monday
                  </option>
                  <option className="w-full" value="Tuesday">
                    Tuesday
                  </option>
                  <option className="w-full" value="Wednesday">
                    Wednesday
                  </option>
                  <option className="w-full" value="Thursday">
                    Thursday
                  </option>
                  <option className="w-full" value="Friday">
                    Friday
                  </option>
                </select>
                <label className="label block">
                  {errors.dayWeek?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.dayWeek?.message}
                    </span>
                  )}
                </label>
              </div>
              <div>
                <label className="w-full text-gray-400" htmlFor="">
                  Start time:
                </label>
                <input
                  type="time"
                  className={`input  border-2  h-[36.77px] w-[90px]"   ${
                    errors.startTime ? "border-red-600  " : ""
                  }`}
                  // className="input border h-[39px] w-[90px]"
                  {...register("startTime", {
                    required: " Start time required.",
                  })}
                />
                <label className="label block">
                  {errors.startTime?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.startTime?.message}
                    </span>
                  )}
                </label>
              </div>
              <div>
                <label className="w-full text-gray-400" htmlFor="">
                  End time:
                </label>
                <input
                  type="time"
                  className={`input border-2 h-[36.77px] w-[115px] ${
                    errors.date_ ? "border-red-600  " : ""
                  }`}
                  // className="input border h-[36.77px] w-[90px]"
                  placeholder=""
                  {...register("endTime", {
                    required: "End time required.",
                  })}
                />
                <label className="label block">
                  {errors.endTime?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.endTime?.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="text-end mt-4">
              <button
                type="button"
                className=" text-[#6FB327] border-[#6FB327] px-4 py-1 rounded-3xl border-[1px]"
              >
                + New Condition
              </button>
            </div>
          </div>
          <div className="flex items-center mt-1 pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              type="button"
              onClick={() => setCategoryModal(!categoryModal)}
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

export default AddCategory;
