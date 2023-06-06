import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import dynamic from "next/dynamic";
import Layout from "../../base/Layout";
import { HiPencil } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineCloseCircle } from "react-icons/ai";
// import CardWidgetWithTitle from "../../../src/components/CardWidgetWithTitle";
// import AddUserForm from "../../../src/section/AddUserForm";
import { authPost, postData } from "../../__lib__/helpers/HttpService";
import {
  activeDeliveryZones,
  setDeliveryZones,
} from "../../store/resturant/actions";
import DeliveryZonesForm from "../../components/delivery-zones/DeliveryZonesForm";
import DeliveryZonesEditForm from "../../components/delivery-zones/DeliveryZonesEditForm";
import Map from "../../components/delivery-zones/Map";

const RestaurantDeliveryZones = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [currentLat, setCurrentLat] = useState();
  const [currentLng, setCurrentLng] = useState();
  const [lat, setLat] = useState(currentLat || 45.5);
  const [lng, setLng] = useState(currentLng || -75.5);
  const [addUserForm, setAddUserForm] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);
  const [deliveryZonesEditForm, setDeliveryZonesEditForm] = useState(false);
  const [deliveryZonesForm, setDeliveryZonesForm] = useState(false);
  const [deliveryZonesData, setDeliveryZonesData] = useState();
  const [deliveryZonesEditFormNumber, setDeliveryZonesEditFormNumber] = useState(null);
  const dispatch = useDispatch();
  const { admin, resturant } = useSelector((state) => state);

  useEffect(() => {
    dispatch(setDeliveryZones(resturant?.activeResturant?._id, admin?.token));
  }, []);

  const onError = (err) => console.log(err);

  const onSubmit = (data) => {
    authPost(
      `/restaurant/delivery-zone?_rid=${resturant?.activeResturant?._id}`,
      data,
      admin?.token
    ).then((res) => {
      if (res.success) {
        dispatch(
          setDeliveryZones(resturant?.activeResturant?._id, admin?.token)
        );
        toast.success(`${res.message}`);
        reset();
        setAddUserForm(!addUserForm);
      }
      console.log(res);
    });
  };

  const handleActiveDeliveryZones = (_id, lat, lng) => {
    setLat(lat);
    setLng(lng);
    dispatch(activeDeliveryZones(_id));
    setDeliveryZonesEditFormNumber(_id);
  };

  navigator.geolocation.getCurrentPosition(function (position) {
    setCurrentLat(position?.coords?.latitude || 45.5);
    setCurrentLng(position?.coords?.longitude || -75.5);
    // console.log("Latitude is AddMap :", position?.coords.latitude);
    // console.log("Longitude is AddMap :", position?.coords.longitude);
  });
  console.log("resturant-delivery-zones", resturant?.deliveryZones);
  console.log("resturant-delivery-zones-map", currentLat, currentLng);
  // console.log("mylocation", window.navigator.geolocation.watchPosition);
  return (
    <Layout status="restaurant" _resturant={true}>
      <div className="w-11/12 mx-auto mt-4">
        <div className="flex justify-between items-center  border-b border-solid border-[#c7c7c7] pb-4 ">
          <h1 className=" text-[#212121] text-[26px] font-mono ">
            Delivery Zones - { resturant?.activeResturant?.name }
          </h1>
          <div className="">
            <button
              onClick={() => setAddUserForm(!addUserForm)}
              className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent transition-all duration-300 ease-in-out focus:outline-none active:outline-none  hover:text-black cursor-pointer"
            >
              Add new Zone
            </button>
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-4 ">
          <div className="">
            {Array.isArray(resturant?.deliveryZones) &&
              resturant?.deliveryZones.map((deliveryZone, index) => (
                <div
                  key={index}
                  onClick={() =>
                    handleActiveDeliveryZones(
                      index,
                      deliveryZone.lat,
                      deliveryZone.lng
                    )
                  }
                  className={` cursor-pointer  shadow-[0_0_15px_1px_#1111110d] w-full py-2 px-3 mt-4  ${
                    deliveryZonesEditFormNumber === index
                      ? "bg-[#EFFBE6]"
                      : "bg-white"
                  }`}
                >
                  <div className=" flex items-center justify-between">
                    <div className="flex items-center">
                      <h3 className=" text-2xl ml-2 font-semibold ">
                        # {deliveryZone?.name}
                      </h3>
                    </div>
                    <span
                      onClick={() => {
                        setDeliveryZonesEditForm(!deliveryZonesEditForm);
                        setDeliveryZonesEditFormNumber(index);
                      }}
                      className="text-[#6FB327] mt-3 border-[#6FB327] border border-solid flex w-20 justify-center items-center  ml-auto rounded-full cursor-pointer "
                    >
                      <HiPencil />
                      Edit
                    </span>
                  </div>
                  <ul className="mt-2 px-8 ">
                    <li className=" grid grid-cols-2 items-center  py-1 ">
                      <p className=" text-md text-[#757575] font-sans pl-2">
                        <ul>
                          <li>
                            {" "}
                            Driving Radius: {deliveryZone?.drivingRadius}km
                          </li>
                          <li>
                            {" "}
                            Minimum order: $ {deliveryZone?.minimumOrder}
                          </li>
                          <li>
                            {" "}
                            Maximum order: $ {deliveryZone?.maximumOrder}{" "}
                          </li>
                          <li> Delivery fee: $ {deliveryZone?.deliveryFee} </li>
                        </ul>
                      </p>
                      <p className="text-md text-[#757575] font-sans pl-2">
                        Address: <br />
                        {deliveryZone?.address}
                      </p>
                    </li>
                  </ul>
                </div>
              ))}
          </div>
          {!addUserForm && !deliveryZonesEditForm && (
            <div className=" border-l border-solid border-[#D6D6D6]  pl-3 ">
              <h3 className=" text-2xl font-mono  ">Zone 1 - Preview</h3>
              <Map lat={lat} lng={lng} />
            </div>
          )}
        </div>
      </div>
      {addUserForm && (
        <DeliveryZonesForm
          addUserForm={addUserForm}
          setAddUserForm={setAddUserForm}
        />
      )}

      {deliveryZonesEditForm && (
        <DeliveryZonesEditForm
          lat={lat}
          lng={lng}
          setLng={setLng}
          setLat={setLat}
          deliveryZonesEditForm={deliveryZonesEditForm}
          setDeliveryZonesEditForm={setDeliveryZonesEditForm}
          deliveryZonesEditFormNumber={deliveryZonesEditFormNumber}
          setDeliveryZonesEditFormNumber={setDeliveryZonesEditFormNumber}
        />
      )}
    </Layout>
  );
};

export default RestaurantDeliveryZones;