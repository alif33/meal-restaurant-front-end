import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { activeRestaurant } from "../store/restaurant/actions";
import EyeIcon from "../svg/EyeIcon";
import IIcon from "../svg/IIcon";
import SupportIcon2 from "../svg/SupportIcon2";
import SupportIcon3 from "../svg/SupportIcon3";

const RestaurantTable = ({ restaurants }) => {
  const [show, setShow] = useState(null);
  const { restaurant } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleActive = res => {
    dispatch(activeRestaurant(res));
    navigate("/dashboard");
  };

  return (
    <div>
      <table className="w-full whitespace-nowrap text-center">
        <thead className="py-2 text-[#6FB327] font-mono text-sm ">
          <tr className="h-16  ">
            <th className="font-normal">Restaurant Name</th>
            <th className="font-normal">City</th>
            <th className="font-normal">Phone </th>
            <th className="font-normal">Open/Closed</th>
            <th className="font-normal">View on Front</th>
            <th className="font-normal">Status</th>
            <th className="font-normal">View Shop</th>
            <th className="font-normal">Support ALL</th>
            <th className="font-normal">Support New</th>
          </tr>
        </thead>

        {restaurants &&
          Array.isArray(restaurants) &&
          restaurants.map((res, index) => (
            <tbody key={res._id}>
              <tr className="h-16 bg-white ">
                <td>
                  <p
                    className={`text-[#212121] font-mono font-normal text-sm cursor-pointer ${
                      restaurant?.activeRestaurant?._id === res._id
                        ? "underline"
                        : " "
                    }`}
                    onClick={() => handleActive(res)}
                  >
                    {res.name}
                  </p>
                </td>
                <td>
                  <p className="text-[#212121] font-mono font-normal text-sm">
                    {res?.city}
                  </p>
                </td>
                <td>
                  <p className="text-[#212121] font-mono font-normal text-sm">
                    {res?.resturantPhone}
                  </p>
                </td>
                <td>
                  <p
                    className={`text-white text-xs font-semibold font-mono rounded-3xl w-16 m-auto py-2 ${
                      true ? "bg-[#6FB327]" : "bg-[#B32727]"
                    }`}
                  >
                    OPEN
                  </p>
                </td>

                <td>
                  <button
                    type="button"
                    // onClick={() => handleActive(restaurant)}
                  >
                    <EyeIcon />
                  </button>
                </td>
                <td>
                  <p
                    className={`text-white text-xs font-semibold font-mono rounded-3xl w-16 m-auto py-2 ${
                      true ? "bg-[#6FB327]" : "bg-[#B32727]"
                    }`}
                  >
                    LIVE
                  </p>
                </td>
                <td>
                  <IIcon />
                </td>
                <td>
                  <SupportIcon2 />
                </td>
                <td>
                  <SupportIcon3 />
                </td>
              </tr>
              <tr className="h-3" />

              <tr className="h-3" />
            </tbody>
          ))}
      </table>
    </div>
  );
};

export default RestaurantTable;
