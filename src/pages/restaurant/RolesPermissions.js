import React, { useEffect, useState } from "react";
import Layout from "../../base/Layout";
import RolesPermissionsTable from "../../components/RolesPermissionsTable";
import {
  getData,
} from "../../__lib__/helpers/HttpService";

const RestaurantPage = () => {
  const [roles, setRoles] = useState()

  const fetchRoles = ()=>{
    getData("/roles")
    .then(res=>{
      setRoles(res)
    })
    .catch(err=>{
      console.log(err);
    })
  }

  useEffect(() => {
    fetchRoles()
  }, []);

  return (
    <Layout status="restaurant">
      <div className="w-11/12 mx-auto mt-4">
      <h2 className=" text-[#212121]  text-2xl font-mono mr-4 ">Settings</h2>
        <div className="mt-3">
          <RolesPermissionsTable
            roles={roles}
            fetchRoles={fetchRoles}
          />
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantPage;