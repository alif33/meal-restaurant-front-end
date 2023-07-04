import React from "react";
import DashbardSearchBar from "./DashbardSearchBar";

const DashboardTable = ({ handleOrder, handleSerch, setAddUserForm }) => {
  return (
    <>
      <DashbardSearchBar 
        handleOrder={handleOrder} 
        handleSerch={handleSerch} 
        setAddUserForm={setAddUserForm} 
      />
    </>
  );
};

export default DashboardTable;
