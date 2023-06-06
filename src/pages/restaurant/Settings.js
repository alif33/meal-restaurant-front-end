import React, { useEffect, useState } from "react";
import CardWidgetWithTitle from "../../components/CardWidgetWithTitle";
import Layout from "../../base/Layout";
import { BsInfoSquare } from "react-icons/bs";
import { HiPencil } from "react-icons/hi";
import { FaUserTie } from "react-icons/fa";
// import Image from "next/image";
// import Manager from "../../../public/img/manager-svgrepo-com 1.png";
// import Status from "../../../public/img/status-info-svgrepo-com 1.png";

import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ManagerRepresentativesForm from "../../components/ManagerRepresentativesForm";
import StatusForm from "../../components/StatusForm";
import LocationForm from "../../components/LocationForm";
import PaymentsForm from "../../components/PaymentsForm";
import ContactForm from "../../components/ContactForm";
import OrderingForm from "../../components/OrderingForm";
import SeoForm from "../../components/SeoForm";
import RestaurantInfo from "../../components/RestaurantInfo";
import WebImgPre from "../../components/WebImgPre";
import MobileImgPre from "../../components/MobileImgPre";

const Settings = () => {
  const [addUserForm, setAddUserForm] = useState(false);
  const [restaurantInfoForm, setRestaurantInfoForm] = useState(false);
  const [statusForm, setStatusForm] = useState(false);
  const [locationForm, setLocationForm] = useState(false);
  const [paymentsForm, setPaymentsForm] = useState(false);
  const [seoForm, setSeoForm] = useState(false);
  const [contactForm, setContactForm] = useState(false);
  const [orderingForm, setOrderingForm] = useState(false);
  const [webImgPre, setWebImgPre] = useState(false);
  const [mobileImgPre, setMobileImgPre] = useState(false);

  const [managerRepresentativesForm, setManagerRepresentativesForm] =
    useState(false);
  const { admin, resturant } = useSelector((state) => state);
  const { activeResturant } = resturant;
  const [isReload, setIsReload] = useState(false);

  console.log(
    "resturant?.activeResturantresturant?.activeResturant",
    resturant?.activeResturant
  );
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!resturant?.activeResturant) {
    }
  }, []);

  const onSubmit = (data) => {
    console.log(data);
    // toast.success("res.message");
    // const image = data.image[0];

    console.log(data);
    // const formData = new FormData();
    // formData.append("image", image);
    // formData.append("name", data?.name);
    // formData.append("userName", data?.username);
    // formData.append("email", data?.email);
    // formData.append("password", data?.password);
    // formData.append("type", data?.type);
    // formData.append("team", data?.team);
    // formData.append("status", data?.status ? "ACTIVE" : "DISABLE");
    // formData.append("phone", data?.phone);
  };

  const [selectedFile, setSelectedFile] = useState();
  const [checkFile, setCheckFile] = useState(false);

  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    setCheckFile(true);
  };

  // const imagesubmission = () => {
  //   if (checkFile) {
  //     alert("File Uploaded");
  //     console.log(selectedFile);
  //   } else {
  //     alert("select a file");
  //   }
  // };

  return (
    <Layout status="restaurant" _resturant={true}>
      {!resturant.activeResturant ? (
        <h1>loading</h1>
      ) : (
        <>
          <div className="w-[97%] mx-auto mt-4">
            <h3 className="text-2xl font-mono font-medium ">
              Settings - {resturant?.activeResturant?.name}
            </h3>
            <div className="mt-3 grid grid-cols-[33%_33%_33%] gap-[1%] ">
              <div className="">
                <CardWidgetWithTitle>
                  <div className=" py-4 px-5 ">
                    <div className=" flex items-center justify-between ">
                      <div className="flex items-center">
                        <img height="24" width="24" src="/img/status-info-svgrepo-com 1.png" alt="" />
                        <h3 className=" text-xl ml-2 font-semibold ">
                          {" "}
                          Status{" "}
                        </h3>
                      </div>
                      <span
                        onClick={() => setStatusForm(!statusForm)}
                        className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                      >
                        <HiPencil />
                        Edit
                      </span>
                    </div>
                    <ul className="mt-3">
                      <li className=" grid grid-cols-2 items-center ">
                        <p className=" text-sm text-[#717171] ">Shop Status:</p>
                        <p className="text-md flex justify-start items-center  ">
                          {resturant?.activeResturant?.status}
                          <svg
                            className="ml-2"
                            width="20"
                            height="16"
                            viewBox="0 0 20 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.98959 0.929143C4.28249 1.22204 4.28249 1.69691 3.98959 1.9898C0.670136 5.30926 0.670136 10.6912 3.98959 14.0106C4.28249 14.3035 4.28249 14.7784 3.98959 15.0713C3.6967 15.3642 3.22183 15.3642 2.92893 15.0713C-0.976311 11.166 -0.976311 4.83439 2.92893 0.929143C3.22183 0.636249 3.6967 0.636249 3.98959 0.929143ZM17.0711 0.929143C20.9763 4.83439 20.9763 11.166 17.0711 15.0713C16.7782 15.3642 16.3033 15.3642 16.0104 15.0713C15.7175 14.7784 15.7175 14.3035 16.0104 14.0106C19.3299 10.6912 19.3299 5.30926 16.0104 1.9898C15.7175 1.69691 15.7175 1.22204 16.0104 0.929143C16.3033 0.636249 16.7782 0.636249 17.0711 0.929143ZM6.81802 3.75757C7.11091 4.05046 7.11091 4.52534 6.81802 4.81823C5.06066 6.57559 5.06066 9.42483 6.81802 11.1822C7.11091 11.4751 7.11091 11.95 6.81802 12.2429C6.52513 12.5357 6.05025 12.5357 5.75736 12.2429C3.41421 9.89971 3.41421 6.10072 5.75736 3.75757C6.05025 3.46468 6.52513 3.46468 6.81802 3.75757ZM14.2426 3.75757C16.5858 6.10072 16.5858 9.89971 14.2426 12.2429C13.9497 12.5357 13.4749 12.5357 13.182 12.2429C12.8891 11.95 12.8891 11.4751 13.182 11.1822C14.9393 9.42483 14.9393 6.57559 13.182 4.81823C12.8891 4.52534 12.8891 4.05046 13.182 3.75757C13.4749 3.46468 13.9497 3.46468 14.2426 3.75757ZM10 6.50021C10.8284 6.50021 11.5 7.17178 11.5 8.00021C11.5 8.82864 10.8284 9.50021 10 9.50021C9.17157 9.50021 8.5 8.82864 8.5 8.00021C8.5 7.17178 9.17157 6.50021 10 6.50021Z"
                              fill="#B4E48F"
                            />
                          </svg>
                        </p>
                      </li>
                    </ul>
                  </div>
                </CardWidgetWithTitle>
                <CardWidgetWithTitle>
                  <div className=" py-4 px-5 ">
                    <div className=" flex items-center justify-between ">
                      <div className="flex items-center">
                        <img height="24" width="24" src="/img/status-info-svgrepo-com 1.png" alt="" />
                        <h3 className=" text-xl ml-2 font-semibold ">
                          Restaurant Info
                        </h3>
                      </div>
                      <span
                        onClick={() =>
                          setRestaurantInfoForm(!restaurantInfoForm)
                        }
                        className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                      >
                        <HiPencil />
                        Edit
                      </span>
                    </div>
                    <ul className="mt-3">
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">Shop Name:</p>
                        <p className="text-md ">
                          {resturant?.activeResturant?.name}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">Shop Logo:</p>
                        <p className="text-mdcard-img w-[90px]  ">
                          <img
                            width="200"
                            height="100"
                            src={resturant?.activeResturant?.shopLogo}
                            alt="shop-logo"
                          />
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Web-Header Image:
                        </p>
                        <p
                          onClick={() => setWebImgPre(!webImgPre)}
                          className="text-md flex justify-start items-center  cursor-pointer "
                        >
                          Preview{" "}
                          <svg
                            className="ml-2"
                            width="24"
                            height="16"
                            viewBox="0 0 24 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M23.8172 7.42611C23.6346 7.16524 19.4085 0.956543 11.9998 0.956543C4.59113 0.956543 0.365043 7.16524 0.182435 7.42611C-0.052348 7.76524 -0.052348 8.2348 0.182435 8.60002C0.365043 8.8348 4.59113 15.0435 11.9998 15.0435C19.4085 15.0435 23.6346 8.8348 23.8172 8.57393C24.052 8.2348 24.052 7.76524 23.8172 7.42611ZM11.9998 12.9565C6.96504 12.9565 3.52157 9.40872 2.34765 8.00002C3.52157 6.56524 6.93896 3.0435 11.9998 3.0435C17.0346 3.0435 20.4781 6.59133 21.652 8.00002C20.452 9.4348 17.0346 12.9565 11.9998 12.9565ZM12.5998 3.72176C11.452 3.56524 10.3303 3.85219 9.39113 4.55654C7.48678 5.99133 7.09548 8.70437 8.53026 10.6087C9.23461 11.5478 10.2259 12.1218 11.3737 12.3044C11.5824 12.3305 11.7911 12.3565 11.9737 12.3565C12.9129 12.3565 13.7998 12.0435 14.5563 11.4957C16.4607 10.0609 16.852 7.34785 15.4172 5.4435C14.765 4.47828 13.7477 3.87828 12.5998 3.72176ZM13.6433 10.2174C13.0694 10.6609 12.339 10.8435 11.6085 10.7392C10.8781 10.6348 10.2259 10.2435 9.78243 9.66959C8.89548 8.4435 9.13026 6.69567 10.3563 5.78263C10.9303 5.33915 11.6607 5.15654 12.3911 5.26089C13.1216 5.36524 13.7737 5.75654 14.2172 6.33046C15.1042 7.55654 14.8694 9.30437 13.6433 10.2174ZM13.539 6.4348C13.7477 6.61741 13.852 6.90437 13.852 7.16524C13.852 7.42611 13.7477 7.71306 13.539 7.89567C13.3563 8.07828 13.0694 8.20872 12.8085 8.20872C12.5216 8.20872 12.2607 8.10437 12.0781 7.89567C11.8694 7.68698 11.765 7.42611 11.765 7.16524C11.765 6.87828 11.8694 6.61741 12.0781 6.4348C12.2607 6.22611 12.5477 6.12176 12.8085 6.12176C13.0955 6.14785 13.3563 6.25219 13.539 6.4348Z"
                              fill="#95959D"
                            />
                          </svg>
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Mobile-Header Image:
                        </p>
                        <p
                          onClick={() => setMobileImgPre(!mobileImgPre)}
                          className="text-md flex justify-start items-center  cursor-pointer "
                        >
                          Preview{" "}
                          <svg
                            className="ml-2"
                            width="24"
                            height="16"
                            viewBox="0 0 24 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M23.8172 7.42611C23.6346 7.16524 19.4085 0.956543 11.9998 0.956543C4.59113 0.956543 0.365043 7.16524 0.182435 7.42611C-0.052348 7.76524 -0.052348 8.2348 0.182435 8.60002C0.365043 8.8348 4.59113 15.0435 11.9998 15.0435C19.4085 15.0435 23.6346 8.8348 23.8172 8.57393C24.052 8.2348 24.052 7.76524 23.8172 7.42611ZM11.9998 12.9565C6.96504 12.9565 3.52157 9.40872 2.34765 8.00002C3.52157 6.56524 6.93896 3.0435 11.9998 3.0435C17.0346 3.0435 20.4781 6.59133 21.652 8.00002C20.452 9.4348 17.0346 12.9565 11.9998 12.9565ZM12.5998 3.72176C11.452 3.56524 10.3303 3.85219 9.39113 4.55654C7.48678 5.99133 7.09548 8.70437 8.53026 10.6087C9.23461 11.5478 10.2259 12.1218 11.3737 12.3044C11.5824 12.3305 11.7911 12.3565 11.9737 12.3565C12.9129 12.3565 13.7998 12.0435 14.5563 11.4957C16.4607 10.0609 16.852 7.34785 15.4172 5.4435C14.765 4.47828 13.7477 3.87828 12.5998 3.72176ZM13.6433 10.2174C13.0694 10.6609 12.339 10.8435 11.6085 10.7392C10.8781 10.6348 10.2259 10.2435 9.78243 9.66959C8.89548 8.4435 9.13026 6.69567 10.3563 5.78263C10.9303 5.33915 11.6607 5.15654 12.3911 5.26089C13.1216 5.36524 13.7737 5.75654 14.2172 6.33046C15.1042 7.55654 14.8694 9.30437 13.6433 10.2174ZM13.539 6.4348C13.7477 6.61741 13.852 6.90437 13.852 7.16524C13.852 7.42611 13.7477 7.71306 13.539 7.89567C13.3563 8.07828 13.0694 8.20872 12.8085 8.20872C12.5216 8.20872 12.2607 8.10437 12.0781 7.89567C11.8694 7.68698 11.765 7.42611 11.765 7.16524C11.765 6.87828 11.8694 6.61741 12.0781 6.4348C12.2607 6.22611 12.5477 6.12176 12.8085 6.12176C13.0955 6.14785 13.3563 6.25219 13.539 6.4348Z"
                              fill="#95959D"
                            />
                          </svg>
                        </p>
                      </li>
                    </ul>
                  </div>
                </CardWidgetWithTitle>
                <CardWidgetWithTitle>
                  <div className=" py-4 px-1 ">
                    <div className=" flex items-center justify-between ">
                      <div className="flex items-center">
                        <img height="24" width="24" src="/img/manager-svgrepo-com 1.png" alt="" />
                        <h3 className=" text-xl ml-2 font-semibold ">
                          Manager & Representatives
                        </h3>
                      </div>
                      <span
                        onClick={() =>
                          setManagerRepresentativesForm(
                            !managerRepresentativesForm
                          )
                        }
                        className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                      >
                        <HiPencil />
                        Edit
                      </span>
                    </div>
                    <ul className="mt-3">
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Account Manager:{" "}
                        </p>
                        <p className="text-md ">
                          {activeResturant?.accountManager}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">Sales Rep.</p>
                        <p className="text-md ">{activeResturant?.salesRep}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">Menu Rep.</p>
                        <p className="text-md ">{activeResturant?.menuRep}</p>
                      </li>
                    </ul>
                  </div>
                </CardWidgetWithTitle>
                <CardWidgetWithTitle>
                  <div className=" py-4 px-1 ">
                    <div className=" flex items-center justify-between ">
                      <div className="flex items-center">
                        <svg
                          className=" text-3xl "
                          width="20"
                          height="21"
                          viewBox="0 0 20 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_58_9287)">
                            <path
                              d="M0.0403461 20.4193L4.08499 8.39938C4.12585 8.21921 4.29744 8.08623 4.46903 8.08623H6.33202C5.80499 6.75211 5.53126 5.73114 5.53126 5.04907C5.53126 2.27787 7.57401 0 10.1274 0C12.64 0 14.7236 2.23497 14.7236 5.04907C14.7236 5.80407 14.3886 6.89796 13.9106 8.08623H15.5326C15.7042 8.08623 15.8717 8.21921 15.9166 8.39938L19.9613 20.4193C20.092 20.8612 19.7039 20.9985 19.5772 20.9985H0.424383C0.252792 21.0199 -0.0863037 20.8183 0.0403461 20.4193ZM10.1274 0.887984C8.04384 0.887984 6.38104 2.76262 6.38104 5.04478C6.38104 7.4685 9.61676 12.865 10.1274 13.7573C11.4062 11.4794 13.8739 6.82932 13.8739 5.04478C13.8739 2.76691 12.2151 0.887984 10.1274 0.887984ZM18.9807 20.1062L15.2343 8.9785H13.5307C12.3091 11.7282 10.1274 15.4561 10.1274 15.4561C10.1274 15.4561 6.80185 9.20586 6.7038 8.9785H4.76727L1.02087 20.1062H18.9807Z"
                              fill="black"
                            />
                            <path
                              d="M7.18989 16.2627H12.7666V17.155H7.18989V16.2627Z"
                              fill="black"
                            />
                            <path
                              d="M8.17056 4.64172C8.17056 3.52637 9.06529 2.58691 10.1275 2.58691C11.1897 2.58691 12.0845 3.52637 12.0845 4.64172C12.0845 5.75706 11.2347 6.69652 10.1275 6.69652C9.02035 6.69652 8.17056 5.76135 8.17056 4.64172ZM11.2347 4.59882C11.2347 3.97251 10.7649 3.43629 10.1275 3.43629C9.49018 3.43629 9.02035 3.97251 9.02035 4.59882C9.02035 5.22513 9.49018 5.76135 10.1275 5.76135C10.724 5.76135 11.2347 5.22513 11.2347 4.59882Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_58_9287">
                              <rect
                                width="20"
                                height="21"
                                fill="white"
                                transform="matrix(-1 0 0 1 20 0)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        {/* <FaUserTie className=" text-3xl " />{" "} */}
                        <h3 className=" text-xl ml-2 font-semibold ">
                          Location
                        </h3>
                      </div>
                      <span
                        onClick={() => setLocationForm(!locationForm)}
                        className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                      >
                        <HiPencil />
                        Edit
                      </span>
                    </div>
                    <ul className="mt-3">
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">Address:</p>
                        <p className="text-md ">{activeResturant?._address}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">City:</p>
                        <p className="text-md ">{activeResturant?.city}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">State:</p>
                        <p className="text-md ">{activeResturant?.state}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">Zip Code:</p>
                        <p className="text-md ">{activeResturant?.zipCode}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">Country:</p>
                        <p className="text-md ">{activeResturant?.country}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">Longitude:</p>
                        <p className="text-md ">{activeResturant?.lat}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">Latitude:</p>
                        <p className="text-md ">{activeResturant?.long}</p>
                      </li>
                    </ul>
                  </div>
                </CardWidgetWithTitle>
              </div>
              <div className="">
                <CardWidgetWithTitle>
                  <div className=" py-4 px-5 ">
                    <div className=" flex items-center justify-between ">
                      <div className="flex items-center">
                        <svg
                          className=" text-3xl"
                          width="23"
                          height="26"
                          viewBox="0 0 23 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M4.36985 13.6835V15.6402H3.42595C3.10844 15.6402 2.85095 15.9313 2.85095 16.2902C2.85095 16.6492 3.10844 16.9402 3.42595 16.9402H4.36985V17.4224C4.36985 17.7813 4.62734 18.0724 4.94485 18.0724C5.26236 18.0724 5.51985 17.7813 5.51985 17.4224V16.8912C6.63472 16.696 7.37261 15.9296 7.37261 14.894V14.4789C7.37261 13.4433 6.63472 12.6768 5.51985 12.4816V10.5249H6.46375C6.78125 10.5249 7.03875 10.2339 7.03875 9.87489C7.03875 9.51592 6.78125 9.22489 6.46375 9.22489H5.51985V8.74277C5.51985 8.3838 5.26236 8.09277 4.94485 8.09277C4.62734 8.09277 4.36985 8.3838 4.36985 8.74277V9.27714C3.2685 9.48164 2.51709 10.2732 2.51709 11.3089V11.6863C2.51709 12.7218 3.25498 13.4884 4.36985 13.6835ZM5.51985 13.8062C5.91741 13.9146 6.22261 14.1412 6.22261 14.4788V14.8939C6.22261 15.2314 5.91741 15.4581 5.51985 15.5665V13.8062ZM3.66709 11.3089C3.66709 10.96 3.97611 10.7213 4.36985 10.6054V12.3588C3.97229 12.2504 3.66709 12.0238 3.66709 11.6863V11.3089Z"
                            fill="black"
                          />
                          <path
                            d="M22.425 5.8501H0.575C0.257492 5.8501 0 6.14113 0 6.5001V19.5001C0 19.8591 0.257492 20.1501 0.575 20.1501H22.425C22.7425 20.1501 23 19.8591 23 19.5001V6.5001C23 6.14113 22.7425 5.8501 22.425 5.8501ZM21.85 18.8501H1.15V7.1501H21.85V18.8501Z"
                            fill="black"
                          />
                          <path
                            d="M9.80352 10.9528H15.726C16.0435 10.9528 16.301 10.6618 16.301 10.3028C16.301 9.94386 16.0435 9.65283 15.726 9.65283H9.80352C9.48601 9.65283 9.22852 9.94386 9.22852 10.3028C9.22852 10.6618 9.48601 10.9528 9.80352 10.9528Z"
                            fill="black"
                          />
                          <path
                            d="M9.80352 13.5524H19.6935C20.011 13.5524 20.2685 13.2614 20.2685 12.9024C20.2685 12.5435 20.011 12.2524 19.6935 12.2524H9.80352C9.48601 12.2524 9.22852 12.5435 9.22852 12.9024C9.22852 13.2614 9.48601 13.5524 9.80352 13.5524Z"
                            fill="black"
                          />
                          <path
                            d="M19.6937 14.8525H16.3587C16.0412 14.8525 15.7837 15.1436 15.7837 15.5025C15.7837 15.8615 16.0412 16.1525 16.3587 16.1525H19.6937C20.0112 16.1525 20.2687 15.8615 20.2687 15.5025C20.2687 15.1436 20.0112 14.8525 19.6937 14.8525Z"
                            fill="black"
                          />
                        </svg>

                        <h3 className=" text-2xl ml-2 font-semibold ">
                          Payments
                        </h3>
                      </div>
                      <span
                        onClick={() => setPaymentsForm(!paymentsForm)}
                        className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                      >
                        <HiPencil />
                        Edit
                      </span>
                    </div>
                    <ul className="mt-3">
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Payment Type:{" "}
                        </p>
                        <p className="text-md ">
                          {activeResturant?.paymentType}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Email Statement to:{" "}
                        </p>
                        <p className="text-md ">
                          {activeResturant?.emailStatement_}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Payment Frequency:{" "}
                        </p>
                        <p className="text-md ">
                          {activeResturant?.paymentFrequency}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Flat Fee (MealNow)
                        </p>
                        <p className="text-md ">{activeResturant?.flatFee}%</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2 border-t-2 pt-4">
                        <p className=" text-sm text-[#717171] ">
                          Free Trial End Date:
                        </p>
                        <p className="text-md ">
                          {activeResturant?.trialEndDate}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Processing Fee:
                        </p>
                        <p className="text-md ">
                          {activeResturant?.processingFee} %
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Contact Method:
                        </p>
                        <p className="text-md ">
                          {activeResturant?.contactMethod}
                        </p>
                      </li>
                    </ul>
                  </div>
                </CardWidgetWithTitle>
                <CardWidgetWithTitle>
                  <div className=" py-4 px-5 ">
                    <div className=" flex items-center justify-between ">
                      <div className="flex items-center">
                        {/* <BsInfoSquare className=" text-3xl " />{" "} */}
                        <svg
                          className=" text-3xl "
                          width="26"
                          height="26"
                          viewBox="0 0 26 26"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M22.2168 12.1826C22.2676 11.8119 22.3234 11.4971 22.3234 11.1264C22.3234 7.54121 19.4188 4.6416 15.8234 4.6416C13.9191 4.6416 12.1773 5.43379 10.9637 6.80488C10.2781 6.43418 9.48594 6.22598 8.69375 6.22598C6.21055 6.22598 4.14883 8.01855 3.77813 10.4459C1.82812 11.3904 0.558594 13.3963 0.558594 15.6104C0.558594 18.774 3.14844 21.3588 6.31719 21.3588H20.6324C23.273 21.3588 25.3855 19.2514 25.4414 16.6666C25.4414 14.61 24.1211 12.8174 22.2168 12.1826ZM20.6324 20.3025H6.31719C3.72734 20.3025 1.61484 18.1951 1.61484 15.6104C1.61484 13.7111 2.72187 12.0252 4.46875 11.2889C4.62617 11.2381 4.78359 11.0756 4.78359 10.8674C4.94102 8.81074 6.58125 7.28223 8.63789 7.28223C9.43008 7.28223 10.1156 7.49551 10.857 7.81035C11.0703 7.96777 11.3852 7.91699 11.5426 7.70371C12.548 6.3834 14.1324 5.59629 15.8234 5.59629C18.8348 5.59629 21.2672 8.02363 21.2672 11.0248C21.2672 11.4463 21.2164 11.9186 21.1098 12.3451C20.9676 12.8123 21.323 12.9799 21.4805 13.0307C23.1715 13.4014 24.3344 14.874 24.3344 16.6158C24.3344 18.6674 22.6941 20.3025 20.6324 20.3025Z"
                            fill="black"
                          />
                          <path
                            d="M8.18096 11.7969C8.76494 11.7969 9.24229 12.2691 9.24229 12.8531C9.24229 13.0512 9.39971 13.2086 9.59775 13.2086C9.7958 13.2086 9.95322 13.0512 9.95322 12.8531C9.95322 11.8781 9.15596 11.0859 8.18096 11.0859C7.20088 11.0859 6.40869 11.8781 6.40869 12.8531C6.40869 13.8281 7.20596 14.6203 8.18096 14.6203C8.76494 14.6203 9.24229 15.0926 9.24229 15.6766C9.24229 16.2605 8.76494 16.7328 8.18096 16.7328C7.59697 16.7328 7.11963 16.2605 7.11963 15.6766C7.11963 15.4785 6.96221 15.3211 6.76416 15.3211C6.56611 15.3211 6.40869 15.4785 6.40869 15.6766C6.40869 16.6516 7.20596 17.4437 8.18096 17.4437C9.16104 17.4437 9.95322 16.6516 9.95322 15.6766C9.95322 14.7016 9.15596 13.9145 8.18096 13.9145C7.59697 13.9145 7.11963 13.4422 7.11963 12.8582C7.11963 12.2742 7.59697 11.7969 8.18096 11.7969Z"
                            fill="black"
                          />
                          <path
                            d="M14.0158 11.7969C14.2139 11.7969 14.3713 11.6395 14.3713 11.4414C14.3713 11.2434 14.2139 11.0859 14.0158 11.0859H11.1416C10.9436 11.0859 10.7861 11.2434 10.7861 11.4414V17.0984C10.7861 17.2965 10.9436 17.4539 11.1416 17.4539H14.0158C14.2139 17.4539 14.3713 17.2965 14.3713 17.0984C14.3713 16.9004 14.2139 16.743 14.0158 16.743H11.4971V14.6254H14.0158C14.2139 14.6254 14.3713 14.468 14.3713 14.2699C14.3713 14.0719 14.2139 13.9145 14.0158 13.9145H11.4971V11.7969H14.0158Z"
                            fill="black"
                          />
                          <path
                            d="M17.1996 11.0859C16.5395 11.0859 15.925 11.4312 15.468 12.0609C15.0414 12.6551 14.8027 13.4371 14.8027 14.2699C14.8027 15.1027 15.0363 15.8848 15.468 16.4789C15.9199 17.1086 16.5344 17.4539 17.1996 17.4539C17.8648 17.4539 18.4742 17.1086 18.9312 16.4789C19.3578 15.8848 19.5965 15.1027 19.5965 14.2699C19.5965 13.4371 19.3629 12.6551 18.9312 12.0609C18.4742 11.4312 17.8598 11.0859 17.1996 11.0859ZM17.1996 16.7379C16.2703 16.7379 15.5188 15.6309 15.5188 14.2648C15.5188 12.9039 16.2754 11.7918 17.1996 11.7918C18.1289 11.7918 18.8805 12.8988 18.8805 14.2648C18.8805 15.6309 18.1289 16.7379 17.1996 16.7379Z"
                            fill="black"
                          />
                        </svg>

                        <h3 className=" text-2xl ml-2 font-semibold ">SEO </h3>
                      </div>
                      <span
                        onClick={() => setSeoForm(!seoForm)}
                        className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                      >
                        <HiPencil />
                        Edit
                      </span>
                    </div>
                    <ul className="mt-3">
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">GMB Domain:</p>
                        <p className="text-md ">{activeResturant?.gbmDomain}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">Own Website:</p>
                        <p className="text-md text-[#3B7698] flex">
                          {activeResturant?.gbmWebsite}{" "}
                          <svg
                            width="15"
                            height="16"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g clipPath="url(#clip0_62_9644)">
                              <path
                                d="M14.0444 1.01903C13.4295 0.363146 12.6092 0.00195312 11.7344 0.00195312C10.8598 0.00195312 10.0393 0.363146 9.42437 1.01903L7.14429 3.45111C6.321 4.32929 6.03316 5.56303 6.27424 6.693C6.03768 6.63615 5.79409 6.60371 5.54522 6.60371C4.67064 6.60371 3.85012 6.9649 3.23547 7.62078L0.955144 10.0531C-0.318381 11.4116 -0.318381 13.6227 0.955144 14.9811C1.57004 15.637 2.39031 15.9982 3.26514 15.9982C4.13996 15.9982 4.96024 15.637 5.57513 14.9811L7.85521 12.549C8.6785 11.6709 8.96634 10.4371 8.72526 9.30715C8.96181 9.364 9.20541 9.39645 9.45428 9.39645C10.3291 9.39645 11.1496 9.03525 11.7643 8.37937L14.0446 5.94729C15.3184 4.58859 15.3184 2.37773 14.0444 1.01903ZM7.14429 11.7905L4.86421 14.2225C4.43937 14.6757 3.87123 14.9253 3.26514 14.9253C2.65904 14.9253 2.09116 14.6757 1.66607 14.2225C0.784452 13.2819 0.784452 11.7518 1.66607 10.8112L3.9464 8.3791C4.37124 7.92593 4.93912 7.67629 5.54522 7.67629C5.97861 7.67629 6.39138 7.8058 6.74735 8.04419L4.7986 10.1229C4.60226 10.3323 4.60226 10.6717 4.7986 10.8812C4.89664 10.986 5.02535 11.0383 5.15406 11.0383C5.28277 11.0383 5.41148 10.986 5.50952 10.8812L7.45852 8.80223C8.00705 9.73377 7.90348 10.9804 7.14429 11.7905ZM13.3334 5.1887L11.0531 7.62078C10.6283 8.07395 10.0604 8.3236 9.45403 8.3236C9.02064 8.3236 8.60811 8.19408 8.25215 7.9557L10.2009 5.87703C10.3972 5.66761 10.3972 5.32814 10.2009 5.11871C10.0048 4.90929 9.68606 4.90929 9.48998 5.11871L7.54098 7.19765C6.99245 6.26611 7.09602 5.01977 7.85521 4.2097L10.1353 1.77762C10.5601 1.32445 11.1283 1.07481 11.7344 1.07481C12.3407 1.07481 12.9083 1.32445 13.3334 1.77762C13.7585 2.23078 13.9923 2.83652 13.9923 3.48329C13.9923 4.12979 13.7583 4.73553 13.3334 5.1887Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_62_9644">
                                <rect width="15" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">GMB Status:</p>
                        <p className="text-md flex  ">
                          {activeResturant?.gbmStatus}{" "}
                          <svg
                            width="18"
                            height="19"
                            viewBox="0 0 18 19"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.6955 1.65267C8.86168 1.57473 9.048 1.5636 9.21994 1.61927L9.30455 1.65267L16.0546 4.81837C16.326 4.94569 16.4981 5.22836 16.5 5.53627L16.4954 5.62926L16.0661 9.70765C15.8467 11.7923 14.769 13.6647 13.1269 14.8314L12.9349 14.9628L9.39752 17.2965C9.18134 17.4391 8.9135 17.455 8.68584 17.344L8.60253 17.2965L5.06514 14.9628C3.38008 13.8511 2.24806 12.0148 1.96303 9.94722L1.93392 9.70765L1.50461 5.62926C1.47181 5.31761 1.61622 5.01819 1.86711 4.8611L1.9455 4.81837L8.6955 1.65267ZM9.00002 3.24243L3.05604 6.03012L3.42474 9.5328C3.59427 11.1434 4.42248 12.591 5.68527 13.4996L5.86014 13.6201L9.00002 15.6916L12.1399 13.6201C13.4417 12.7613 14.3192 11.3463 14.5481 9.75138L14.5753 9.5328L14.944 6.03012L9.00002 3.24243ZM10.6603 6.6361C10.9162 6.2923 11.3877 6.23258 11.7134 6.5027C12.014 6.75205 12.0853 7.19529 11.8933 7.53241L11.8397 7.61431L8.83975 11.5726C8.58179 11.9192 8.11127 11.9724 7.79081 11.7096L7.71968 11.6433L6.21969 10.06C5.9268 9.75081 5.9268 9.24956 6.21969 8.94039C6.49006 8.65501 6.91548 8.63306 7.2097 8.87454L7.28035 8.94039L8.18257 9.89272L10.6603 6.6361Z"
                              fill="#6FB327"
                            />
                          </svg>
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">GMB Role:</p>
                        <p className="text-md ">{activeResturant?.gbmRole}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">
                          MealNow Domain:
                        </p>
                        <p className="text-md text-[#3B7698] ">
                          {activeResturant?.mealDomain}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">GMB Email:</p>
                        <p className="text-md  ">{activeResturant?.gbmEmail}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">Password: </p>
                        <p className="text-md  ">{activeResturant?.password}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2">
                        <p className=" text-sm text-[#717171] ">GMB Owner: </p>
                        <p className="text-md  ">{activeResturant?.gbmOwner}</p>
                      </li>
                    </ul>
                  </div>
                </CardWidgetWithTitle>
              </div>
              <div className="">
                <CardWidgetWithTitle>
                  <div className=" py-4 px-5 ">
                    <div className=" flex items-center justify-between ">
                      <div className="flex items-center">
                        {/* <BsInfoSquare className=" text-3xl " />{" "} */}
                        <svg
                          className=" text-3xl "
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_58_9293)">
                            <path
                              d="M2.8 17.5V18.2H4.2V17.5H2.8ZM9.8 17.5V18.2H11.2V17.5H9.8ZM4.2 17.5V16.7999H2.8V17.5H4.2ZM9.8 16.7996V17.5H11.2V16.7996H9.8ZM7 14C8.54652 14 9.8 15.2533 9.8 16.7996H11.2C11.2 14.4798 9.31948 12.6 7 12.6V14ZM4.2 16.7999C4.2 15.2534 5.45356 14 7 14V12.6C4.68045 12.6 2.8 14.4802 2.8 16.7999H4.2ZM7 5.6C5.4536 5.6 4.2 6.8536 4.2 8.4H5.6C5.6 7.62681 6.22681 7 7 7V5.6ZM9.8 8.4C9.8 6.8536 8.5464 5.6 7 5.6V7C7.77319 7 8.4 7.62681 8.4 8.4H9.8ZM7 11.2C8.5464 11.2 9.8 9.9464 9.8 8.4H8.4C8.4 9.17319 7.77319 9.8 7 9.8V11.2ZM7 9.8C6.22681 9.8 5.6 9.17319 5.6 8.4H4.2C4.2 9.9464 5.4536 11.2 7 11.2V9.8ZM2.1 4.2H18.9V2.8H2.1V4.2ZM19.6 4.9V16.1H21V4.9H19.6ZM18.9 16.8H2.1V18.2H18.9V16.8ZM1.4 16.1V4.9H0V16.1H1.4ZM2.1 16.8C1.7134 16.8 1.4 16.4865 1.4 16.1H0C0 17.2598 0.940204 18.2 2.1 18.2V16.8ZM19.6 16.1C19.6 16.4865 19.2865 16.8 18.9 16.8V18.2C20.0598 18.2 21 17.2598 21 16.1H19.6ZM18.9 4.2C19.2865 4.2 19.6 4.5134 19.6 4.9H21C21 3.7402 20.0598 2.8 18.9 2.8V4.2ZM2.1 2.8C0.940202 2.8 0 3.7402 0 4.9H1.4C1.4 4.5134 1.7134 4.2 2.1 4.2V2.8ZM12.6 8.4H16.8V7H12.6V8.4ZM12.6 12.6H16.8V11.2H12.6V12.6ZM0 21H21V19.6H0V21ZM4.2 0V3.5H5.6V0H4.2ZM15.4 0V3.5H16.8V0H15.4Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_58_9293">
                              <rect width="21" height="21" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>

                        <h3 className=" text-2xl ml-2 font-semibold ">
                          Contact
                        </h3>
                      </div>
                      <span
                        onClick={() => setContactForm(!contactForm)}
                        className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                      >
                        <HiPencil />
                        Edit
                      </span>
                    </div>
                    <ul className="mt-3">
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">Owners Name:</p>
                        <p className="text-md ">{activeResturant?.ownerName}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Owners Phone:
                        </p>
                        <p className="text-md ">
                          {activeResturant?.ownerPhone}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Owners Email:
                        </p>
                        <p className="text-md ">
                          {activeResturant?.ownerEmail}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center mb-2 border-t-2 pt-4">
                        <p className=" text-sm text-[#717171] ">
                          Secondary Contact Name:{" "}
                        </p>
                        <p className="text-md ">{activeResturant?.secCName}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Secondary Contact Phone:{" "}
                        </p>
                        <p className="text-md ">{activeResturant?.secCPhone}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Secondary Contact Email:{" "}
                        </p>
                        <p className="text-md ">{activeResturant?.secCEmail}</p>
                      </li>
                      <li className=" grid grid-cols-2 items-center border-t-2 pt-4 mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Restaurant Phone:
                        </p>
                        <p className="text-md ">
                          {activeResturant?.resturantPhone}
                        </p>
                      </li>
                    </ul>
                  </div>
                </CardWidgetWithTitle>
                <CardWidgetWithTitle>
                  <div className=" py-4 px-5 ">
                    <div className=" flex items-center justify-between ">
                      <div className="flex items-center">
                        {/* <BsInfoSquare className=" text-3xl " />{" "} */}
                        <svg
                          className=" text-3xl "
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_64_9765)">
                            <path
                              d="M2.8 17.5V18.2H4.2V17.5H2.8ZM9.8 17.5V18.2H11.2V17.5H9.8ZM4.2 17.5V16.7999H2.8V17.5H4.2ZM9.8 16.7996V17.5H11.2V16.7996H9.8ZM7 14C8.54652 14 9.8 15.2533 9.8 16.7996H11.2C11.2 14.4798 9.31948 12.6 7 12.6V14ZM4.2 16.7999C4.2 15.2534 5.45356 14 7 14V12.6C4.68045 12.6 2.8 14.4802 2.8 16.7999H4.2ZM7 5.6C5.4536 5.6 4.2 6.8536 4.2 8.4H5.6C5.6 7.62681 6.22681 7 7 7V5.6ZM9.8 8.4C9.8 6.8536 8.5464 5.6 7 5.6V7C7.77319 7 8.4 7.62681 8.4 8.4H9.8ZM7 11.2C8.5464 11.2 9.8 9.9464 9.8 8.4H8.4C8.4 9.17319 7.77319 9.8 7 9.8V11.2ZM7 9.8C6.22681 9.8 5.6 9.17319 5.6 8.4H4.2C4.2 9.9464 5.4536 11.2 7 11.2V9.8ZM2.1 4.2H18.9V2.8H2.1V4.2ZM19.6 4.9V16.1H21V4.9H19.6ZM18.9 16.8H2.1V18.2H18.9V16.8ZM1.4 16.1V4.9H0V16.1H1.4ZM2.1 16.8C1.7134 16.8 1.4 16.4865 1.4 16.1H0C0 17.2598 0.940204 18.2 2.1 18.2V16.8ZM19.6 16.1C19.6 16.4865 19.2865 16.8 18.9 16.8V18.2C20.0598 18.2 21 17.2598 21 16.1H19.6ZM18.9 4.2C19.2865 4.2 19.6 4.5134 19.6 4.9H21C21 3.7402 20.0598 2.8 18.9 2.8V4.2ZM2.1 2.8C0.940202 2.8 0 3.7402 0 4.9H1.4C1.4 4.5134 1.7134 4.2 2.1 4.2V2.8ZM12.6 8.4H16.8V7H12.6V8.4ZM12.6 12.6H16.8V11.2H12.6V12.6ZM0 21H21V19.6H0V21ZM4.2 0V3.5H5.6V0H4.2ZM15.4 0V3.5H16.8V0H15.4Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_64_9765">
                              <rect width="21" height="21" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <h3 className=" text-2xl ml-2 font-semibold ">
                          Ordering
                        </h3>
                      </div>
                      <span
                        onClick={() => setOrderingForm(!orderingForm)}
                        className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                      >
                        <HiPencil />
                        Edit
                      </span>
                    </div>
                    <ul className="mt-3">
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Min. pickup order:
                        </p>
                        <p className="text-md ">
                          {activeResturant?.minPickupOrder} $
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Min. delivery order:{" "}
                        </p>
                        <p className="text-md ">
                          {activeResturant?.minDeliveryOrder} $
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Pick up estimate:
                        </p>
                        <p className="text-md ">
                          {activeResturant?.pickupEstimate}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center border-t-2 pt-4 mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Delivery estimate:
                        </p>
                        <p className="text-md ">
                          {activeResturant?.deliveryEstimate}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Online discount:
                        </p>
                        <p className="text-md ">
                          {activeResturant?.onlineDiscount} %
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">Delivery: </p>
                        <p
                          className={`text-md  ${
                            activeResturant?.delivery === "ON"
                              ? "text-[#6FB327]"
                              : "text-[#B32727]"
                          }`}
                        >
                          {activeResturant?.delivery}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Scheduled orders:{" "}
                        </p>
                        <p
                          className={`text-md  ${
                            activeResturant?.scheduledOrders === "ON"
                              ? "text-[#6FB327]"
                              : "text-[#B32727]"
                          }`}
                        >
                          {activeResturant?.scheduledOrders}
                        </p>
                      </li>
                      <li className=" grid grid-cols-2 items-center  mb-2">
                        <p className=" text-sm text-[#717171] ">
                          Orders today:{" "}
                        </p>
                        <p className="">
                          <span
                            className={`text-md  ${
                              activeResturant?.ordersToday === "ON"
                                ? "text-[#6FB327]"
                                : "text-[#B32727]"
                            }`}
                          >
                            {activeResturant?.ordersToday}
                          </span>{" "}
                          <span className="text-[11px]">
                            (will be auto enabled next day)
                          </span>
                        </p>
                      </li>
                    </ul>
                  </div>
                </CardWidgetWithTitle>
              </div>
            </div>
          </div>
          <div className="">
            {restaurantInfoForm && (
              <RestaurantInfo
                restaurantInfoForm={restaurantInfoForm}
                setRestaurantInfoForm={setRestaurantInfoForm}
              ></RestaurantInfo>
            )}
          </div>
          <div className="">
            {managerRepresentativesForm && (
              <ManagerRepresentativesForm
                managerRepresentativesForm={managerRepresentativesForm}
                setManagerRepresentativesForm={setManagerRepresentativesForm}
              ></ManagerRepresentativesForm>
            )}
          </div>
          <div>
            {statusForm && (
              <StatusForm
                statusForm={statusForm}
                setStatusForm={setStatusForm}
              ></StatusForm>
            )}
          </div>
          <div>
            {locationForm && (
              <LocationForm
                locationForm={locationForm}
                setLocationForm={setLocationForm}
              ></LocationForm>
            )}
          </div>
          <div>
            {seoForm && (
              <SeoForm seoForm={seoForm} setSeoForm={setSeoForm}></SeoForm>
            )}
          </div>
          <div>
            {contactForm && (
              <ContactForm
                contactForm={contactForm}
                setContactForm={setContactForm}
              ></ContactForm>
            )}
          </div>
          <div>
            {paymentsForm && (
              <PaymentsForm
                paymentsForm={paymentsForm}
                setPaymentsForm={setPaymentsForm}
              ></PaymentsForm>
            )}
          </div>
          <div>
            {orderingForm && (
              <OrderingForm
                orderingForm={orderingForm}
                setOrderingForm={setOrderingForm}
              ></OrderingForm>
            )}
          </div>
          {webImgPre && (
            <WebImgPre webImgPre={webImgPre} setWebImgPre={setWebImgPre} />
          )}
          {mobileImgPre && (
            <MobileImgPre
              mobileImgPre={mobileImgPre}
              setMobileImgPre={setMobileImgPre}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default Settings;
