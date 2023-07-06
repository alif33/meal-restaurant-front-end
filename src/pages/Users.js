import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import ReactPaginate from 'react-paginate';
import { useSelector } from "react-redux";
import Layout from "../base/Layout";
import SyncLoader from "react-spinners/SyncLoader";
import DashboardTableListItem from "../components/users/DashboardTableListItem";
import AddUserForm from "../components/users/AddUserForm";
import DashboardTable from "../components/users/DashboardTable";
import { override, userFields } from "../__lib__/config";
import {
  authPost,
  postData,
  _getData,
} from "../__lib__/helpers/HttpService";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import EditUserForm from "../components/users/EditUserForm";

const Users = () => {
  const [users, setUsers] = useState();
  const [coreUsers, setCoreUsers] = useState();
  const [userOffset, setUserOffset] = useState(0);
  const [searchKeyword, setSearchKeyword] = useState();
  const [roles, setRoles] = useState([]);
  const [addUserForm, setAddUserForm] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [updateUser, setUpdateUser] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [progress, setProgress] = useState(0);
  const { auth } = useSelector((state) => state);
  
  //pagination 
  const usersPerPage = 4; 

  const endOffset = userOffset + usersPerPage;
  const currentUsers = users? users?.slice(userOffset, endOffset): null;
  const pageCount = users? Math.ceil(users.length / usersPerPage): null;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * usersPerPage) % users?.length;
    setUserOffset(newOffset);
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchRoles = ()=>{
    _getData("/roles", auth?.token)
    .then((res) => {
      if(res.roles) setRoles(res.roles)
    });
  }

  const fetchUsers = ()=>{
    _getData("/users", auth?.token)
    .then((res) => {
      setUsers(res);
      setCoreUsers(res);
      setFetching(false);
    });
  }

  useEffect(() => {
    fetchRoles()
    fetchUsers()
  }, []);


  const handleOrder = field =>{
    const sortedArray = [...coreUsers];

    sortedArray.sort((a, b) => {
      const valueA = a[field];
      const valueB = b[field];

      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });

    setUsers(sortedArray);
  }

  const handleSerch =(input, keyword) =>{
    if(input){
      setSearchKeyword(keyword)

    }else{
      const filteredUsers = coreUsers.filter((item) => {
        const name = item.name.toString().toLowerCase();
        return name.includes(searchKeyword.toString().toLowerCase());
      });
    
      setUsers(filteredUsers);
    }
  }  

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


  const onError = (err) =>{
    let hadShown = false;

    userFields.map(name=>{
      if(!hadShown && err?.[`${name}`]){
        const msg = err?.[`${name}`].message;
        toast.error(`${msg}`);
        hadShown = true
      }
    })
  } 

  const onSubmit = (data) => {
    setLoading(true);

    authPost("/user/register", { 
      ...data,
      image
    }, auth?.token)
    .then((res) => {
      setLoading(false);
      fetchUsers();
      toast.success(`${res.message}`);
      reset();
      setAddUserForm(!addUserForm);
    })
    .catch(err=>{
      setLoading(false);
      console.log(err)
    })
  };


  return (
    <Layout status="user">
      {
        fetching? <SyncLoader cssOverride={override} loading={fetching} color="#36d7b7" /> : <>
          <div className="w-11/12 mx-auto my-6">
        <DashboardTable handleOrder={handleOrder} handleSerch={handleSerch} setAddUserForm={setAddUserForm} />

        <table className="w-full">
          <thead className="my-4">
            <tr>
              <th scope="col">User name</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Created</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            { currentUsers?.map((user) => (
              <DashboardTableListItem 
                key={user._id} 
                user={user} 
                fetchUsers={fetchUsers}
                hadUpdate={hasUpdate}
                setHasUpdate={setHasUpdate}
                updateUser={updateUser}
                setUpdateUser={setUpdateUser}
              />
            ))}
          </tbody>
        </table>

        <div className="flex justify-center items-center">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<button className="w-8 h-8 text-3xl flex justify-center items-center bg-[#6FB327] border border-solid border-[#6FB327] text-white rounded-full">
              <MdKeyboardArrowRight/>
            </button>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={
              <button className="w-8 h-8 text-3xl flex justify-center items-center bg-[#6FB327] border border-solid border-[#6FB327] text-white rounded-full">
              <MdKeyboardArrowLeft />
            </button>
            }
            renderOnZeroPageCount={null}
            containerClassName="flex justify-between items-center mt-5"
            pageClassName="border border-solid text-[#858585] rounded-full mx-1"
            previousClassName="mr-2"
            nextClassName="ml-2"
            pageLinkClassName="w-8 h-8 text-md flex justify-center items-center bg-transparent border border-solid  text-[#858585] rounded-full"
            activeClassName="border-[#00c220]"
            disabledClassName="opacity-50 cursor-not-allowed"
          />
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
                      id="username"
                      type="text"
                      className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                      {...register("userName", {
                        required: "Username required",
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
                      id="password"
                      type="password"
                      className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                      {...register("password", {
                        required: "Password required.",
                      })}
                    />
                  </div>
                  <div className="my-4">
                    <label htmlFor="email" className=" text-[#757575] capitalize  ">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                      {...register("email", {
                        required: "Email required",
                      })}
                    />
                  </div>
                  <div className="my-4">
                    <label htmlFor="firstName" className=" text-[#757575] capitalize  ">
                      First Name / Last Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                      {...register("name", {
                        required: "Name required",
                      })}
                    />
                  </div>
                  <div className="my-4">
                    <label htmlFor="team" className=" text-[#757575] capitalize  ">
                      Team
                    </label>
                    <select
                      id="team"
                      type="text"
                      className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                      {...register("team")}
                    >
                      {
                        roles.map((role, index)=><option key={index} value={role._id}>{role.name}</option>)
                      }
                    </select>
                  </div>
                  <div className="my-4">
                    <label
                      htmlFor="telNumber"
                      className=" text-[#757575] capitalize  "
                    >
                      Mobile phone
                    </label>
                    <input
                      id="telNumber"
                      type="tel"
                      className="border border-solid border-[#CCCCCC] rounded-none py-2 px-3 text-[#757575] w-full mt-1 "
                      {...register("phone", {
                        required: "Phone number required",
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
                    type="button"
                    className={` border border-solid  rounded-3xl flex justify-center items-center hover:text-white py-3 px-4  font-mono bg-transparent text-black transition-all duration-300 ease-in-out capitalize text-xs hover:bg-[#00c220] border-[#00c220] w-auto`}
                    onClick={()=>setAddUserForm(!addUserForm)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`${loading && "pointer-events-none bg-gray-300 text-gray-500 hover:bg-gray-300 hover:text-gray-500"} bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-center items-center text-white py-3 px-4  font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out capitalize text-xs auto`}
                  >
                  Save Changes
                  </button>
                </div>
              </form>
            </AddUserForm>
          )}

          {hasUpdate && (
            <AddUserForm addUserForm={hasUpdate} setAddUserForm={setHasUpdate}>
              <EditUserForm hasUpdate={hasUpdate} setHasUpdate={setHasUpdate} />
            </AddUserForm>
          )}
        </>
      }
      
    </Layout>
  );
};

export default Users;
