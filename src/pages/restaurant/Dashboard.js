import React from "react";
import Layout from "../../base/Layout";
import CardWidgetWithTitle from "../../components/CardWidgetWithTitle";
// import { BsInfoCircle } from "react-icons/bs";
// import Image from "next/image";
// import Orders from "../../../public/img/Orders.png";
// import Payments from "../../../public/img/Payments.png";
// import Marketing from "../../../public/img/Marketing.png";
// import Menu from "../../../public/img/Menu.png";
// import PartnerInfo from "../../../public/img/Partner Info.png";
// import Delivery from "../../../public/img/Delivery.png";
// import Verified from "../../../public/img/verified-svgrepo-com 1Verified .png";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { admin, resturant } = useSelector((state) => state);
  const { activeResturant } = resturant;
  console.log("ReatauarantDashboardPage", resturant?.activeResturant?.name);


  return (
    <Layout status="restaurant">
      <div className="w-[97%] mx-auto mt-4">
        <h3 className="text-2xl font-mono font-medium ">
          Dashboard - {resturant?.activeResturant?.name}
        </h3>
        <div className="mt-3 grid grid-cols-[38%_29%_29%] gap-[1.5%] ">
          <div className="">
            <CardWidgetWithTitle>
              <div className="grid grid-cols-[79%_19%] gap-[2%] py-4 px-5 ">
                <div className="">
                  <h2 className="text-lg"># {activeResturant?.name}</h2>
                  <h2 className="text-lg">{activeResturant?.city} {activeResturant?.country}</h2>
                  <h2 className="text-lg">Account Manager: {activeResturant?.accountManager}</h2>
                </div>
                <div className="">
                  <svg
                    width="41"
                    height="32"
                    viewBox="0 0 41 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.22867 0.708163C8.82666 1.32751 8.82666 2.33167 8.22867 2.95102C1.45145 9.97028 1.45145 21.3508 8.22867 28.37C8.82666 28.9894 8.82666 29.9935 8.22867 30.6129C7.63068 31.2322 6.66115 31.2322 6.06315 30.6129C-1.91005 22.3549 -1.91005 8.96612 6.06315 0.708163C6.66115 0.0888156 7.63068 0.0888156 8.22867 0.708163ZM34.9367 0.708163C42.9099 8.96612 42.9099 22.3549 34.9367 30.6129C34.3387 31.2322 33.3692 31.2322 32.7712 30.6129C32.1732 29.9935 32.1732 28.9894 32.7712 28.37C39.5484 21.3508 39.5484 9.97028 32.7712 2.95102C32.1732 2.33167 32.1732 1.32751 32.7712 0.708163C33.3692 0.0888156 34.3387 0.0888156 34.9367 0.708163ZM14.0034 6.68911C14.6014 7.30845 14.6014 8.31262 14.0034 8.93196C10.4154 12.648 10.4154 18.673 14.0034 22.3891C14.6014 23.0084 14.6014 24.0126 14.0034 24.6319C13.4054 25.2513 12.4359 25.2513 11.8379 24.6319C7.05394 19.6772 7.05394 11.6439 11.8379 6.68911C12.4359 6.06976 13.4054 6.06976 14.0034 6.68911ZM29.162 6.68911C33.9459 11.6439 33.9459 19.6772 29.162 24.6319C28.564 25.2513 27.5944 25.2513 26.9965 24.6319C26.3985 24.0126 26.3985 23.0084 26.9965 22.3891C30.5844 18.673 30.5844 12.648 26.9965 8.93196C26.3985 8.31262 26.3985 7.30845 26.9965 6.68911C27.5944 6.06976 28.564 6.06976 29.162 6.68911ZM20.4999 12.4886C22.1913 12.4886 23.5624 13.9087 23.5624 15.6605C23.5624 17.4123 22.1913 18.8324 20.4999 18.8324C18.8085 18.8324 17.4374 17.4123 17.4374 15.6605C17.4374 13.9087 18.8085 12.4886 20.4999 12.4886Z"
                      fill="#B4E48F"
                    />
                  </svg>
                  <p className="">Live</p>
                </div>
              </div>
            </CardWidgetWithTitle>
            <CardWidgetWithTitle>
              <div className=" py-4 px-5 ">
                <div className=" flex items-center ">
                  {/* <BsInfoCircle className=" text-3xl " />{" "} */}
                  <h3 className=" text-2xl ml-2 font-semibold ">Info</h3>
                </div>
                <ul className="mt-3">
                  <li className=" grid grid-cols-2 items-center mb-4">
                    <p className=" text-sm text-[#717171] ">Owner Name:</p>
                    <p className="text-md ">
                      {activeResturant?.ownerName}
                    </p>
                  </li>
                  <li className=" grid grid-cols-2 items-center mb-4">
                    <p className=" text-sm text-[#717171] ">Owner Cell:</p>
                    <p className="text-md ">
                      {activeResturant?.ownerPhone}
                    </p>
                  </li>
                  <li className=" grid grid-cols-2 items-center mb-4">
                    <p className=" text-sm text-[#717171] ">Owners Email:</p>
                    <p className="text-md ">
                      {resturant?.activeResturant?.ownerEmail}
                    </p>
                  </li>
                  <li className=" grid grid-cols-2 items-center mb-4">
                    <p className=" text-sm text-[#717171] ">
                      Shop’s Local Time:
                    </p>
                    <p className="text-md ">08:10 AM (GMT)</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center mb-4">
                    <p className=" text-sm text-[#717171] ">
                      Restaurants Phone:
                    </p>
                    <p className="text-md ">Arian Emru</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center mb-4">
                    <p className=" text-sm text-[#717171] ">Date onboarded:</p>
                    <p className="text-md ">21.02.2021</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center mb-4">
                    <p className=" text-sm text-[#717171] ">Owner Name:</p>
                    <p className="text-md ">Adrian Zamundo</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center mb-4">
                    <p className=" text-sm text-[#717171] ">Delivery time:</p>
                    <div>
                      <p className="text-md ">08:00 AM - 12:00 AM </p>
                      <p className="text-md ">13:00 AM - 17:00 AM </p>
                    </div>
                  </li>
                  <li className=" grid grid-cols-2 items-center mb-4">
                    <p className=" text-sm text-[#717171] ">Pickup time:</p>
                    <div>
                      <p className="text-md ">08:00 AM - 12:00 AM </p>
                      <p className="text-md ">13:00 AM - 17:00 AM </p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardWidgetWithTitle>
          </div>
          <div className="">
            <CardWidgetWithTitle>
              <div className=" py-4 px-5 ">
                <div className=" flex items-center ">
                  <img height="26" width="27" src="/img/Orders.png" alt="" />
                  <h3 className=" text-2xl ml-2 font-semibold ">Orders</h3>
                </div>
                <ul className="mt-3">
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">
                      Transmitino Method:{" "}
                    </p>
                    <p className="text-md ">Phone</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Total Orders: </p>
                    <p className="text-md ">24</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">
                      Average Orders / Day:{" "}
                    </p>
                    <p className="text-md ">2.85</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">
                      Successful Orders:{" "}
                    </p>
                    <p className="text-md ">15</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Voided Orders: </p>
                    <p className="text-md ">5</p>
                  </li>
                </ul>
              </div>
            </CardWidgetWithTitle>
            <CardWidgetWithTitle>
              <div className=" py-4 px-5 ">
                <div className=" flex items-center ">
                  <img height="14.3" width="23" src="/img/Payments.png" alt="" />
                  <h3 className=" text-lg ml-2 font-semibold ">Payments</h3>
                </div>
                <ul className="mt-3">
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Free Trial: </p>
                    <p className="text-md ">No</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">
                      Free Trial Ends:{" "}
                    </p>
                    <p className="text-md ">21.12.2021</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Fee per Order: </p>
                    <p className="text-md ">3$</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">
                      Fee per Transaction:{" "}
                    </p>
                    <p className="text-md ">2%</p>
                  </li>
                </ul>
              </div>
            </CardWidgetWithTitle>
            <CardWidgetWithTitle>
              <div className=" py-4 px-5 ">
                <div className=" flex items-center ">
                  <img height="23" width="23" src="/img/Menu.png" alt="" />
                  <h3 className=" text-lg ml-2 font-semibold ">Menu</h3>
                </div>
                <ul className="mt-3">
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Last Updated: </p>
                    <p className="text-md ">21.12.2021 13:45</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Go to Menu </p>
                  </li>
                </ul>
              </div>
            </CardWidgetWithTitle>
            <CardWidgetWithTitle>
              <div className=" py-4 px-5 ">
                <div className=" flex items-center ">
                  <img height="30" width="30" src="/img/Delivery.png" alt="" />
                  <h3 className=" text-lg ml-2 font-semibold ">Delivery</h3>
                </div>
                <ul className="mt-3">
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Zone type:</p>
                    <p className="text-md ">Radius</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Delivery Min: </p>
                    <p className="text-md ">20$</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Delivery Fee: </p>
                    <p className="text-md ">3$</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">
                      Estimate Delivery:{" "}
                    </p>
                    <p className="text-md ">30 - 40 min</p>
                  </li>
                </ul>
              </div>
            </CardWidgetWithTitle>
          </div>
          <div className="">
            <CardWidgetWithTitle>
              <div className=" py-4 px-5 ">
                <div className=" flex items-center ">
                  <img height="14.3" width="23" src="/img/Payments.png" alt="" />
                  <h3 className=" text-lg ml-2 font-semibold ">Payouts</h3>
                </div>
                <ul className="mt-3">
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">MealNow Fee: </p>
                    <p className="text-md ">4%</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">
                      Frequency Payment:{" "}
                    </p>
                    <p className="text-md ">
                      {resturant?.activeResturant?.paymentFrequency}
                    </p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Method: </p>
                    <p className="text-md ">Phone</p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">
                      Fee per Transaction:{" "}
                    </p>
                    <p className="text-md ">2%</p>
                  </li>
                </ul>
              </div>
            </CardWidgetWithTitle>
            <CardWidgetWithTitle>
              <div className=" py-4 px-5 ">
                <div className=" flex items-center ">
                  <img height="30" width="30" src="/img/Marketing.png" alt="" />
                  <h3 className=" text-lg ml-2 font-semibold ">Marketing</h3>
                </div>
                <ul className="mt-3">
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">GMB Status: </p>
                    <p className="text-md ">
                      {resturant?.activeResturant?.gbmStatus}{" "}
                      <span>
                        <img
                          height="15.83"
                          width="15"
                          src="/img/verified-svgrepo-com 1Verified .png"
                          alt=""
                        />
                      </span>
                    </p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">GMB Owner: </p>
                    <p className="text-md ">
                      {resturant?.activeResturant?.gbmOwner}
                    </p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">GMB Email: </p>
                    <p className="text-md ">
                      {resturant?.activeResturant?.gbmEmail}
                    </p>
                  </li>
                  <li className=" grid grid-cols-2 items-center pb-[7px]">
                    <p className=" text-sm text-[#717171] ">Domain: </p>
                    <p className="text-md ">
                      {resturant?.activeResturant?.mealDomain}
                    </p>
                  </li>
                </ul>
              </div>
            </CardWidgetWithTitle>
            <CardWidgetWithTitle>
              <div className=" p-7">
                <div className=" flex items-center ">
                  <img height="30" width="30" src="/img/Partner Info.png" alt="" />
                  <h3 className=" text-2xl ml-2 font-semibold ">
                    Partner Info
                  </h3>
                </div>
                <ul className="mt-3">
                  <p>Email to create or reset password for MealNow account</p>
                </ul>
                <div className="text-right">
                  <button className="btn border-2 py-2 px-4 border-lime-500 text-lime-400 rounded-3xl">
                    Send Email
                  </button>
                </div>
              </div>
            </CardWidgetWithTitle>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
