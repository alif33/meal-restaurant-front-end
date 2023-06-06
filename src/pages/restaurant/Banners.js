import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Layout from "../../base/Layout";
import AddUserForm from "../../components/AddUserForm";
import CardWidgetWithTitle from "../../components/CardWidgetWithTitle";
import DeleteIcon from "../../svg/DeleteIcon";
import LiveShopIcon2 from "../../svg/LiveShopIcon2";
import { setBanners } from "../../store/resturant/actions";
import { 
    authPost, 
    deleteData, 
    postData 
} from "../../__lib__/helpers/HttpService";

const RestaurantBanners = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [addUserForm, setAddUserForm] = useState(false);
  const [image, setImage] = useState();
  const { resturant, auth } = useSelector(state=>state);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setBanners(
      resturant?.activeResturant?._id,
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
      deleteData(`/restaurant/photo?_id=${ _id }&type=BANNER`, auth.token)
      .then(res=>{
        if(res.success){
          dispatch(setBanners(
            resturant?.activeResturant?._id,
            auth.token
          ));
          toast.success(`${res.message}`);
        }
      })
  }

  const onError = (err) => console.log(err);

  const onSubmit = (data) => {
      authPost(`/restaurant/photo?resturant=${ resturant?.activeResturant?._id }&type=BANNER`,
      {
        uri: image,
        status: "ACTIVE"
      },
      auth.token
    ).then(res=>{
      if(res.success){
        dispatch(setBanners(
          resturant?.activeResturant?._id,
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
            Banners - { resturant?.activeResturant?.name }
          </h1>
          <div className="">
            <button
              onClick={() => setAddUserForm(true)}
              className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent hover:text-black transition-all duration-300 ease-in-out"
            >
              Add new Banner
            </button>
          </div>
        </div>
        <>  
          {
            resturant?.banners &&
              Array.isArray(resturant.banners) &&
                resturant.banners.map((banner, index)=>(
                  <div key={ index } className="w-2/3">
                    <CardWidgetWithTitle>
                      <div className="grid grid-cols-[80%_15%] gap-[4%] ">
                        <div className="card-img relative h-60 ">
                          <img layout="fill" src={banner.uri} alt="" />
                        </div>
                        <div className=" flex justify-evenly items-end flex-col ">
                          <LiveShopIcon2 />
                          <span 
                            className="cursor-pointer"
                            onClick={()=>handleDelete(banner._id)}
                          >
                            <DeleteIcon/>
                          </span>
                        </div>
                      </div>
                    </CardWidgetWithTitle>
                  </div>
                ))
          }

        </>

        { addUserForm && (
        <AddUserForm addUserForm={addUserForm} setAddUserForm={setAddUserForm}>
          <div className="flex items-center justify-between mb-4 ">
            <h4 className=" text-[#757575] text-[13px] ">Add Banner</h4>
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
              <label
                htmlFor="fileInputPicUpload"
                className=" text-[#757575] mb-2 mt-3 block cursor-pointer "
              >
                Banner Image
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

      </div>
    </Layout>
  );
};

export default RestaurantBanners;
