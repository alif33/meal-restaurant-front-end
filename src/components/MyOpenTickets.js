import React, { useState } from "react";
import Layout from "../../../src/section/Layout";
import ChartIcon from "../../../src/svg/ChartIcon/ChartIcon";
import CheckBoxIcon from "../../../src/svg/CheckBoxIcon/CheckBoxIcon";
import SnoozeIcon from "../../../public/img/SnoozeIcon.svg";
import Image from "next/image";
import AddNewTicketForm from "../../../src/section/AddNewTicketForm/AddNewTicketForm";

const MyOpenTickets = () => {
  const [addNewTicketForm, setAddNewTicketForm] = useState(false);

  return (
    <Layout status="support">
      <div className="w-[97%] mx-auto mt-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-light text-[26px]">My Open Tickets (17)</h1>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <ChartIcon color={"#9E9E9E"} />
              <p>17</p>
            </div>
            <div className="flex items-center gap-3">
              <CheckBoxIcon color={"#9E9E9E"} />
              <p>2</p>
            </div>
            <div className="flex items-center gap-3">
              <Image height="" width="" src={SnoozeIcon} alt="" />
              <p>117</p>
            </div>
            <button
              onClick={() => setAddNewTicketForm(!addNewTicketForm)}
              className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent transition-all duration-300 ease-in-out focus:outline-none active:outline-none  hover:text-black cursor-pointer"
            >
              New Ticket
            </button>
          </div>
        </div>
        <div>
          <table className="w-full mt-5">
            <thead>
              <tr>
                <th className="text-[14px] font-light text-left text-[#6FB327]">
                  {" "}
                  Date Created
                </th>
                <th className="text-[14px] font-light text-left text-[#6FB327]">
                  Subject
                </th>
                <th className="text-[14px] font-light text-left text-[#6FB327]">
                  Message
                </th>
                <th className="text-[14px] font-light text-left text-[#6FB327]">
                  {" "}
                  Assigned From
                </th>
                <th className="text-[14px] font-light text-left text-[#6FB327]">
                  {" "}
                  Assigned Team
                </th>
                <th className="text-[14px] font-light text-left text-[#6FB327]">
                  Assigned User
                </th>
                <th className="text-[14px] font-light text-left text-[#6FB327]">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white text-left border-y-4 border-slate-100">
                <td className="py-6 text-sm">12/5/2021 - 17:51</td>
                <td className="py-6 text-sm">Adjust Price</td>
                <td className="py-6 text-sm">
                  Can you please adjust the price of following items .....
                </td>
                <td className="py-6 text-sm">Ava Maria</td>
                <td className="py-6 text-sm">Menu Team</td>
                <td className="py-6 text-sm">Johny Shepperd</td>
                <td className="py-6 text-sm">
                  <button
                    className={` border border-solid text-center w-[71.78px] h-[22px] rounded-3xl text-white  font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out capitalize text-xs  bg-[#6FB327] border-[#6FB327]`}
                  >
                    URGENT
                  </button>
                </td>
              </tr>
              <tr className="bg-white text-left border-y-4 border-slate-100">
                <td className="py-6 text-sm">12/5/2021 - 12:34</td>
                <td className="py-6 text-sm">Menu Update</td>
                <td className="py-6 text-sm">Can you please update the menu</td>
                <td className="py-6 text-sm">Ava Maria</td>
                <td className="py-6 text-sm">Menu Team</td>
                <td className="py-6 text-sm">Johny Shepperd</td>
                <td className="py-6 text-sm">
                  <button
                    className={` border border-solid text-center w-[71.78px] h-[22px] rounded-3xl text-white  font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out capitalize text-xs  bg-[#CF6262] border-[#CF6262]`}
                  >
                    LOW
                  </button>
                </td>
              </tr>
              <tr className="bg-white text-left border-y-4 border-slate-100">
                <td className="py-6 text-sm">12/5/2021 - 17:51</td>
                <td className="py-6 text-sm">Adjust Price</td>
                <td className="py-6 text-sm">
                  Can you please adjust the price of following items .....
                </td>
                <td className="py-6 text-sm">Ava Maria</td>
                <td className="py-6 text-sm">Menu Team</td>
                <td className="py-6 text-sm">Johny Shepperd</td>
                <td className="py-6 text-sm">
                  <button
                    className={` border border-solid text-center w-[71.78px] h-[22px] rounded-3xl text-white  font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out capitalize text-xs  bg-[#B3A527] border-[#B3A527]`}
                  >
                    HIGH
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {addNewTicketForm && (
        <AddNewTicketForm
          addNewTicketForm={addNewTicketForm}
          setAddNewTicketForm={setAddNewTicketForm}
        />
      )}
    </Layout>
  );
};

export default MyOpenTickets;


