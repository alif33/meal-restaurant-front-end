import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import Layout from "../base/Layout";
import ClipLoader from "react-spinners/ClipLoader";
import DashboardTableListItem from "../components/users/DashboardTableListItem";
import UserTablePagination from "../components/users/UserTablePagination";
import AddUserForm from "../components/users/AddUserForm";
import DashboardTable from "../components/users/DashboardTable";
import {
  authPost,
  postData,
  _getData,
} from "../__lib__/helpers/HttpService";

const Users = () => {
  const [users, setUsers] = useState();
  const [addUserForm, setAddUserForm] = useState(false);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0);
  const { auth } = useSelector((state) => state);
  
  const [isReload, setIsReload] = useState(false);
  useEffect(() => {
    _getData("/users", auth?.token).then((res) => {
      setUsers(res);
    });
  }, [isReload]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ImageHandler = (file) => {
    if (file.length>0) {
      const formData = new FormData();
      formData.append("image", file[0]);
      postData("/upload", formData, setProgress)
        .then(res=>{
          console.log(res);
          if(res.success){
            const { secure_url } = res.image;
            setImage(secure_url);
          }
        })
        .catch(err=>{
          console.log(err);
        })
    }
  };


  const onError = (err) => console.log(err);

  const onSubmit = (data) => {

    authPost("/user/register", { 
      ...data,
      image
    }, auth?.token)
    .then((res) => {
      toast.success(`${res.message}`);
      reset();
      // setIsReload(!isReload);
      console.log(res);
    });
  };
  return (
    <Layout status="user">
      <div className="w-11/12 mx-auto mt-4">
        <DashboardTable setAddUserForm={setAddUserForm} />

        <table className="w-full">
          <tbody>
            {users?.map((user) => (
              <DashboardTableListItem user={user} key={user._id} />
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center">
          <UserTablePagination />
        </div>
      </div>
      {addUserForm && (
        <AddUserForm addUserForm={addUserForm} setAddUserForm={setAddUserForm}>
          <div className="flex items-center justify-between mb-4 ">
            <h4 className=" text-[#757575] text-[13px] ">Add new user</h4>
            <button
              onClick={() => setAddUserForm(!addUserForm)}
              className=" border-none text-[#757575] text-2xl bg-transparent  "
            >
              <AiOutlineCloseCircle />
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className=" border-y border-solid border-[#D7D7D7]  ">
              <div className="my-4">
                <label
                  htmlFor="username"
                  className=" text-[#757575] capitalize  "
                >
                  username
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="username"
                  className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                  {...register("userName", {
                    // required: "username is required.",
                  })}
                />
              </div>
              <div className="my-4">
                <label
                  htmlFor="password"
                  className=" text-[#757575] capitalize  "
                >
                  password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                  {...register("password", {
                    // required: "password is required.",
                  })}
                />
              </div>
              <div className="my-4">
                <label htmlFor="email" className=" text-[#757575] capitalize  ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="naomi.parking@gmail.com"
                  className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                  {...register("email", {
                    // required: "email is required.",
                  })}
                />
              </div>
              <div className="my-4">
                <label htmlFor="name" className=" text-[#757575] capitalize  ">
                  First Name / Last Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="name"
                  className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                  {...register("name", {
                    // required: "email is required.",
                  })}
                />
              </div>
              <div className="my-4">
                <label htmlFor="name" className=" text-[#757575] capitalize  ">
                  Team
                </label>
                <select
                  type="text"
                  id="name"
                  placeholder="name"
                  className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                  {...register("type")}
                >
                  <option value="Employee">Employee</option>
                  <option value="Employee1">Employee1</option>
                </select>
              </div>
              <div className="my-4">
                <label htmlFor="name" className=" text-[#757575] capitalize  ">
                  Type
                </label>
                <select
                  type="text"
                  id="name"
                  placeholder="name"
                  className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                  {...register("team")}
                >
                  <option value="Customer">Customer</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div className="my-4">
                <label
                  htmlFor="number"
                  className=" text-[#757575] capitalize  "
                >
                  Mobile phone
                </label>
                <input
                  type="tel"
                  id="name"
                  placeholder="078 635 89 65"
                  className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                  {...register("phone", {
                    // required: "email is required.",
                  })}
                />
              </div>

              <div className="my-4">
                <div className="flex items-center mr-4">
                  <input
                    id="green-checkbox"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-green-600 bg-gray-100 rounded border-gray-300 focus:ring-green-500 "
                    {...register("status", {})}
                  />
                  <label
                    htmlFor="green-checkbox"
                    className="ml-2 text-sm font-medium text-gray-900 "
                  >
                    Active
                  </label>
                </div>
              </div>
              <div className="my-4">
                <label
                  htmlFor="number"
                  className=" text-[#757575] capitalize  "
                >
                  Profile Image
                </label>
                <input
                  id="name"
                  type="file"
                  placeholder="078 635 89 65"
                  className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                  onChange={e=>ImageHandler(e.target.files)}
                />
                {progress > 0 && <progress value={progress} max="100" />}
              </div>
            </div>

            <div className="flex items-center mt-6 justify-between w-2/3 mx-auto">
              <button
                className={` border border-solid  rounded-3xl flex justify-center items-center hover:text-white py-3 px-4  font-mono bg-transparent text-black transition-all duration-300 ease-in-out capitalize text-xs hover:bg-[#00c220] border-[#00c220] w-auto`}
              >
                Cancel
              </button>
              <button
                className={` border border-solid  rounded-3xl flex justify-center items-center text-white py-3 px-4  font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out capitalize text-xs auto bg-[#00c220] border-[#00c220]`}
              >
                Save Changes
              </button>
            </div>
          </form>
        </AddUserForm>
      )}
    </Layout>
  );
};

export default Users;
