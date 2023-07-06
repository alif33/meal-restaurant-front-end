import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toNormalizeDate } from "../../__lib__/helpers/Formatter";
import { deleteData } from "../../__lib__/helpers/HttpService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

const DashboardTableListItem = ({ user, fetchUsers, hasUpdate, setHasUpdate, updateUser, setUpdateUser }) => {
  const { auth } =useSelector(state=>state)

  const handleUpdate = _id =>{
    setHasUpdate(true)
    setUpdateUser(_id)
  }

  const handleDelete = _id =>{
    deleteData(`/user?_id=${_id}`, auth.token)
    .then(
      res=>{
        if(res.success){
          toast.success(`${res.message}`);
          fetchUsers();
        }
      }
    )
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <tr className="bg-white text-center border-y-4 border-slate-100">
      <td className="py-6 text-sm">{ user?.userName }</td>
      <td className="py-6 text-sm">{ user?.name }</td>
      <td className="py-6 text-sm">{ user?.team?.name }</td>
      <td className="py-6 text-sm">{ user?.email }</td>
      <td className="py-6 text-sm">{ user?.phone }</td>
      <td className="py-6 text-sm">{ toNormalizeDate(user?.createdAt) }</td>
      <td className="py-6 text-sm">
        {" "}
        <button
          className={` border border-solid text-center  rounded-3xl text-white py-2 px-4  font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out capitalize text-xs w-28 ${
            user?.status === "ACTIVE"
              ? `bg-[#00c220] border-[#00c220]`
              : `bg-[#B34027] border-[#B34027]`
          } `}
        >
          { user?.status }
        </button>
      </td>
      <td className="py-6 pr-2 text-sm flex items-center mt-2">
        <AiFillEdit
           size={20}
           className="cursor-pointer text-green-500 mx-1"
           onClick={()=>handleUpdate(user._id)}
        />
        <RiDeleteBin6Line
          size={20}
          className="cursor-pointer text-red-500 mx-1"
          onClick={()=>handleDelete(user._id)}
        />
      </td>
    </tr>
  );
};

export default DashboardTableListItem;
