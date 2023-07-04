import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, status, ___restaurant__ }) => {
  const [sidebar, setSidebar] = useState(false);
  const { restaurant } = useSelector((state) => state);

  if(___restaurant__ && !restaurant?.activeRestaurant){
    return(
      <div className="h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar sidebar={sidebar} setSidebar={setSidebar} />
        <div className={` flex flex-1 transition-all duration-500 ease-in-out`}>
        <Sidebar sidebar={sidebar} status={status} />
        <main
            className={`h-[87vh] overflow-y-scroll overflow-x-hidden transition-all duration-500 ease-in-out
        ${sidebar ? `w-[100%]` : `w-[92%]`}
        `}
        >
            <div className="flex h-1/2 justify-center items-center">
              <div className="text-center"> 
                  <Link className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" to="/restaurants">Restaurants</Link>
              </div>
            </div>
        </main>
        </div>
    </div>
    )
  }


  return(
    <div className="h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        <Navbar sidebar={sidebar} setSidebar={setSidebar} />
        <div className={` flex flex-1 transition-all duration-500 ease-in-out`}>
        <Sidebar sidebar={sidebar} status={status} />
        <main
            className={`h-[87vh] overflow-y-scroll overflow-x-hidden transition-all duration-500 ease-in-out
        ${sidebar ? `w-[100%]` : `w-[92%]`}
        `}
        >
            {children}
        </main>
        </div>
    </div>
  )


};

export default Layout;