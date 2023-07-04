import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setSchedules } from "../../store/restaurant/actions";
import { authPost, updateData } from "../../__lib__/helpers/HttpService";
import { days } from "../../__lib__/config";

const PickupFrom = ({ pickupFrom, setPickupFrom }) => {
  const [day, setDay] = useState();
  const [startPeriod, setStartPeriod] = useState();
  const [endPeriod, setEndPeriod] = useState();
  const [tempSche, setTempSche] = useState([]);
  const { admin, restaurant } = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleAddWorkingHours = ()=>{
    if(day && startPeriod && endPeriod){
      const deliverySche = {
        day,
        genre: "Pickup",
        startPeriod,
        endPeriod,
        restaurant: restaurant?.activeRestaurant?._id        
      }

      setTempSche(
        [
          ...tempSche,
          deliverySche
        ]
      )
      
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    authPost("/restaurant/schedule", { docs: tempSche })
    .then(res=>{
      if(res.success){
        setTempSche([])
        dispatch(setSchedules(restaurant?.activeRestaurant?._id))
      }
    })
    .catch(err=>{
      console.log(err);
    })
  };

  return (
    <>
      <div
        onClick={() => setPickupFrom(!pickupFrom)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[30%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-solid border-[#D7D7D7]   ">
          <h4 className=" text-[#757575] text-[13px] ">Edit Pickup hours</h4>
          <button
            onClick={() => setPickupFrom(!pickupFrom)}
            className=" border-none text-[#757575] text-2xl bg-transparent  "
          >
            <AiOutlineCloseCircle />
          </button>
        </div>
        <h4 className=" text-lg text-[#212121] ">Pickup</h4>
        <ul>
          <li className=" grid grid-cols-[24%_32%_32%] gap-[1%] items-cneter  ">
            <p className="text-xs text-[#757575] ">Day of Week</p>
            <p className="text-xs text-[#757575] ">Start Time</p>
            <p className="text-xs text-[#757575] ">End Time</p>
          </li>
          {
            restaurant?.sehedules && 
            Array.isArray(restaurant?.sehedules) &&
            restaurant.sehedules.map((sche, index)=>{
              if (sche.genre==="Pickup") {
                return(
                  <li key={index} className="grid grid-cols-[20%_24%_5%_24%_5%] gap-[4%] items-center mt-4">
                    <p className="text-xs text-[#757575] ">{sche.day}</p>
                    <input
                      type="time"
                      value={sche.startPeriod}
                      readOnly
                      className="text-[10px] py-1 px-1 text-[#757575] border border-solid border-[#CCCCCC]"
                    />
                    <span className="text-xs text-[#757575] ">to</span>
                    <input
                      type="time"
                      value={sche.endPeriod}
                      readOnly
                      className="text-[10px] py-1 px-1 text-[#757575] border border-solid border-[#CCCCCC"
                    />
                    <MdDeleteOutline className="text-3xl text-[#CF6262] cursor-pointer" />
                  </li>
                )
              }
            })
          }
          {
            tempSche && tempSche.map((sche, index)=>{
              return(
                <li key={index} className=" grid grid-cols-[20%_24%_5%_24%_5%] gap-[4%] items-center mt-4 ">
                  <p className="text-xs text-[#757575] ">{sche.day}</p>
                  <input
                    type="time"
                    value={sche.startPeriod}
                    readOnly
                    className="text-[10px] py-1 px-1 text-[#757575] border border-solid border-[#CCCCCC] "
                  />
                  <span className="text-xs text-[#757575] ">to</span>
                  <input
                    type="time"
                    value={sche.endPeriod}
                    readOnly
                    className="text-[10px] py-1 px-1 text-[#757575] border border-solid border-[#CCCCCC]  "
                  />
                  <MdDeleteOutline className=" text-3xl text-[#CF6262] cursor-pointer" />
                </li>
              )
            })
          }
        </ul>
        <form onSubmit={onSubmit} className="mt-7">
          <div className=" grid grid-cols-[24%_32%_32%] gap-[1%] items-cneter  ">
            <p className="text-xs text-[#757575] ">Day of Week</p>
            <p className="text-xs text-[#757575] ">Start Time</p>
            <p className="text-xs text-[#757575] ">End Time</p>
          </div>
          <div className=" grid grid-cols-[24%_32%_32%] gap-[1%] items-cneter  mt-3 ">
            <select defaultValue={""} onChange={e=>setDay(e.target.value)} className="text-[12px] py-1 px-1 text-[#757575] border border-solid border-[#CCCCCC]  focus:outline-none active:outline-none ">
              {
                days.map((day, index)=>(
                  <option key={index} value={day}>{day}</option>
                ))
              }
            </select>
            <input
              type="time"
              className="text-[10px] py-1 px-1 text-[#757575] border border-solid border-[#CCCCCC]  "
              onChange={e=>setStartPeriod(e.target.value)}
           />
            <input
              type="time"
              className="text-[10px] py-1 px-1 text-[#757575] border border-solid border-[#CCCCCC]  "
              onChange={e=>setEndPeriod(e.target.value)}
            />
          </div>
          <div className="flex justify-end ">
            <button type="button" onClick={handleAddWorkingHours} className=" border border-solid border-[#6FB327] text-md text-[#6FB327] rounded-3xl text-center py-2 px-5 mt-4 ml-auto ">
              + Add Working Hours
            </button>
          </div>
          <div className="flex items-center mt-[180px] pt-7 justify-evenly  w-full mx-auto border-t-2">
            <button
              onClick={() => setPickupFrom(!pickupFrom)}
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
      </div>
    </>
  );
};

export default PickupFrom;
