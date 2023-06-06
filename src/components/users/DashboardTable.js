import React from "react";
import DashbardSearchBar from "./DashbardSearchBar";

const DashboardTable = ({ setAddUserForm }) => {
  return (
    <>
      <DashbardSearchBar setAddUserForm={setAddUserForm} />
      <ul className="mt-3">
        {/* <DashboardTableListItem />
        <DashboardTableListItem /> */}
      </ul>
    </>
  );
};

export default DashboardTable;
