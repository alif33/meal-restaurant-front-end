import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../__lib__/helpers/HttpService";
import { activeRestaurant } from "../store/restaurant/actions";
import { toast } from "react-hot-toast";

const OrderingForm = ({ orderingForm, setOrderingForm }) => {
  const { admin, restaurant } = useSelector((state) => state);

  const dispatch = useDispatch();
  const {
    register,
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
        setOrderingForm(!orderingForm);
        toast.success(`${res.message}`)
      }
    });
  };
  return (
    <>
      <div
        onClick={() => setOrderingForm(!orderingForm)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[13px] flex">
            <span className="mr-2">
              <img width="24" height="24" src="/img/contact-svgrepo-com 1 (1).png" alt="" />
            </span>
            Ordering
          </h4>
          <button
            onClick={() => setOrderingForm(!orderingForm)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Min. pickup order:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors?.minPickupOrder ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.minPickupOrder}
              placeholder=""
              {...register("minPickupOrder", {
                required: "Min. pickup order is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />
            <label className="label">
              {errors.minPickupOrder?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.minPickupOrder?.message}
                </span>
              )}
              {errors.minPickupOrder?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.minPickupOrder?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Min. delivery order:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors?.minDeliveryOrder ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.minDeliveryOrder}
              placeholder=""
              {...register("minDeliveryOrder", {
                required: "Min. delivery order is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />
            <label className="label">
              {errors.minDeliveryOrder?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.minDeliveryOrder?.message}
                </span>
              )}
              {errors.minDeliveryOrder?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.minDeliveryOrder?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Pick up estimate:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors?.pickupEstimate ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.pickupEstimate}
              placeholder=""
              {...register("pickupEstimate", {
                required: "Pick up estimate is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />
            <label className="label">
              {errors.pickupEstimate?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.pickupEstimate?.message}
                </span>
              )}
              {errors.pickupEstimate?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.pickupEstimate?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Delivery estimate:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors?.deliveryEstimate ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.deliveryEstimate}
              placeholder=""
              {...register("deliveryEstimate", {
                required: "Delivery estimate is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />
            <label className="label">
              {errors.deliveryEstimate?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.deliveryEstimate?.message}
                </span>
              )}
              {errors.deliveryEstimate?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.deliveryEstimate?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Online discount:
            </label>
            <input
              className={`input w-full border-2  h-[40.85px] p-3   ${
                errors?.onlineDiscount ? "border-red-600  " : ""
              }`}
              type="text"
              defaultValue={restaurant?.activeRestaurant?.onlineDiscount}
              placeholder=""
              {...register("onlineDiscount", {
                required: "Online Discount is required.",
                pattern: {
                  value:
                    /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                  message: "Enter Only Number",
                },
              })}
            />
            <label className="label">
              {errors.onlineDiscount?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.onlineDiscount?.message}
                </span>
              )}
              {errors.onlineDiscount?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.onlineDiscount?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Delivery:
            </label>

            <select
              className={`input w-full border-2 text-xs h-[40.85px] p-3   ${
                errors?.deliveryMethod ? "border-red-600  " : ""
              }`}
              defaultValue={restaurant?.activeRestaurant?.delivery}
              {...register("delivery", {
                required: "Delivery is required.",
              })}
            >
              <option value="">Select...</option>
              <option value="ON">ON</option>
              <option value="OFF">OFF</option>
            </select>
            <label className="label">
              {errors.delivery?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.delivery?.message}
                </span>
              )}
              {errors.delivery?.type === "pattern" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.delivery?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Scheduled orders:
            </label>
            <select
              className={`input w-full border-2 text-xs h-[40.85px] p-3   ${
                errors?.scheduledOrders ? "border-red-600  " : ""
              }`}
              defaultValue={restaurant?.activeRestaurant?.scheduledOrders}
              {...register("scheduledOrders", {
                required: "Scheduled orders is required.",
              })}
            >
              <option value="">Select...</option>
              <option value="ON">ON</option>
              <option value="OFF">OFF</option>
            </select>
            <label className="label">
              {errors.delivery?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.scheduledOrders?.message}
                </span>
              )}
            </label>
          </div>
          <div className="pb-4">
            <label className="w-full" htmlFor="">
              Orders today:
            </label>
            <select
              className={`input w-full border-2 text-xs h-[40.85px] p-3   ${
                errors?.ordersToday ? "border-red-600  " : ""
              }`}
              defaultValue={restaurant?.activeRestaurant?.ordersToday}
              {...register("ordersToday", {
                required: "Orders today is required.",
              })}
            >
              <option value="">Select...</option>
              <option value="ON">ON</option>
              <option value="OFF">OFF</option>
            </select>
            <label className="label">
              {errors.ordersToday?.type === "required" && (
                <span className="label-text-alt text-xs text-red-600">
                  {errors?.ordersToday?.message}
                </span>
              )}
            </label>
          </div>
          <div className="flex items-center mt-9 pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() => setOrderingForm(!orderingForm)}
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

export default OrderingForm;
