import React, { useState } from "react";
import { updateData } from "../../__lib__/helpers/HttpService";
import { toast } from "react-hot-toast";

const Status = ({ _id, state, status, fetchRoles }) => {

  const handleUpdatePermission = ()=>{
    let updateProps = {}
    updateProps[`${state}`] = !status
    updateData(`/role/permission?_id=${_id}&status=${!status}`, {...updateProps})
      .then(res=>{
        toast.success(`${res.message}`)
        fetchRoles()
      })
      .catch(err=>{
        console.log(err);
      })
  }

  return (
    <td>
        <p
            className={`text-white text-xs font-semibold font-mono rounded-3xl w-16 m-auto py-2 cursor-pointer ${
                status ? "bg-[#6FB327]" : "bg-[#B32727]"
            }`}
            onClick={handleUpdatePermission}
        >
            { status? "ON": "OFF" }
        </p>
    </td>
  );
};

export default Status;
