import React from "react";
import CardWidgetWithTitle from "./CardWidgetWithTitle";
import UserTablePagination from "./UserTablePagination";

const UnpaidStatements = ({ orders }) => {

  return (
    <> 
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-7">
          <CardWidgetWithTitle>
            <div className="py-4 px-5">
              <h4 className="text-xl">Unpaid Statements</h4>
              <p className="text-sm text-[#717171] mt-2 ">
                Unpaid statements for the shop betwenn timerange
              </p>

              <div className="grid grid-cols-[38%_38%_20%] gap-[1%] mt-3 ">
                <div className="">
                  <label
                    htmlFor=""
                    className=" text-[#757575] text-sm mb-2 block "
                  >
                    From Date:
                  </label>
                  <input
                    type="date"
                    className=" w-full border border-solid border-[#CCCCCC]  text-base px-3 py-1 "
                  />
                </div>
                <div className="">
                  <label
                    htmlFor=""
                    className=" text-[#757575] text-sm mb-2 block "
                  >
                    From Date:
                  </label>
                  <input
                    type="date"
                    className=" w-full border border-solid border-[#CCCCCC]  text-base px-3 py-1 "
                  />
                </div>
                <div className="flex justify-end items-end ">
                  <button className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent transition-all duration-300 ease-in-out focus:outline-none active:outline-none  hover:text-black cursor-pointer">
                    Search
                  </button>
                </div>
              </div>
            </div>
          </CardWidgetWithTitle>
          <CardWidgetWithTitle>
            <div className="py-4 ">
              <h3 className="border-b border-solid border-[#000000] pb-3 ">
                Unpaid Statements Results:{" "}
              </h3>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-[14px] font-light text-left text-[#6FB327]">
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
                  </tr>
                </thead>
                <tbody>
                  {
                    orders && orders.map((orr, index)=>  <tr className="bg-white text-left border-y-4 border-slate-100">
                    <td className="py-6 text-sm">14/08/2022 - 14/09/2022</td>
                    <td className="py-6 text-sm">
                      {orr.restaurant.name}
                    </td>
                    <td className="py-6 text-sm">{orr.orders}</td>
                    <td className="py-6 text-sm">{orr.ordersPaid}</td>
                    <td className="py-6 text-sm">{orr.total}$</td>
                    <td className="py-6 text-sm">{orr.balance}$</td>
                  </tr>)
                  }
                </tbody>
              </table>
              <div className="flex justify-center items-center">
                <UserTablePagination />
              </div>
            </div>
          </CardWidgetWithTitle>
        </div>
        <div className="col-span-5">
          <CardWidgetWithTitle>
            <div className="py-4  ">
              <div className="flex justify-between pb-4 border-b border-solid border-[#9E9E9E] ">
                <h3 className="text-xl font-sans ">MealNow</h3>
                <div className="">
                  <p className="text-[#717171] text-sm font-sans font-bold ">
                    {" "}
                    MealNow PTY LTD
                  </p>
                  <p className="text-[#717171] text-sm font-sans font-normal ">
                    {" "}
                    305 Waterheaven Boulevard
                  </p>
                  <p className="text-[#717171] text-sm font-sans font-normal">
                    {" "}
                    Point Cook VUC 3030
                  </p>
                  <p className="text-[#717171] text-sm font-sans font-normal">
                    {" "}
                    ABN: <b>37642202319</b>
                  </p>
                </div>
              </div>
              <div className="mt-[57px]">
                <p>
                  Date:{" "}
                  <span className="font-bold">24.06.2022 - 30.06.2022</span>
                </p>
                <p>
                  Payment Date:
                  <span className="font-bold">30.06.2022</span>
                </p>
                <p className="mt-[29px]">Bill to: </p>
                <p className="font-bold">Jasmin Lebanese Resturant Auburn</p>
              </div>
              <div className="overflow-x-auto pt-[19px]">
                <table className="table table-compact">
                  {/* <!-- head --> */}
                  <thead>
                    <tr className="pb-5">
                      <th className="text-[#757575] text-[10px] pb-5 pr-2">
                        Date & Time
                      </th>
                      <th className="text-[#757575] text-[10px] pb-5 pr-2">
                        Order ID
                      </th>
                      <th className="text-[#757575] text-[10px] pb-5 pr-2">
                        Order Type
                      </th>
                      <th className="text-[#757575] text-[10px] pb-5 pr-2">Type</th>
                      <th className="text-[#757575] text-[10px] pb-5 pr-2">
                        Pickup/Delivery{" "}
                      </th>
                      <th className="text-[#757575] text-[10px] pb-5 pr-2">
                        Delivery Fee
                      </th>
                      <th className="text-[#757575] text-[10px] pb-5 pr-2">Tips</th>
                      <th className="text-[#757575] text-[10px] pb-5 pr-2">
                        Total
                      </th>
                      <th className="text-[#757575] text-[10px] pb-5 pr-2">
                        P’ship Fee{" "}
                      </th>
                      <th className="text-[#757575] text-[10px] pb-5 pr-2">
                        Proc Fee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* <!-- row 1 --> */}
                    <tr className="">
                      <td className="text-[10px] text-center pb-5 font-bold">
                        24-06-2022
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        19348
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        Online
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        PAID
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        Pickup
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        0 A${" "}
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        {" "}
                        0.00 A$
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        80.00 A$
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        0.00 A$
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        {" "}
                        0.00 A$
                      </td>
                    </tr>
                    {/* <!-- row 2 --> */}
                    <tr>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        24-06-2022
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        19348
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        Online
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        PAID
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        Pickup
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        0 A${" "}
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        {" "}
                        0.00 A$
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        80.00 A$
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        0.00 A$
                      </td>
                      <td className="text-[10px] text-center pb-5 font-bold">
                        {" "}
                        0.00 A$
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-5">
                  <p className="text-[#717171] text-sm">Prepared Orders: </p>
                  <ul className="text-[#717171] text-sm">
                    <li>
                      Online Order <span className="pl-4">273.00 A$</span>
                    </li>
                    <li>
                      Cash Order <span className="pl-4">0.00 A$</span>{" "}
                    </li>
                  </ul>
                  <p className="font-bold text-[#717171] text-sm pt-2">
                    Total (Tip included) 273.00 A$
                  </p>
                </div>
                <div className="flex justify-end">
                  <div className="w-[270px] h-[119px] border-[1px] border-black px-2 py-1">
                    <p className="text-[#717171] text-xs font-bold">
                      Payout Details:{" "}
                    </p>
                    <div>
                      <div className="flex justify-between items-center py-[1px]">
                        <p className="text-[#717171] text-xs font-light">
                          Total Payout{" "}
                        </p>
                        <p className="text-[#717171] text-xs font-light">
                          273.00 A$
                        </p>
                      </div>
                      <div className="flex justify-between items-center py-[1px]">
                        <p className="text-[#717171] text-xs font-light">
                          Processing Fee{" "}
                        </p>
                        <p className="text-[#717171] text-xs font-light">
                          -0.00 A$
                        </p>
                      </div>
                      <div className="flex justify-between items-center py-[1px]">
                        <p className="text-[#717171] text-xs font-light">
                          MealNow Partnership fee{" "}
                        </p>
                        <p className="text-[#717171] text-xs font-light">
                          -10.92 A$
                        </p>
                      </div>
                      <div className="flex justify-between items-center py-[1px] pt-4">
                        <p className="text-[#717171] text-xs font-bold">
                          Total Payout{" "}
                        </p>
                        <p className="text-[#717171] text-xs font-bold">
                          273.00 A$
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <p className="text-[#757575] text-[10px] font-bold">
                    Payout Details:{" "}
                  </p>
                  <p className="text-[#757575] text-[10px] font-bold">
                    From 24 Jun 2022 to 30 Jun 2022 your Restaurant made 273.00
                    A$ with MealNow.{" "}
                  </p>
                  <p className="text-[#757575] text-[10px] font-bold">
                    You can expect a payout within 7-10 business days.{" "}
                  </p>
                </div>
                <div className="relative mt-16">
                  <div className="flex items-center gap-2 absolute bottom-0 right-0">
                    <button className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent transition-all duration-300 ease-in-out focus:outline-none active:outline-none  hover:text-black cursor-pointer">
                      Download as PDF
                    </button>
                    <button className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent transition-all duration-300 ease-in-out focus:outline-none active:outline-none  hover:text-black cursor-pointer">
                      Add Payment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </CardWidgetWithTitle>
        </div>
      </div>
    </>
  );
};

export default UnpaidStatements;
