import React, { useState } from "react";
import { updateData } from "../../__lib__/helpers/HttpService";
import Status from "./Status";

const RolesPermissionsTable = ({ roles, fetchRoles }) => {
  const _roles = ["dataEntry", "customerSupport", "accountManagement", "sales", "teamLeader", "manager", "financeTeam", "superAdmin"]

  return (
    <div>
      <table className="w-full whitespace-nowrap text-center">
        <thead className="py-2 text-[#6FB327] font-mono text-sm ">
          <tr className="h-16  ">                                                           
            <th className="font-normal"></th>
            <th className="font-normal">Data Entry</th>
            <th className="font-normal">Customer Support</th>
            <th className="font-normal">Account Management</th>
            <th className="font-normal">Sales</th>
            <th className="font-normal">Team Leader</th>
            <th className="font-normal">Manager</th>
            <th className="font-normal">Finance Team</th>
            <th className="font-normal">Super Admin</th>
          </tr>
        </thead>
            <tbody>
              {
                roles && roles.map((role, index)=>{
                  return (
                    <tr key={index} className="h-16 bg-white ">
                      <td className="pl-2 text-[#212121] font-mono font-normal text-sm ">
                        { role.name }
                      </td>
                      {
                        _roles.map((r, i)=><Status 
                          key={i} 
                          _id={role._id} 
                          state={r} 
                          status={role[r]}
                          fetchRoles={fetchRoles}
                        />)
                      }
                    </tr>
                  )
                })
              }
            </tbody>
      </table>
    </div>
  );
};

export default RolesPermissionsTable;
