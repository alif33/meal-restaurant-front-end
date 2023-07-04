import React, { useEffect, useState } from "react";
import Layout from "../../base/Layout";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import AddUserForm from "../../components/AddUserForm";
import { authPost, deleteData } from "../../__lib__/helpers/HttpService";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setCousines } from "../../store/restaurant/actions";

const CusineTypes = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [cousins, setCousins] = useState();
  const [addUserForm, setAddUserForm] = useState(false);
  const { restaurant, auth } = useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setCousines(
      restaurant?.activeRestaurant?._id, 
      auth?.token
    ))
  },[])

  const onError = (err) => console.log(err);
  const onSubmit = (data) => {
    authPost(
      `/restaurant/cuisine-type?_id=${restaurant?.activeRestaurant?._id}`,
      data,
      auth?.token
    ).then((res) => {
      if (res.success) {
        dispatch(setCousines(
          restaurant?.activeRestaurant?._id, 
          auth?.token
        ))
        toast.success(`${res.message}`);
        reset();
      }
    });
  };

  const handleDelete = _id =>{
    
    console.log("Delete", _id);

    deleteData(`/restaurant/cuisine-type?_id=${ _id }`, auth.token)
    .then(res=>{
      console.log(res);
      if(res.success){
        dispatch(setCousines(
          restaurant?.activeRestaurant?._id, 
          auth?.token
        ))
        toast.success(`${res.message}`);
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

  return (
    <Layout status="restaurant">
      <div className="w-11/12 mx-auto mt-4">
        <div className="flex justify-between items-center border-b-2 pb-[48px]">
          <h1 className="text-[26px] font-light">
            Cusine Types - {restaurant?.activeRestaurant?.name}
          </h1>
          <button
            onClick={() => setAddUserForm(!addUserForm)}
            className="bg-gradient-to-r from-lime-500 to-lime-700 py-2 px-3 text-white rounded-3xl"
          >
            Add Cuisine Type
          </button>
        </div>
        <div className="pt-[42px]">
          {restaurant?.cousines &&
            Array.isArray(restaurant?.cousines) &&
              restaurant?.cousines.map((cusine, index) => (
                <div
                  key={index}
                  className="w-[364px] h-[60px] shadow-md bg-white mb-[30px]"
                >
                  <div className="flex justify-around items-center pt-[14px]">
                    <p>{cusine.type}</p>
                    <button className="border-lime-600 border-[1px] py-1 px-[5px] rounded-2xl w-20 flex">
                      <img className="my-auto" height="12.11" width="12.05" src="/img/pencil-svgrepo-com 1.png" alt="" />
                      <span className="text-lime-500 pl-3"> Edit</span>
                    </button>
                    <button
                      onClick={()=>handleDelete(cusine._id)}
                    >
                      {" "}
                      <img  
                        height="26" 
                        width="21.15" 
                        src="/img/delete.png" 
                        alt="dlt icon" 
                      />
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div>
        {addUserForm && (
          <AddUserForm
            addUserForm={addUserForm}
            setAddUserForm={setAddUserForm}
          >
            <div className="flex items-center justify-between mb-4 ">
              <h4 className=" text-[#757575] text-[13px] ">Add Cuisine Type</h4>
              <button
                onClick={() => setAddUserForm(!addUserForm)}
                className=" border-none text-[#757575] text-2xl bg-transparent  "
              >
                <AiOutlineCloseCircle />
              </button>
            </div>
            <form
              className=" border-t border-solid border-[#D7D7D7] pt-8 "
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              <div className="pb-4 mt-3">
                <label className="w-full text-[#757575] mb-2 " htmlFor="">
                  Cuisine Type:
                </label>
                <input
                  className="input w-full border-2 h-[49px] p-3"
                  type="text"
                  placeholder=""
                  {...register("type", {
                    // required: " Sales Rep. is required.",
                  })}
                />
              </div>

              <div className="flex items-center mt-72 pt-7 justify-evenly  w-full mx-auto border-t-2 ">
                <button
                  onClick={() => setAddUserForm(!addUserForm)}
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
      </div>
    </Layout>
  );
};

export default CusineTypes;
