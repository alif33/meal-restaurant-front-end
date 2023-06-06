import React from "react";
import { TbSearch } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";

const DashbardSearchBar = ({ setAddUserForm }) => {
  return (
    <div className="w-full flex items-center justify-between mt-4">
      <div className="flex items-center">
        <h2 className=" text-[#212121]  text-2xl font-mono mr-4 ">Users</h2>
        <select className=" focus:outline-none active:outline-none   mx-4 px-3 py-1 bg-transparent border border-solid border-[#828282] rounded-3xl text-[#828282] ">
          <option value="">Order by</option>
          <option value="">Order by1</option>
          <option value="">Order by12</option>
        </select>
        <div className=" bg-transparent border border-solid border-[#828282] rounded-3xl text-[#828282]  flex items-center py-1 px-3 ">
          <input
            type="text"
            className=" bg-transparent focus:outline-none active:outline-none   "
            placeholder="Search over all fields"
          />
          <TbSearch />
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => setAddUserForm(true)}
          className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out   "
        >
          ADD NEW <MdKeyboardArrowDown />
        </button>
        <button className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out ml-4  ">
          ADD <MdKeyboardArrowDown />
        </button>
      </div>
    </div>
  );
};

export default DashbardSearchBar;
