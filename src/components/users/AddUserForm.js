import React from "react";

const AddUserForm = ({
  addUserForm,
  setAddUserForm,
  setStatusForm,
  statusForm,
  children,
}) => {
  return (
    <>
      <div
        onClick={() => setAddUserForm(!addUserForm)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        {children}
      </div>
    </>
  );
};

export default AddUserForm;