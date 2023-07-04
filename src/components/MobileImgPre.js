import React from "react";
import { useSelector } from "react-redux";

const MobileImgPre = ({ setMobileImgPre, mobileImgPre }) => {

  const { admin, restaurant } = useSelector((state) => state);
  const { activeRestaurant } = restaurant;
  
  return (
    <>
      <div
        onClick={() => setMobileImgPre(!mobileImgPre)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-[15%] right-[30%] w-[40%] h-[60%] bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <img
          className="w-full h-full"
          src={restaurant?.activeRestaurant?.mobileHeaderImage}
          alt=""
        />
      </div>
    </>
  );
};

export default MobileImgPre;
