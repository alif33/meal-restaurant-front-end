// import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import Status from "../../../public/img/status-info-svgrepo-com 1.png";
import {
  activeRestaurant,
  setRestaurant,
} from "../store/restaurant/actions";
import { postData, updateData } from "../__lib__/helpers/HttpService";

const RestaurantInfo = ({
  children,
  restaurantInfoForm,
  setRestaurantInfoForm,
}) => {
  const [shopSelectedFile, setShopSelectedFile] = useState();
  const [shopCheckFile, setShopCheckFile] = useState(false);

  const shopImageHandler = (e) => {
    setShopSelectedFile(e.target.files[0]);
    setShopCheckFile(true);
  };
  // Web-Header image:>
  const [webSelectedFile, setWebSelectedFile] = useState();
  const [webCheckFile, setWebCheckFile] = useState(false);

  const webImageHandler = (e) => {
    setWebSelectedFile(e.target.files[0]);
    setWebCheckFile(true);
  };
  // Mobile-Header image:>
  const [mobileSelectedFile, setMobileSelectedFile] = useState();
  const [mobileCheckFile, setMobileCheckFile] = useState(false);

  const mobileImageHandler = (e) => {
    setMobileSelectedFile(e.target.files[0]);
    setMobileCheckFile(true);
  };
  const { admin, restaurant } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [images, setImages] = useState({
    shopLogo: "",
    webHeaderImage: "",
    mobileHeaderImage: "",
  });
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ImageHandler = (file, field) => {
    if (file.length > 0) {
      let ready = {};
      ready[`${field}`] = false;
      setImages({
        ...images,
        ...ready,
      });

      const formData = new FormData();
      formData.append("image", file[0]);
      
      postData("/upload", formData)
        .then((res) => {
          console.log(res);
          if (res.success) {
            const { secure_url } = res.image;
            let uploaded = {};
            uploaded[`${field}`] = secure_url;
            setImages({
              ...images,
              ...uploaded,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const onSubmit = (data) => {
    updateData(
      `/resturant?_id=${restaurant?.activeRestaurant?._id}`,
      { ...data, ...images },
      admin?.token
    ).then((res) => {
      console.log("RestaurantInfo", res);
      if (res.success) {
        dispatch(activeRestaurant(res.resturant));
        setRestaurantInfoForm(!restaurantInfoForm);
        reset();
      }
    });
  };
  return (
    <>
      <div
        onClick={() => setRestaurantInfoForm(!restaurantInfoForm)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[13px] flex">
            <span className="mr-2">
              <img width="24" height="24" src="/img/status-info-svgrepo-com 1.png" alt="" />
            </span>
            Edit Restaurant Info
          </h4>
          <button
            onClick={() => setRestaurantInfoForm(!restaurantInfoForm)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="w-full" htmlFor="">
              Shop Name:
            </label>
            <input
              defaultValue={restaurant?.activeRestaurant?.name}
              className="input w-full border-2 h-[40.85px] p-3 mt-2"
              type="text"
              placeholder="Shop name"
              {...register("name", {
                required: "Shop Name is required.",
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
          <div className="mt-5">
            <div className="">
              <label className="w-full" htmlFor="">
                Shop Logo:
              </label>
              <div className="h-36 cursor-pointer relative flex justify-center items-center border-2 mt-2">
                <input
                  type="file"
                  required
                  onChange={(e) => ImageHandler(e.target.files, "shopLogo")}
                  accept=".jpg, .jpeg, .png"
                  className="z-20 opacity-0 cursor-pointer h-full w-full "
                />
                <div className="absolute flex justify-center items-center gap-2">
                  <img
                    className={`h-24 w-30  ${
                      images.shopLogo.length > 0 ? "opacity-1" : "opacity-0"
                    }`}
                    src={images.shopLogo.length > 0 ? images.shopLogo : null}
                  />
                  {/* <span className="w-56 truncate mb-2 text-sm text-gray-500 dark:text-gray-400">
                          {shopCheckFile
                            ? shopSelectedFile?.name
                            : "Drop Files Here"}
                        </span> */}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="">
              <label className="w-full" htmlFor="">
                Web-Header image:
                {/* Web-Header image:> */}
              </label>
              <div className="h-36 cursor-pointer relative flex justify-center items-center border-2 mt-2">
                <input
                  type="file"
                  name="file"
                  required
                  onChange={(e) =>
                    ImageHandler(e.target.files, "webHeaderImage")
                  }
                  className="z-20 opacity-0 cursor-pointer h-full w-full "
                />
                <div className="absolute flex justify-center items-center gap-2">
                  <img
                    className={`h-24 w-30  ${
                      images.webHeaderImage.length > 0
                        ? "opacity-1"
                        : "opacity-0"
                    }`}
                    src={
                      images.webHeaderImage.length > 0
                        ? images.webHeaderImage
                        : null
                    }
                  />
                  <span className="w-56 truncate mb-2 text-sm text-gray-500 dark:text-gray-400">
                    {webCheckFile ? webSelectedFile?.name : "Drop Files Here"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <div className="">
              <label className="w-full" htmlFor="">
                Mobile-Header Image:
                {/* Mobile-Header image:> */}
              </label>
              <div className="h-36 cursor-pointer relative flex justify-center items-center border-2 mt-2">
                <input
                  type="file"
                  required
                  onChange={(e) =>
                    ImageHandler(e.target.files, "mobileHeaderImage")
                  }
                  className="z-20 opacity-0 cursor-pointer h-full w-full "
                />
                <div className="absolute flex justify-center items-center gap-2">
                  <img
                    className={`h-24 w-30  ${
                      images.mobileHeaderImage.length > 0
                        ? "opacity-1"
                        : "opacity-0"
                    }`}
                    defaultValue={restaurant?.activeRestaurant?.mobileHeaderImage}
                    src={
                      images.mobileHeaderImage.length > 0
                        ? images.mobileHeaderImage
                        : null
                    }
                  />
                  <span className="w-56 truncate mb-2 text-sm text-gray-500 dark:text-gray-400">
                    {mobileCheckFile
                      ? mobileSelectedFile?.name
                      : "Drop Files Here"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center mt-24 pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() => setRestaurantInfoForm(!restaurantInfoForm)}
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

export default RestaurantInfo;
