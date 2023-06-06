import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from "react-router-dom";
import FullScreenIcon from "../svg/FullScreenIcon";
import NotifacitionIcon from "../svg/NotifacitionIcon";
import RightMenu from "../svg/RightMenu";

const Navbar = ({ sidebar, setSidebar }) => {
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
            <h4 className=" mr-3 font-medium text-lg font-sans  ">Arian</h4>
            <div className="card-img h-14 w-14 ">
              <img height="100" width="100" src="/img/user.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;