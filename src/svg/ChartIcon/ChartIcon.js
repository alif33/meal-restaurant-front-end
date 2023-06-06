import React from "react";

const ChartIcon = ({ color }) => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11 0C8.82441 0 6.69767 0.645139 4.88873 1.85383C3.07979 3.06253 1.66989 4.78049 0.83733 6.79048C0.00476611 8.80047 -0.213071 11.0122 0.211367 13.146C0.635804 15.2798 1.68345 17.2398 3.22183 18.7782C4.76021 20.3165 6.72022 21.3642 8.85401 21.7886C10.9878 22.2131 13.1995 21.9952 15.2095 21.1627C17.2195 20.3301 18.9375 18.9202 20.1462 17.1113C21.3549 15.3023 22 13.1756 22 11C21.9967 8.08363 20.8367 5.28764 18.7745 3.22545C16.7124 1.16327 13.9164 0.00328578 11 0ZM11 20.4286C8.49939 20.4286 6.1012 19.4352 4.333 17.667C2.5648 15.8988 1.57143 13.5006 1.57143 11C1.57143 8.49939 2.5648 6.10119 4.333 4.33299C6.1012 2.56479 8.49939 1.57143 11 1.57143V11L17.6638 17.664C16.7899 18.541 15.7513 19.2367 14.6077 19.7111C13.4641 20.1855 12.2381 20.4294 11 20.4286Z"
        // fill="#9E9E9E"
        fill={color}
      />
    </svg>
  );
};

export default ChartIcon;
