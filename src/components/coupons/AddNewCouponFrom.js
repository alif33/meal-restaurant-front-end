import React from "react";

const AddNewCouponFrom = ({
  addNewCouponFrom,
  setAddNewCouponFrom,
  children,
}) => {
  return (
    <>
      <div
        onClick={() => setAddNewCouponFrom(!addNewCouponFrom)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        {children}
      </div>
    </>
  );
};

export default AddNewCouponFrom;