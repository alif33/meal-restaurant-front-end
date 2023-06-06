import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";

const AddPaymentForm = ({ addPaymentForm, setAddPaymentForm }) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("AddPaymentForm", data);
  };
  return (
    <>
      <div
        onClick={() => setAddPaymentForm(!addPaymentForm)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 ">
          <h4 className=" text-[#757575] text-[13px] ">Add Payment</h4>
          <button
            onClick={() => setAddPaymentForm(!addPaymentForm)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" border-y border-solid border-[#D7D7D7]  ">
            <div className="mt-5">
              <table>
                <thead className="">
                  <th className="text-left">Orders: </th>
                  <th className="text-left">
                    Select All <input type="checkbox" />
                  </th>
                </thead>
                <tbody className="">
                  <tr>
                    <td>Order # 12343 (30.24 A$)</td>
                    <td className="text-right">
                      <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <td>Order # 5424 (9.94 A$)</td>
                    <td className="text-right">
                      <input type="checkbox" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-4">
              <label htmlFor="subject" className=" text-[#757575] capitalize  ">
                Receipt
              </label>
              <input
                type="file"
                className={`border border-solid border-[#CCCCCC] rounded-none focus:outline-none py-2 px-3text-[#757575] w-full mt-1`}
                {...register("receipt", {
                  //   required: "Subject is required.",
                })}
              />
            </div>
          </div>
          <div className="my-4">
            <label htmlFor="subject" className=" text-[#757575] capitalize  ">
              Documents we pay
            </label>
            <input
              type="file"
              className={`border border-solid border-[#CCCCCC] rounded-none focus:outline-none py-2 px-3 text-[#757575] w-full mt-1  ${
                errors.subject ? "border-red-600  " : ""
              }`}
              {...register("documentsWePay", {
                required: "Subject is required.",
              })}
            />
          </div>

          <div className="flex items-center mt-40 justify-between w-2/3 mx-auto">
            <button
              onClick={() => setAddPaymentForm(!addPaymentForm)}
              className={` border border-solid  rounded-3xl flex justify-center items-center hover:text-white py-3 px-4  font-mono bg-transparent text-black transition-all duration-300 ease-in-out capitalize text-xs hover:bg-[#00c220] border-[#00c220] w-auto`}
            >
              Cancel
            </button>
            <button
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

export default AddPaymentForm;