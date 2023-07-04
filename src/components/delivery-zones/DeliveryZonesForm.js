import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiPencil } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { authPost, postData } from "../../__lib__/helpers/HttpService";
import { showErr } from "../../__lib__/helpers/ErrHandler";
import {
  activeDeliveryZones,
  setDeliveryZones,
} from "../../store/restaurant/actions";

import AddedMap from "../../components/delivery-zones/AddedMap"

const DeliveryZonesForm = ({ addUserForm, setAddUserForm }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [lat, setLat] = useState(45.4);
  const [lng, setLng] = useState(-75.7);

  const dispatch = useDispatch();
  const { admin, restaurant } = useSelector((state) => state);

  useEffect(() => {
    dispatch(setDeliveryZones(restaurant?.activeRestaurant?._id, admin?.token));
  }, []);

  const onError = (err) => showErr(err);

  const onSubmit = (data) => {
    authPost(
      `/restaurant/delivery-zone?_rid=${restaurant?.activeRestaurant?._id}`,
      { ...data, lat, lng },
      admin?.token
    ).then((res) => {
      if (res.success) {
        dispatch(
          setDeliveryZones(restaurant?.activeRestaurant?._id, admin?.token)
        );
        toast.success(`${res.message}`);
        reset();
        setAddUserForm(!addUserForm);
      }
      console.log(res);
    });
  };

  const handleActiveDeliveryZones = (_id, lat, lag) => {
    setLat(lat);
    setLng(lag);
    dispatch(activeDeliveryZones(_id));
    // setDeliveryZonesEditFormNumber(_id);
  };

  return (
    <div className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] ">
      <div
        onClick={() => setAddUserForm(!addUserForm)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>

      <div className="fixed top-0 right-0 w-[60%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 border-b border-solid border-[#D7D7D7]  pb-3">
          <h4 className=" text-[#757575] text-md ">Add Zone</h4>
          <button
            onClick={() => setAddUserForm(!addUserForm)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>

        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-[24%_30%] gap-[20%] ">
            <div className="">
              <div className="mb-4">
                <label className=" text-[#757575] mb-1 block " htmlFor="">
                  Name:
                </label>
                <input
                  type="text"
                  placeholder=""
                  className=" w-full border border-solid border-[#CCCCCC] focus:outline-none active:outline-none  px-3 py-1"
                  {...register("name", {
                    required: "Name is required.",
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
              <div className="mb-4">
                <label className=" text-[#757575] mb-1 block " htmlFor="">
                  Driving Radius (km):
                </label>
                <input
                  type="number"
                  placeholder=""
                  className=" w-full border border-solid border-[#CCCCCC] focus:outline-none active:outline-none  px-3 py-1"
                  {...register("drivingRadius", {
                    required: "Driving Radius is required.",
                    pattern: {
                      value:
                        /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                      message: "Enter Only Number",
                    },
                  })}
                />
                <label className="label">
                  {errors.drivingRadius?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.drivingRadius?.message}
                    </span>
                  )}
                  {errors.drivingRadius?.type === "pattern" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.drivingRadius?.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="mb-4">
                <label className=" text-[#757575] mb-1 block " htmlFor="">
                  Add Marker for Address:
                </label>
                <input
                  type="text"
                  placeholder=""
                  className=" w-full border border-solid border-[#CCCCCC] focus:outline-none active:outline-none  px-3 py-1"
                  {...register("address", {
                    required: "Address is required.",
                  })}
                />{" "}
                <label className="label">
                  {errors.address?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.address?.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="mb-4">
                <label className=" text-[#757575] mb-1 block " htmlFor="">
                  Longitude
                </label>
                <input
                  type="text"
                  Value={lng}
                  placeholder=""
                  className=" w-full border border-solid border-[#CCCCCC] focus:outline-none active:outline-none  px-3 py-1"
                  {...register("lag", {
                    required: "longitude required.",

                    pattern: {
                      value:
                        /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                      message: "Enter Only Number",
                    },
                  })}
                />{" "}
                <label className="label">
                  {errors.lag?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.lag?.message}
                    </span>
                  )}
                  {errors.lag?.type === "pattern" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.lag?.message}
                    </span>
                  )}
                </label>
              </div>
            </div>
            <div className="">
              <div className="mb-4">
                <label className=" text-[#757575] mb-1 block " htmlFor="">
                  Minimum order:{" "}
                </label>
                <div className=" w-full border border-solid border-[#CCCCCC] focus:outline-none active:outline-none relative ">
                  <input
                    type="text"
                    className=" w-full focus:outline-none active:outline-none px-8 py-1"
                    {...register("minimumOrder", {
                      required: "Minimum order is required.",
                      pattern: {
                        value:
                          /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                        message: "Enter Only Number",
                      },
                    })}
                  />{" "}
                  <span className=" absolute top-[50%] h-full w-[20px] left-0 translate-y-[-50%] text-[#CCCCCC] border-r border-solid border-[#CCCCCC] flex justify-center items-center ">
                    $
                  </span>
                </div>
                <label className="label">
                  {errors.minimumOrder?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.minimumOrder?.message}
                    </span>
                  )}
                  {errors.minimumOrder?.type === "pattern" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.minimumOrder?.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="mb-4">
                <label className=" text-[#757575] mb-1 block " htmlFor="">
                  Maximum order:{" "}
                </label>
                <div className=" w-full border border-solid border-[#CCCCCC] focus:outline-none active:outline-none relative ">
                  <input
                    type="number"
                    className=" w-full focus:outline-none active:outline-none px-8 py-1"
                    {...register("maximumOrder", {
                      required: "Maximum orders is required.",
                      pattern: {
                        value:
                          /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                        message: "Enter Only Number",
                      },
                    })}
                  />{" "}
                  <span className=" absolute top-[50%] h-full w-[20px] left-0 translate-y-[-50%] text-[#CCCCCC] border-r border-solid border-[#CCCCCC] flex justify-center items-center ">
                    $
                  </span>
                </div>
                <label className="label">
                  {errors.maximumOrder?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.maximumOrder?.message}
                    </span>
                  )}
                  {errors.maximumOrder?.type === "pattern" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.minimumOrder?.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="mb-4">
                <label className=" text-[#757575] mb-1 block " htmlFor="">
                  Delivery Fee
                </label>
                <input
                  type="number"
                  placeholder=""
                  className=" w-full border border-solid border-[#CCCCCC] focus:outline-none active:outline-none  px-3 py-1"
                  {...register("deliveryFee", {
                    required: "Delivery Fee is required.",
                    pattern: {
                      value:
                        /^(?:-(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))|(?:0|(?:[1-9](?:\d{0,2}(?:,\d{3})+|\d*))))(?:.\d+|)$/,
                      message: "Enter Only Number",
                    },
                  })}
                />{" "}
                <label className="label">
                  {errors.deliveryFee?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.deliveryFee?.message}
                    </span>
                  )}
                  {errors.deliveryFee?.type === "pattern" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.minimumOrder?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="mb-4">
                <label className=" text-[#757575] mb-1 block " htmlFor="">
                  Latitude
                </label>
                <input
                  type="text"
                  placeholder=""
                  value={lat}
                  className=" w-full border border-solid border-[#CCCCCC] focus:outline-none active:outline-none  px-3 py-1"
                  {...register("lat", {
                    required: "latitude required.",
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
            </div>
          </div>
          <AddedMap lat={lat} lng={lng} setLng={setLng} setLat={setLat} />

          <div className="flex items-center mt-[20px] pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() => setAddUserForm(!addUserForm)}
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
    </div>
  );
};

export default DeliveryZonesForm;
