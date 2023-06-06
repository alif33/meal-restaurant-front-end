import React from "react";

const DashboardTableListItem = ({ user }) => {
  return (
    <tr className="bg-white text-center border-y-4 border-slate-100">
      <td className="py-6 text-sm">{user?.userName}</td>
      <td className="py-6 text-sm">{user?.name}</td>
      <td className="py-6 text-sm">{user?.type}</td>
      <td className="py-6 text-sm">{user?.team}</td>
      <td className="py-6 text-sm">{user?.email}</td>
      <td className="py-6 text-sm">{user?.phone}</td>
      <td className="py-6 text-sm">{user?.createdAt}</td>
      <td className="py-6 text-sm">
        {" "}
        <button
          className={` border border-solid text-center  rounded-3xl text-white py-2 px-4  font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out capitalize text-xs w-28 ${
            user?.status === "ACTIVE"
              ? `bg-[#00c220] border-[#00c220]`
              : `bg-[#B34027] border-[#B34027]`
          } `}
        >
          {/* {false ? "Active" : "DEACTIVATED"} */}
          {user?.status}
        </button>
      </td>
      <td className="py-6 pr-2 text-sm">
        <input type="checkbox"></input>
      </td>
    </tr>
  );
};

export default DashboardTableListItem;
