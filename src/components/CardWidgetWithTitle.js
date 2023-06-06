import React from "react";

const CardWidgetWithTitle = ({ children, title }) => {
  return (
    <div>
      <h3 className="text-xl text-[#212121] ">{title}</h3>
      <div className=" bg-white shadow-[0_0_15px_1px_#1111110d] w-full py-2 px-3 mt-4 ">
        {children}
      </div>
    </div>
  );
};

export default CardWidgetWithTitle;
