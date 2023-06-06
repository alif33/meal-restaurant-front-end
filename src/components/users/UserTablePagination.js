import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const UserTablePagination = () => {
  return (
    <ul className=" flex justify-between items-center mt-5 " >
      <li
        className={`w-8 h-8 text-3xl flex justify-center items-center bg-[#6FB327] border border-solid border-[#6FB327] text-white rounded-full  `}
      >
        <button>
          <MdKeyboardArrowLeft />
        </button>
      </li>

      <li
        className={`w-8 h-8 text-md flex justify-center items-center bg-transparent border border-solid  text-[#858585] rounded-full  ${
          false ? "border-[#6FB327]" : "border-[#6fb32700]"
        }`}
      >
        1
      </li>
      <li
        className={`w-8 h-8 text-md flex justify-center items-center bg-transparent border border-solid  text-[#858585] rounded-full  ${
          true ? "border-[#6FB327]" : "border-[#6fb32700]"
        }`}
      >
        2
      </li>
      <li
        className={`w-8 h-8 text-md flex justify-center items-center bg-transparent border border-solid  text-[#858585] rounded-full  ${
          false ? "border-[#6FB327]" : "border-[#6fb32700]"
        }`}
      >
        3
      </li>
      <li
        className={`w-8 h-8 text-md flex justify-center items-center bg-transparent border border-solid  text-[#858585] rounded-full  ${
          false ? "border-[#6FB327]" : "border-[#6fb32700]"
        }`}
      >
        4
      </li>
      <li
        className={`w-8 h-8 text-md flex justify-center items-center bg-transparent border border-solid  text-[#858585] rounded-full  ${
          false ? "border-[#6FB327]" : "border-[#6fb32700]"
        }`}
      >
        5
      </li>
      <li>
        <button
          className={`w-8 h-8 text-3xl flex justify-center items-center bg-[#6FB327] border border-solid border-[#6FB327] text-white rounded-full  `}
        >
          <MdKeyboardArrowRight />
        </button>
      </li>
    </ul>
  );
};

export default UserTablePagination;
