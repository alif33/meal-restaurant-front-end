import React, { useEffect, useState } from "react";
import { HiPencil } from "react-icons/hi";
import CardWidgetWithTitle from "../../components/CardWidgetWithTitle";
import Layout from "../../base/Layout";
import { useDispatch, useSelector } from "react-redux";
import ClosuresForm from "../../components/schedule/ClosuresForm";
import DeliveryFrom from "../../components/schedule/DeliveryFrom";
import PickupFrom from "../../components/schedule/PickupFrom";
import SpecialHoursForm from "../../components/schedule/SpecialHoursForm";
import { setSchedules } from "../../store/resturant/actions";

const RestaurantSchedule = () => {
  const [addUserForm, setAddUserForm] = useState(false);
  const [deliveryForm, setDeliveryForm] = useState(false);
  const [pickupFrom, setPickupFrom] = useState(false);
  const [specialHoursForm, setSpecialHoursForm] = useState(false);
  const [closuresForm, setClosuresForm] = useState(false);
  const [deliverySche, setDeliverySche] = useState([]);

  const { admin, resturant } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(setSchedules(resturant?.activeResturant?._id))
  }, [])

  return (
    <Layout status="restaurant">
      <div className="w-11/12 mx-auto mt-4">
        <div className="flex justify-between items-center  border-b border-solid border-[#c7c7c7] pb-4 ">
          <h1 className=" text-[#212121] text-[26px] font-mono ">
            Schedule - { resturant?.activeResturant?.name }
          </h1>
          <div className="">
            <button
              onClick={() => setAddUserForm(!addUserForm)}
              className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent transition-all duration-300 ease-in-out focus:outline-none active:outline-none  hover:text-black cursor-pointer"
            >
              save
            </button>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-4 ">
          <CardWidgetWithTitle>
            <div className=" py-4 px-1 ">
              <div className=" flex items-center justify-between ">
                <div className="flex items-center">
                  <h3 className=" text-2xl ml-2 font-semibold ">Delivery</h3>
                </div>
                <span
                  onClick={() => setDeliveryForm(!deliveryForm)}
                  className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                >
                  <HiPencil />
                  Edit
                </span>
              </div>
              <ul className="mt-3">
                <li className=" grid grid-cols-2 items-center border-b border-solid border-[#908C8C] py-1 ">
                  <p className=" text-md text-[#757575] font-sans font-bold pl-2">
                    Day of Week
                  </p>
                  <p className="text-md text-[#757575] font-sans font-bold pl-2">
                    Start - End
                  </p>
                </li>
                {
                  resturant?.sehedules && 
                  Array.isArray(resturant?.sehedules) &&
                  resturant.sehedules.map((delivery, index)=>{
                    if(delivery.genre==="Delivery"){
                      return(
                        <li key={index} className=" grid grid-cols-2 items-center border-b border-solid border-[#908C8C] ">
                          <p className=" text-md text-[#757575] font-sans font-normal border-r border-solid border-[#908C8C] py-1 pl-2 ">
                            {delivery?.day}
                          </p>
                          <p className="text-md text-[#757575] font-sans font-normal py-1 pl-2">
                            {delivery.startPeriod} - {delivery.endPeriod}
                          </p>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            </div>
          </CardWidgetWithTitle>
          <CardWidgetWithTitle>
            <div className=" py-4 px-1 ">
              <div className=" flex items-center justify-between ">
                <div className="flex items-center">
                  <h3 className=" text-2xl ml-2 font-semibold ">Pickup</h3>
                </div>
                <span
                  onClick={() => setPickupFrom(!pickupFrom)}
                  className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                >
                  <HiPencil />
                  Edit
                </span>
              </div>
              <ul className="mt-3">
                <li className=" grid grid-cols-2 items-center border-b border-solid border-[#908C8C] py-1 ">
                  <p className=" text-md text-[#757575] font-sans font-bold pl-2">
                    Day of Week
                  </p>
                  <p className="text-md text-[#757575] font-sans font-bold pl-2">
                    Start - End
                  </p>
                </li>
                {
                  resturant?.sehedules && 
                  Array.isArray(resturant?.sehedules) &&
                  resturant.sehedules.map((delivery, index)=>{
                    if(delivery.genre==="Pickup"){
                      return(
                        <li key={index} className=" grid grid-cols-2 items-center border-b border-solid border-[#908C8C] ">
                          <p className=" text-md text-[#757575] font-sans font-normal border-r border-solid border-[#908C8C] py-1 pl-2 ">
                            {delivery?.day}
                          </p>
                          <p className="text-md text-[#757575] font-sans font-normal py-1 pl-2">
                            {delivery.startPeriod} - {delivery.endPeriod}
                          </p>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            </div>
          </CardWidgetWithTitle>
          <CardWidgetWithTitle>
            <div className=" py-4 px-1 ">
              <div className=" flex items-center justify-between ">
                <div className="flex items-center">
                  <h3 className=" text-2xl ml-2 font-semibold ">
                    Special Hours
                  </h3>
                </div>
                <span
                  onClick={() => setSpecialHoursForm(!specialHoursForm)}
                  className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                >
                  <HiPencil />
                  Edit
                </span>
              </div>
              <ul className="mt-3">
                <li className=" grid grid-cols-2 items-center border-b border-solid border-[#908C8C] py-1 ">
                  <p className=" text-md text-[#757575] font-sans font-bold pl-2">
                    Day of Week
                  </p>
                  <p className="text-md text-[#757575] font-sans font-bold pl-2">
                    Start - End
                  </p>
                </li>
                {
                  resturant?.sehedules && 
                  Array.isArray(resturant?.sehedules) &&
                  resturant.sehedules.map((delivery, index)=>{
                    if(delivery.genre==="Special Hour"){
                      return(
                        <li key={index} className=" grid grid-cols-2 items-center border-b border-solid border-[#908C8C] ">
                          <p className=" text-md text-[#757575] font-sans font-normal border-r border-solid border-[#908C8C] py-1 pl-2 ">
                            {delivery?.day}
                          </p>
                          <p className="text-md text-[#757575] font-sans font-normal py-1 pl-2">
                            {delivery.startPeriod} - {delivery.endPeriod}
                          </p>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            </div>
          </CardWidgetWithTitle>
          <CardWidgetWithTitle>
            <div className=" py-4 px-1 ">
              <div className=" flex items-center justify-between ">
                <div className="flex items-center">
                  <h3 className=" text-2xl ml-2 font-semibold ">Closures</h3>
                </div>
                <span
                  onClick={() => setClosuresForm(!closuresForm)}
                  className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                >
                  <HiPencil />
                  Edit
                </span>
              </div>
              <ul className="mt-3">
                <li className=" grid grid-cols-2 items-center border-b border-solid border-[#908C8C] py-1 ">
                  <p className=" text-md text-[#757575] font-sans font-bold pl-2">
                    Day of Week
                  </p>
                  <p className="text-md text-[#757575] font-sans font-bold pl-2">
                    Start - End
                  </p>
                </li>
                {
                  resturant?.sehedules && 
                  Array.isArray(resturant?.sehedules) &&
                  resturant.sehedules.map((delivery, index)=>{
                    if(delivery.genre==="Closure"){
                      return(
                        <li key={index} className=" grid grid-cols-2 items-center border-b border-solid border-[#908C8C] ">
                          <p className=" text-md text-[#757575] font-sans font-normal border-r border-solid border-[#908C8C] py-1 pl-2 ">
                            {delivery?.day}
                          </p>
                          <p className="text-md text-[#757575] font-sans font-normal py-1 pl-2">
                            {delivery.startPeriod} - {delivery.endPeriod}
                          </p>
                        </li>
                      )
                    }
                  })
                }
              </ul>
            </div>
          </CardWidgetWithTitle>
        </div>
      </div>

      {deliveryForm && (
        <DeliveryFrom
          deliveryForm={deliveryForm}
          setDeliveryForm={setDeliveryForm}
          deliverySche={deliverySche}
          setDeliverySche={setDeliverySche}
        />
      )}
      {pickupFrom && (
        <PickupFrom pickupFrom={pickupFrom} setPickupFrom={setPickupFrom} />
      )}

      {specialHoursForm && (
        <SpecialHoursForm
          specialHoursForm={specialHoursForm}
          setSpecialHoursForm={setSpecialHoursForm}
        />
      )}

      {closuresForm && (
        <ClosuresForm
          closuresForm={closuresForm}
          setClosuresForm={setClosuresForm}
        />
      )}
    </Layout>
  );
};

export default RestaurantSchedule;
