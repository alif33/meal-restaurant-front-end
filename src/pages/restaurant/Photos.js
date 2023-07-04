import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../base/Layout";
import { useForm } from "react-hook-form";
import { HiPencil } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import DeleteIcon from "../../svg/DeleteIcon";
import AddUserForm from "../../components/AddUserForm";
import { 
    authPost, 
    deleteData, 
    postData 
} from "../../__lib__/helpers/HttpService";
import { useSelector, useDispatch } from "react-redux";
import { setPhotos } from "../../store/restaurant/actions";

const RestaurantPhotos = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [tapList, setTapList] = useState(true);
  const [addUserForm, setAddUserForm] = useState(false);
  const [image, setImage] = useState();
  const { restaurant, auth } = useSelector(state=>state);
  const dispatch = useDispatch();


  useEffect(()=>{
    dispatch(setPhotos(
      restaurant?.activeRestaurant?._id,
      auth.token
    ))
  }, [])

  const ImageHandler = (file) => {
    if (file.length>0) {
      console.log("uploading...");
      const formData = new FormData();
      formData.append("image", file[0]);
      postData("/upload", formData)
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

  const handleDelete = _id =>{
      deleteData(`/restaurant/photo?_id=${ _id }&type=PHOTO`, auth.token)
      .then(res=>{
        if(res.success){
          dispatch(setPhotos(
            restaurant?.activeRestaurant?._id,
            auth.token
          ));
          toast.success(`${res.message}`);
        }
      })
  }

  const onError = (err) => console.log(err);

  const onSubmit = (data) => {
      authPost(`/restaurant/photo?resturant=${ restaurant?.activeRestaurant?._id }&type=PHOTO`,
      {...data,
        uri: image,
        tags: data.tags.split(" "),
        status: data.status? "ACTIVE" : "DEACTIVE"
      },
      auth.token
    ).then(res=>{
      if(res.success){
        dispatch(setPhotos(
          restaurant?.activeRestaurant?._id,
          auth.token
        ));
        toast.success(`${res.message}`);
      }
    })
  };

  return (
    <Layout status="restaurant">
      <div className="w-11/12 mx-auto mt-4">
        <div className="flex justify-between items-center ">
          <h1 className=" text-[#212121] text-[26px] font-mono ">
            Statements - { restaurant?.activeRestaurant?.name }
          </h1>
          <div className="">
            <button
              onClick={() => setAddUserForm(true)}
              className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out   "
            >
              Add new Photo
            </button>
          </div>
        </div>
        <ul className="w-full border-b border-solid border-[#c7c7c7] flex items-center  ">
          <li>
            <button
              onClick={() => setTapList(true)}
              className={`border-b-2 bg-transparent border-solid py-4 mr-4 text-sm ${
                tapList
                  ? "border-b-[#00c220] text-[#00c220] "
                  : "border-b-transparent text-[#999999] "
              } `}
            >
              Active Photos
            </button>
          </li>
          <li>
            <button
              onClick={() => setTapList(false)}
              className={`border-b-2 bg-transparent border-solid py-4 mr-4 text-sm ${
                !tapList
                  ? "border-b-[#00c220] text-[#00c220] "
                  : "border-b-transparent text-[#999999] "
              } `}
            >
              Secondary Photos
            </button>
          </li>
        </ul>

        {tapList && (
          <>
            <div className="grid grid-cols-3 mt-7 ">
              {
                restaurant?.photos && 
                Array.isArray(restaurant?.photos) &&
                restaurant.photos.map((photo, index)=>(
                  <div key={ index } className="bg-white relative mr-5">
                    <div className="card-img w-full h-[300px]  ">
                      <img
                        height="500"
                        width="500"
                        src={ photo.uri }
                        alt=""
                      />
                    </div>
                    <span className="text-white  border-[#6FB327] border border-solid flex w-20 justify-center items-center rounded-full cursor-pointer bg-[#6FB327] absolute top-[5%] left-[5%] h-7 ">
                      Active
                    </span>
                    <div className="p-3">
                      <h4>
                        <b>Tags: </b>{Array.isArray(photo.tags) 
                        && photo.tags.map((tag, index)=><span key={ index }>{index!==0? ", ": ""}{tag}</span>)}
                      </h4>
                      <h4 className="mt-6">Upload Date: </h4>
                      <h4 className="mt-1">09.10.2022 14:35</h4>
                    </div>
                    <div className="flex justify-end items-center px-9 pb-5 ">
                      <span className="text-[#6FB327] mr-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center rounded-full cursor-pointer ">
                        <HiPencil />
                        Edit
                      </span>
                      <span 
                        onClick={()=>handleDelete(photo._id)} 
                        className="cursor-pointer">
                        <DeleteIcon />
                      </span>
                    </div>
                </div>
                ))
              }
            </div>
          </>
        )}
        {/*   {!tapList && <DemographyOrder />} */}
      </div>
      {addUserForm && (
        <AddUserForm addUserForm={addUserForm} setAddUserForm={setAddUserForm}>
          <div className="flex items-center justify-between mb-4 ">
            <h4 className=" text-[#757575] text-[13px] ">Add Photo</h4>
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
            <div className="">
              <input
                id="activeCheck"
                type="checkbox"
                {...register("status", {
                  // required: " Sales Rep. is required.",
                })}
              />
              <label
                htmlFor="activeCheck"
                className="ml-2 text-[#212121] font-sans text-sm "
              >
                Active
              </label>
            </div>
            <div className="">
              <label
                htmlFor="fileInputPicUpload"
                className=" text-[#757575] mb-2 mt-3 block cursor-pointer "
              >
                Profile Image
              </label>
              <div className="h-36 cursor-pointer relative flex justify-center items-center border-2">
                <input
                  type="file"
                  onChange={e=>ImageHandler(e.target.files)}
                  className="z-20 opacity-0 cursor-pointer h-full w-full "
                />
                <div className="absolute flex justify-center items-center gap-2">
                  {
                    image ? (
                      <img
                        className={`h-24 w-30`}
                        src={image}
                      />
                    ) : (
                      <span className="w-56 truncate mb-2 text-sm text-gray-500 dark:text-gray-400">
                        Drop Files Here
                      </span>
                    )
                  }
                </div>
              </div>
            </div>
            <div className="pb-4 mt-3">
              <label className="w-full text-[#757575] mb-2 " htmlFor="">
                Tags:
              </label>
              <input
                className="input w-full border-2 h-[40.85px] p-3"
                type="text"
                placeholder=""
                {...register("tags", {
                  // required: " Sales Rep. is required.",
                })}
              />
            </div>

            <div className="flex items-center mt-36 pt-7 justify-evenly  w-full mx-auto border-t-2 ">
              <button
                type="button"
                className={` border border-solid  rounded-3xl flex justify-center items-center hover:text-white py-3 px-4  font-mono bg-transparent text-black transition-all duration-300 ease-in-out capitalize text-xs hover:bg-[#00c220] border-[#00c220] w-auto`}
              >
                Cancel
              </button>
              <button
                type="submit"
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

export default RestaurantPhotos;
