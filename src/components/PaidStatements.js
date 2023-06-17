import React from "react";
import UserTablePagination from "./UserTablePagination";
import { toNormalizeDate } from "../__lib__/helpers/Formatter";

const PaidStatements = ({ orders }) => {

  return (
    <div className="grid grid-cols-12 gap-5 mt-3">
      <div className="col-span-8">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-[14px] font-light text-left text-[#6FB327] pl-5">
                {" "}
                Period
              </th>
              <th className="text-[14px] font-light text-left text-[#6FB327]">
                Shop
              </th>
              <th className="text-[14px] font-light text-left text-[#6FB327]">
                Orders
              </th>
              <th className="text-[14px] font-light text-left text-[#6FB327]">
                {" "}
                Orders Paid
              </th>
              <th className="text-[14px] font-light text-left text-[#6FB327]">
                {" "}
                Total
              </th>
              <th className="text-[14px] font-light text-left text-[#6FB327]">
                Balance
              </th>
              <th className="text-[14px] font-light text-left text-[#6FB327]">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              orders && orders.map((orr, index)=> <tr key={index} className="bg-white text-left border-y-4 border-slate-100">
              <td className="py-6 text-sm pl-5">{toNormalizeDate(orr.createdAt)}</td>
                <td className="py-6 text-sm">
                  {orr?.restaurant?.name}
                </td>
                <td className="py-6 text-sm">{orr.orders}</td>
                <td className="py-6 text-sm">{orr.ordersPaid}</td>
                <td className="py-6 text-sm">{orr.total}$</td>
                <td className="py-6 text-sm">{orr.balance}$</td>
                <td className="py-6 text-sm">
                  <button
                    className={` border border-solid text-center px-1  h-[22px] rounded-3xl text-white  font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out capitalize text-xs  bg-[#6FB327] border-[#6FB327]`}
                  >
                    Add Payment
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex justify-center items-center">
          <UserTablePagination />
        </div>
      </div>
      <div className="col-span-4">
        <div className="w-[370px] h-[841px] shadow-xl bg-white px-4">
          <p className="text-[#6FB327] text-sm font-medium py-2">
            Quick Filters
          </p>
          <p className=" text-sm font-medium text-black py-2">Period</p>
          <div className="flex justify-between items-center gap-3">
            <div>
              <label className="text-[#757575] text-[13px] block">
                From Date:
              </label>
              <input
                className="w-[160px] h-[40px] border-[#CCCCCC] border-[2px]"
                type="date"
              />
            </div>
            <div>
              <label className="text-[#757575] text-[13px] block">
                To Date:
              </label>
              <input
                className="w-[160px] h-[40px] border-[#CCCCCC] border-[2px]"
                type="date"
              />
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <button className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent transition-all duration-300 ease-in-out focus:outline-none active:outline-none  hover:text-black cursor-pointer">
              SEARCH
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidStatements;