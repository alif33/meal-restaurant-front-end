import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { activeRestaurant } from "../store/restaurant/actions";
import { updateData } from "../__lib__/helpers/HttpService";
import { toast } from "react-hot-toast";
const ManagerRepresentativesForm = ({
  setManagerRepresentativesForm,
  managerRepresentativesForm,
}) => {
  const { admin, restaurant } = useSelector((state) => state);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    updateData(
      `/restaurant?_id=${ restaurant?.activeRestaurant?._id }`,
      data,
      admin?.token
    ).then((res) => {

      if (res.success) {
        dispatch(activeRestaurant(res.restaurant));
        setManagerRepresentativesForm(!managerRepresentativesForm);
        toast.success(`${res.message}`)
      }

    });
  };
  return (
    <>
      <div
        onClick={() =>
          setManagerRepresentativesForm(!managerRepresentativesForm)
        }
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[13px] flex">
            <span className="mr-2">
              {/* <Image width="32" height="32" src={Manager} alt="" /> */}
            </span>
            Manager & Representatives Info
          </h4>
          <button
            onClick={() =>
              setManagerRepresentativesForm(!managerRepresentativesForm)
            }
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Account Manager:
            </label>

            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors.accountManager ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.accountManager}
              placeholder=""
              {...register("accountManager", {
                required: "Account Manager Name is required.",
              })}
            />
            <label className="label">
              {errors.accountManager?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.accountManager?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Sales Rep.
            </label>
            <input
              className={`input w-full border-2 h-[40.85px] p-3 ${
                errors.salesRep ? "border-red-600" : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.salesRep}
              placeholder=""
              {...register("salesRep", {
                required: " Sales Rep. is required.",
              })}
            />
            <label className="label">
              {errors.salesRep?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.salesRep?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Menu Rep.
            </label>
            <input
              className={`input w-full border-2 h-[40.85px] p-3 ${
                errors?.menuRep ? "border-red-600" : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.menuRep}
              placeholder=""
              {...register("menuRep", {
                required: "Menu Rep. Name is required.",
              })}
            />
            <label className="label">
              {errors.menuRep?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.menuRep?.message}
                </span>
              )}
            </label>
          </div>
          <div className="flex items-center mt-[200px] pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() =>
                setManagerRepresentativesForm(!managerRepresentativesForm)
              }
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

export default ManagerRepresentativesForm;
