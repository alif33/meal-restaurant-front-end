import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { authPost, postData } from "../../__lib__/helpers/HttpService";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { userFields } from "../../__lib__/config";


const EditUserForm = ({
    hasUpdate,
    setHasUpdate,
    fetchUsers
})=>{
    const [loading, setLoading] = useState();
    const [image, setImage] = useState();
    const [progress, setProgress] = useState(0);
    const [roles, setRoles] = useState([]);

    const { auth } = useSelector(state=>state);

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
        //   image
        }, auth?.token)
        .then((res) => {
          setLoading(false);
          fetchUsers();
          toast.success(`${res.message}`);
          reset();
          setHasUpdate(!hasUpdate);
        })
        .catch(err=>{
          setLoading(false);
          console.log(err)
        })
      };
    
    return(
        <>
         <div className="flex items-center justify-between mb-4 ">
                <h4 className=" text-[#757575] text-[13px] ">Edit user</h4>
                <button
                  onClick={() => setHasUpdate(!hasUpdate)}
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
                    onClick={()=>setHasUpdate(!hasUpdate)}
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
            </>
    )
}
export default EditUserForm