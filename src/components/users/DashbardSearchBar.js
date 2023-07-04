import React from "react";
import { TbSearch } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";

const DashbardSearchBar = ({ handleOrder, handleSerch, setAddUserForm }) => {

  return (
    <div className="w-full flex items-center justify-between my-8">
      <div className="flex items-center">
        <h2 className=" text-[#212121]  text-2xl font-mono mr-4 ">Users</h2>
        <select onChange={e=>handleOrder(e.target.value)} className="focus:outline-none active:outline-none mx-4 px-3 py-2 bg-transparent border border-solid border-[#828282] rounded-3xl text-[#828282]">
          <option value="">Order by</option>
          <option value="name">name</option>
          <option value="userName">user name</option>
          <option value="email">email</option>
          <option value="phone">phone</option>
        </select>
        <div className=" bg-transparent border border-solid border-[#828282] rounded-3xl text-[#828282]  flex items-center py-1 px-3 ">
          <input
            type="text"
            className="bg-transparent focus:outline-none active:outline-none mr-2"
            placeholder="Search by name"
            onChange={e=>handleSerch(true, e.target.value)}
          />
          <TbSearch onClick={()=>handleSerch(false)} className="cursor-pointer" size={20} />
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
