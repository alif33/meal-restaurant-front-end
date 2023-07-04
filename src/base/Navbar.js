import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import FullScreenIcon from "../svg/FullScreenIcon";
import NotifacitionIcon from "../svg/NotifacitionIcon";
import RightMenu from "../svg/RightMenu";
import { useDispatch, useSelector } from "react-redux";
import { imageResize } from "../__lib__/helpers/Formatter";
import { LogedOut } from "../store/auth/actions";

const Navbar = ({ sidebar, setSidebar }) => {

  const { auth } = useSelector(state=>state);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('hidden');
  }

  const logOut =()=>{
    dispatch(LogedOut());
    navigate('/');
  }

  return (
    <div className="bg-white h-[13vh] shadow-[0_0_21px_1px_#1111114a] ">
      <div className="container mx-auto h-full flex items-center justify-between  ">
        <div className="flex items-center h-full">
          <button
            onClick={() => setSidebar(!sidebar)}
            className=" bg-transparent border-none text-4xl text-[#777777]"
          >
            <AiOutlineMenuUnfold />
          </button>
          <div className="brand-icon">
            <Link 
              href="/"
            >
              <img width="226" height="53" src="/img/logo.png" alt="" />
            </Link>
          </div>
        </div>
        <div className=" flex items-center  ">
          <button className="bg-transparent border-none mx-4 ">
            {" "}
            <RightMenu />
          </button>
          <button className="bg-transparent border-none mx-4 relative">
            <span className=" absolute top-0 right-0 rounded-full bg-[#00c220] flex items-center justify-center w-4 h-4 text-white text-xs ">
              3
            </span>
            <NotifacitionIcon />
            <div className=""></div>
          </button>
          <button className="bg-transparent border-none mx-4">
            {" "}
            <FullScreenIcon />
          </button>

          <div className="flex items-center ms-4">
            <h4 className=" mr-3 font-medium text-lg font-sans  ">{auth?.user?.userName}</h4>
            <div className="card-img h-14 w-14 ">
            <div className="relative inline-block">
              <img 
                width="100" 
                height="100" 
                className="cursor-pointer"
                src={`${auth?.user?.image? imageResize(auth?.user?.image, 200, 200)  :"/img/user.png"}`}
                alt={`${auth?.user?.userName? auth?.user?.userName: "username"}`}
                onClick={toggleDropdown}
              />
              <div id="dropdown" className="absolute right-0 mt-2 py-2 w-48 bg-white rounded shadow-lg hidden">
                {/* <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
                <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</a> */}
                <button onClick={logOut} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">Logout</button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 