import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { RiCoupon4Line } from "react-icons/ri";
import { HiPencil } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import CardWidgetWithTitle from "../../components/CardWidgetWithTitle";
import Layout from "../../base/Layout";
import CouponForm from "../../components/coupons/CouponForm";
import AddNewCouponFrom from "../../components/coupons/AddNewCouponFrom";
import { authPost, deleteData } from "../../__lib__/helpers/HttpService";
import { setCoupons } from "../../store/restaurant/actions";

const RestaurantCoupons = () => {

  const [couponForm, setCouponForm] = useState(false);
  const [addNewCouponFrom, setAddNewCouponFrom] = useState(false);
  const { auth, restaurant } = useSelector((state) => state);
  const [couponFormEditNumber, setCouponFormEditNumber] = useState();
  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(()=>{
    dispatch(setCoupons(
      restaurant?.activeRestaurant?._id, 
      auth?.token
    ));
  }, [])
  const onError = (err) => console.log(err);

  const onSubmit = (data) => {
    authPost(
      `/restaurant/coupon?_id=${restaurant?.activeRestaurant?._id}`,
      data,
      auth?.token
    ).then((res) => {
      if (res.success) {
        dispatch(setCoupons(
          restaurant?.activeRestaurant?._id, 
          auth?.token
        ));
        reset();
        toast.success(`${res.message}`);
      }
    });
  };

  const deleteCouponHandler = _id =>{
    deleteData(`/restaurant/coupon?_id=${ _id }`, auth.token)
    .then(res=>{
      if(res.success){
        dispatch(setCoupons(
          restaurant?.activeRestaurant?._id, 
          auth?.token
        ));
        toast.success(`${res.message}`);
      }
    })
  }

  return (
    <Layout status="restaurant">
      <div className="w-[97%] mx-auto mt-4">
        <div className="flex justify-between items-center mx-3">
          <h3 className="text-2xl font-mono font-medium ">
            Coupons - {restaurant?.activeRestaurant?.name}
          </h3>
          <button
            onClick={() => setAddNewCouponFrom(!addNewCouponFrom)}
            className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent transition-all duration-300 ease-in-out focus:outline-none active:outline-none  hover:text-black cursor-pointer"
          >
            Add new Coupon
          </button>
        </div>
        <div className="mt-3 grid grid-cols-[33%_33%_33%] gap-[1%] ">
          <div className="">
            { Array.isArray(restaurant?.coupons) && restaurant?.coupons.map(
              (coupon, index) => (
                <CardWidgetWithTitle key={index}>
                  <div className="py-4 px-5">
                    <div className=" flex items-center justify-between">
                      <div className="flex items-center">
                        <RiCoupon4Line className=" text-3xl " />{" "}
                        <h3 className=" text-2xl ml-2 font-semibold ">{coupon.name}</h3>
                      </div>
                      <span
                        onClick={() => {
                          setCouponForm(!couponForm);
                          setCouponFormEditNumber(index);
                        }}
                        className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                      >
                        <HiPencil 
                        />
                        Edit
                      </span>
                    </div>
                    <ul className="mt-3">
                      {/* <li className=" grid grid-cols-2 items-center ">
                        <p className=" text-sm text-[#717171] ">Name:</p>
                        <p className="text-md ">{coupon.name}</p>
                      </li> */}
                      <li className=" grid grid-cols-2 items-center ">
                        <p className=" text-sm text-[#717171] ">Description:</p>
                        <p className="text-md ">{coupon.description}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center ">
                        <p className=" text-sm text-[#717171] ">Pricing Type:</p>
                        <p className="text-md ">{coupon._type}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center ">
                        <p className=" text-sm text-[#717171] ">
                          Discount Amount:
                        </p>
                        <p className="text-md ">{coupon._discount}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center ">
                        <p className=" text-sm text-[#717171] ">Condition:</p>
                        <p className="text-md "></p>
                      </li>
                    </ul>
                    <div className="flex justify-end mt-2">
                      <img
                        className="cursor-pointer"
                        onClick={()=>deleteCouponHandler(coupon._id)}
                        width="21.15" 
                        height="26" 
                        src="/img/Group (1).png" 
                        alt="dlt icon" 
                      />
                    </div>
                  </div>
                </CardWidgetWithTitle>
            ))}
          </div>
        </div>
      </div>
      <div className="">
        {couponForm && (
          <CouponForm
            couponForm={couponForm}
            setCouponForm={setCouponForm}
            setCouponFormEditNumber={setCouponFormEditNumber}
            couponFormEditNumber={couponFormEditNumber}
          ></CouponForm>
        )}
      </div>
      <div className="">
        {addNewCouponFrom && (
          <AddNewCouponFrom
            addNewCouponFrom={addNewCouponFrom}
            setAddNewCouponFrom={setAddNewCouponFrom}
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
              <h4 className=" text-[#757575] text-[13px] flex">
                <span className="mr-2"></span>
                Add New Coupon
              </h4>
              <button
                onClick={() => setAddNewCouponFrom(!addNewCouponFrom)}
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
                  type="text"
                  className="input w-full border-2 h-[129.17px] p-3"
                  placeholder=""
                  {...register("description", {
                    // required: " Sales Rep. is required.",
                  })}
                >
                  
                </textarea>
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
                      className="mr-2 "
                      value="PERCENTAGE"
                      type="radio"
                      {...register("_type", {})}
                    />{" "}
                    <span className="text-[#717171]">percentage</span>
                  </p>
                  <p className="flex justify-center items-center ml-5">
                    <input
                      className="mr-2"
                      value="FLAT"
                      type="radio"
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
                  className="input w-full border-2 h-[40.85px] p-3"
                  type="text"
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
                      // {...register("dayOfWeek")}
                    >
                      <option
                        className="w-full "
                        selected
                        value="orderSubtotal"
                      >
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
                      // {...register("startTime")}
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
                      // {...register("amount.", {
                      //   // required: " Sales Rep. is required.",
                      // })}
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
          </AddNewCouponFrom>
        )}
      </div>
    </Layout>
  );
};

export default RestaurantCoupons;
