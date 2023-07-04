import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { addCategory, setCategories } from "../../store/menu/actions";
import { setRestaurant } from "../../store/restaurant/actions";
import { _getData, authPost, postData } from "../../__lib__/helpers/HttpService";
import { showErr } from "../../__lib__/helpers/ErrHandler";

const ImportData = ({importDataModal, setImportDataModal}) => {
  const { register, reset, handleSubmit, formState: { errors } } = useForm();
  const [ _menu, setMENU ] = useState();
  const { restaurant, admin, menu } = useSelector((state) => state);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setRestaurant(admin.token));
  //   dispatch(setCategories(resturant.activeRestaurant?._id));
  // }, []);

  const inputhandler = e =>{
    const fileReader = new FileReader();
    fileReader.onload = f => {
        setMENU(JSON.parse(
            f.target.result
        ));
    };
    fileReader.readAsText(e.target.files[0]);
  }
  const onError = (err) => showErr(err);

  const onSubmit = async () => {
    if(_menu){

    console.log("Importing...");
    
    authPost("/menu/import",{ menu: _menu, resturant: restaurant.activeRestaurant?._id }, admin.token)
        .then(res=>{
            console.log(res);
            if(res.success){
                dispatch(setCategories(
                    restaurant.activeRestaurant?._id
                ));
                toast.success(`${res.message}`);
                setImportDataModal(false);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
  };

  return (
    <>
    <div
        onClick={() => setImportDataModal(!importDataModal)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[16px] flex">
            <span className="mr-2"></span>
                Import
          </h4>
          <button
            type="button"
            onClick={() => setImportDataModal(!importDataModal)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <form 
            className="p-5" 
            onSubmit={handleSubmit(onSubmit, onError)}
        >
          <div>
            <input
              type="file"
              className="input w-full border h-[40.85px]"
              onChange={e=>inputhandler(e)}
            />
          </div>

          <div className="flex items-center mt-1 pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              type="button"
              onClick={() => setImportDataModal(!importDataModal)}
              className={` border border-solid  rounded-3xl flex justify-center items-center hover:text-white py-3 px-4  font-mono bg-transparent text-black transition-all duration-300 ease-in-out capitalize text-xs hover:bg-[#00c220] border-[#00c220] w-auto`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={` border border-solid  rounded-3xl flex justify-center items-center text-white py-3 px-4  font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out capitalize text-xs auto bg-[#00c220] border-[#00c220]`}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ImportData;
