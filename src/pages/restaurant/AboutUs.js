// import Image from "next/image";
import React, { useState } from "react";
import Layout from "../../base/Layout";
// import editImg from "../../../public/img/pencil-svgrepo-com 1.png";
import AddUserForm from "../../components/AddUserForm";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
// import { useDispatch } from "react-redux";
import { updateData } from "../../__lib__/helpers/HttpService";
import { activeResturant } from "../../store/resturant/actions";

const AboutUs = () => {
  const [addUserForm, setAddUserForm] = useState(false);
  const { auth, resturant } = useSelector((state) => state);

  const dispatch = useDispatch();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onError = (err) => console.log(err);
  
  const onSubmit = (data) => {
    console.log(resturant?.activeResturant?._id);
    
    updateData(
      // `/resturant?_id=${resturant?.activeResturant?._id}`,
      // { ...data, ...images },
      // admin?.token

      `/restaurant?_id=${ resturant?.activeResturant?._id }`,
      data,
      auth?.token
    ).then((res) => {

      console.log("RES", res);

      // if (res.success) {
      //   dispatch(activeResturant(res.resturant));
      // }
      setAddUserForm(!addUserForm);
      reset();
    });
  };
  return (
    <Layout status="restaurant">
      <div className="w-11/12 mx-auto mt-4">
        <div className="border-b-2 pb-[48px]">
          <h1 className="text-[26px] font-light">
            About Us - { resturant?.activeResturant?.name }
          </h1>
        </div>
        <div className="w-[656px] h-[320px] bg-white shadow-md mt-[16px] p-[21px]">
          <div>
            <h1 className="font-bold pb-4">Landing Page - About Us section:</h1>
            <p>{resturant?.activeResturant?.aboutUs}</p>
          </div>
          <div className="text-end mt-40">
            <button className="border-lime-600 border-[1px] py-1 px-[5px] rounded-2xl w-20 flex">
              <img className="mt-1" height="12.11" width="12.05" src="/img/pencil-svgrepo-com 1.png" alt="" />
              <span
                onClick={() => setAddUserForm(!addUserForm)}
                className="text-lime-500 pl-3"
              >
                {" "}
                Edit
              </span>
            </button>
          </div>
        </div>
      </div>
      <div>
        {addUserForm && (
          <AddUserForm
            addUserForm={addUserForm}
            setAddUserForm={setAddUserForm}
          >
            <div className="flex items-center justify-between mb-4 ">
              <h4 className=" text-[#757575] text-[13px] ">Edit About Us</h4>
              <button
                onClick={() => setAddUserForm(!addUserForm)}
                className=" border-none text-[#757575] text-2xl bg-transparent  "
              >
                <AiOutlineCloseCircle />
              </button>
            </div>
            <form
              className=" border-t border-solid border-[#D7D7D7] pt-8 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="pb-4 mt-3">
                <label className="w-full text-[#757575] mb-2 " htmlFor="">
                  About Us:
                </label>
                <textarea
                  className={`input w-full border-2  h-[179.46px] p-3   ${
                    errors?.aboutUs ? "border-red-600  " : ""
                  }`}
                  type="text"
                  defaultValue={resturant?.activeResturant?.aboutUs}
                  placeholder=""
                  {...register("aboutUs", {
                    required: " About Us Rep. is required.",
                  })}
                />
                <label className="label">
                  {errors.aboutUs?.type === "required" && (
                    <span className="label-text-alt text-xs text-red-600">
                      {errors?.aboutUs?.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="flex items-center mt-52 pt-7 justify-evenly  w-full mx-auto border-t-2 ">
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

export default AboutUs;
