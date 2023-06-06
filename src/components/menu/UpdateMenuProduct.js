import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IoChevronUpOutline,
  IoEllipsisHorizontalSharp,
  IoMenuSharp,
} from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";

const UpdateMenuProduct = ({ updateProductModal, setUpdateProductModal }) => {
  const [shopSelectedFile, setShopSelectedFile] = useState();
  const [shopCheckFile, setShopCheckFile] = useState(false);
  const dispatch = useDispatch();

  const shopImageHandler = (e) => {
    setShopSelectedFile(e.target.files[0]);
    setShopCheckFile(true);
  };

  const { resturant, menu, admin } = useSelector((state) => state);
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();


  useEffect(()=>{
    if(!menu?.categories) return null
    const category = menu?.categories.find(ctg=>ctg._id === updateProductModal[0])
    if(!category) return null
    const product = category.products.find(pro=>pro._id===updateProductModal[1])
    setValue("name", product.name)
    setValue("description", product.description)
    setValue("category", product.category)
    console.log(product);
  }, [])


  const onSubmit = (data) => {
    console.log("MenuProduct", data);
    // authPost(
    //   "/menu/product",
    //   { ...data, resturant: resturant.activeResturant?._id },
    //   admin.token
    // ).then((res) => {
    //   if (res.success) {
    //     dispatch(setCategories(resturant.activeResturant?._id));
    //     toast.success(`${res.message}`);
    //     setPM(!pm);
    //   }
    //   console.log(res);
    // });
  };

  const handleNewProductType = () => {
    console.log("newProductType");
  };
  
  return (
    <>
      <div
        onClick={() => setUpdateProductModal(false)}
        className=" fixed top-0 left-0 w-full h-screen bg-[#11111185] "
      ></div>
      <div className="fixed top-0 right-0 w-[90%] h-screen bg-[#fff] py-8 px-7  overflow-y-auto  ">
        <div className="w-11/12 mx-auto mt-4 border-b-[1px] pb-1">
          <div className="flex justify-between items-center mt-[38px]">
            <div>
              <h1 className="font-light text-[28px]">
                Menu - {resturant?.activeResturant?.name}{" "}
              </h1>
              <label
                htmlFor=""
                className="text-[12px] font-light text-[#A4A4A4] block"
              >
                Edit Menu | Product
              </label>
            </div>
            <div className="flex items-center gap-7">
              <div>
                <button
                  type="button"
                  onClick={() => setUpdateProductModal(false)}
                  className="text-[#6FB327] w-[178.76px] h-[32px] text-xs rounded-3xl border"
                >
                  BACK TO MENU
                </button>
              </div>
              <div>
                <button
                  onClick={ handleSubmit(onSubmit) }
                  className="bg-[#6FB327] text-white w-[178.76px] h-[32px] text-xs rounded-3xl"
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-11/12 mx-auto mt-4 border-b-[1px] pb-1 ">
          <div className="grid grid-cols-12 gap-2">
            <div className=" col-span-4 bg-white">
              <form className="p-3">
                <div className="pb-4">
                  <label className="w-full" htmlFor="">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="input w-full border h-[40.85px] p-3 "
                    {...register("name", {
                      // required: "Account Manager Name is required.",
                    })}
                  />
                </div>
                <div className="pb-4">
                  <label className="w-full" htmlFor="">
                    Description
                  </label>
                  <textarea
                    className="input w-full border h-[129.17px] p-3"
                    type="text"
                    {...register("description", {
                      // required: " Sales Rep. is required.",
                    })}
                  />
                  <div className="text-end mt-2">
                    <button className="border py-1 px-2 rounded-3xl border-lime-500 text-lime-500">
                      sentence case{" "}
                    </button>
                  </div>
                </div>

                <div className="pb-4">
                  <label className="w-full" htmlFor="">
                    Category:
                  </label>
                  <select
                    className="input w-full border h-[40.85px]"
                    {...register("category", {
                      // required: " Sales Rep. is required.",
                    })}
                  >
                    <option>Select</option>
                    {menu.categories &&
                      menu.categories.length > 0 &&
                      menu.categories.map((category, index) => (
                        <option key={index} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-5">
                  <div className="">
                    <label className="w-full " htmlFor="">
                      Product Image
                    </label>
                    <div className="h-36 cursor-pointer relative flex justify-center items-center border-2 mt-2">
                      <input
                        type="file"
                        name="file"
                        onChange={shopImageHandler}
                        className="z-20 opacity-0 cursor-pointer h-full w-full "
                      />
                      <div className="absolute flex justify-center items-center gap-2">
                        <img
                          className={`h-24 w-30  ${
                            shopCheckFile ? "opacity-1" : "opacity-0"
                          }`}
                          src={
                            shopSelectedFile
                              ? URL.createObjectURL(shopSelectedFile)
                              : null
                          }
                        />
                        <span className="w-56 truncate mb-2 text-sm text-gray-500 dark:text-gray-400">
                          {shopCheckFile
                            ? shopSelectedFile.name
                            : "Drop Files Here"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <p>Product Options</p>
                  <div className="flex items-center gap-28 pt-4">
                    <div>
                      <input className="mr-2" type="checkbox" name="" id="" />
                      <label htmlFor="">Featured</label>
                    </div>
                    <div>
                      <input className="mr-2" type="checkbox" name="" id="" />
                      <label htmlFor="">In Store only</label>
                    </div>
                  </div>
                  <div className="flex items-center gap-[116px] pt-4">
                    <div>
                      <input className="mr-2" type="checkbox" name="" id="" />
                      <label htmlFor="">Alcohol</label>
                    </div>
                    <div>
                      <input className="mr-2" type="checkbox" name="" id="" />
                      <label htmlFor="">Loyalty Reward</label>
                    </div>
                  </div>
                  <div className="flex items-center gap-10 pt-4">
                    <div>
                      <input className="mr-2" type="checkbox" name="" id="" />
                      <label htmlFor="">Discount Ineligible</label>
                    </div>
                    <div>
                      <input className="mr-2" type="checkbox" name="" id="" />
                      <label htmlFor="">Photo Hidden</label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-span-8">
              <div className="h-[278px] bg-white">
                <div>
                  <div className="flex justify-between items-center px-3 pt-2">
                    <div>
                      <p className="text-[#6FB327] border-[1px] border-[#6FB327] py-1 px-3 rounded-full inline-block mr-3">
                        1
                      </p>
                      <p className="inline-block">Product Types</p>
                    </div>
                    <div>
                      <button className="text-[#6FB327] border-[1px]  py-3 px-3 rounded-full inline-block mr-3">
                        <IoChevronUpOutline />
                      </button>
                      <button className="text-[#6FB327] border-[1px]  py-3 px-3 rounded-full inline-block">
                        <IoEllipsisHorizontalSharp />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center gap-5 px-24">
                    <div>
                      <label htmlFor="" className="text-[12px] text-[#717171]">
                        Title
                      </label>
                      <input
                        type="text"
                        className="input w-full border h-[40.85px] p-3 "
                        {...register("title", {
                          // required: "Account Manager Name is required.",
                        })}
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <div>
                        <label
                          htmlFor=""
                          className="text-[12px] text-[#717171]"
                        >
                          Price
                        </label>
                        <div className="border h-[40.85px] flex ">
                          <p className="inline-block px-3 border-r flex justify-center items-center">
                            $
                          </p>
                          <input
                            type="text"
                            className="input w-full focus:outline-none  p-3 "
                            {...register("price", {
                              // required: " Sales Rep. is required.",
                            })}
                          />
                        </div>
                      </div>
                      <div className="ml-7 mt-5">
                        <img
                          className=""
                          width="22"
                          height="22"
                          src="/img/delete.png"
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-7 pr-24">
                  <button
                    onClick={() => handleNewProductType()}
                    className="border-2 border-[#6FB327] rounded-2xl px-1 py-1 text-[#6FB327]"
                  >
                    + New Product Type
                  </button>
                </div>
              </div>
              <div className="h-[320px] mt-5 bg-white">
                <div className="flex justify-between items-center px-3 pt-2">
                  <div>
                    <p className="text-[#6FB327] border-[1px] border-[#6FB327] py-1 px-3 rounded-full inline-block mr-3">
                      2
                    </p>
                    <p className="inline-block">Product Addons</p>
                  </div>
                  <div>
                    <button className="border-2 border-[#6FB327] rounded-3xl px-1 py-1 text-[#6FB327]">
                      + Add Addon
                    </button>
                  </div>
                </div>
                <div className="flex  items-center gap-5 px-24">
                  <div>
                    <label htmlFor="" className="text-[12px] text-[#717171]">
                      Name
                    </label>
                    <input
                      type="text"
                      className="input w-full border h-[40.85px] p-3 "
                      {...register("ProductName", {
                        // required: "Account Manager Name is required.",
                      })}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=""
                      className="text-[12px] block text-[#717171]"
                    >
                      Limit
                    </label>
                    <input
                      type="text"
                      className="input w-[90px] border h-[40.85px] p-3 "
                      {...register("limit", {
                        // required: "Account Manager Name is required.",
                      })}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pl-10 pt-5">
                  <div>
                    <input className="mr-2" type="checkbox" name="" id="" />
                    <label htmlFor="">Required</label>
                  </div>
                  <div>
                    <input className="mr-2" type="checkbox" name="" id="" />
                    <label htmlFor="">By Type</label>
                  </div>
                  <div>
                    <input className="mr-2" type="checkbox" name="" id="" />
                    <label htmlFor="">By Half</label>
                  </div>
                </div>
                <div className="pt-5 pl-9">
                  <p className="text-[#6FB327] pb-2">Selections</p>
                  <div className="flex items-center gap-3">
                    <div>
                      <IoMenuSharp className="inline-block text-2xl" />
                      <div className="inline-block">
                        <label htmlFor="" className="text-[12px] block">
                          Name
                        </label>
                        <input
                          type="text"
                          className="input border w-[166px] h-[40.85px] p-3"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="" className="text-[12px] text-[#717171]">
                        Small 10’’
                      </label>
                      <div className="border w-[100px] h-[40.85px] flex ">
                        <p className="inline-block px-3 border-r flex justify-center items-center">
                          $
                        </p>
                        <input
                          type="text"
                          className="input w-full focus:outline-none  p-3 "
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="" className="text-[12px] text-[#717171]">
                        Large 16’’
                      </label>
                      <div className="border w-[100px] h-[40.85px] flex ">
                        <p className="inline-block px-3 border-r flex justify-center items-center">
                          $
                        </p>
                        <input
                          type="text"
                          className="input w-full focus:outline-none  p-3 "
                        />
                      </div>
                    </div>
                    <button className="pt-6">
                      {" "}
                      <img
                        className=""
                        width="22"
                        height="22"
                        src="/img/24-hours-svgrepo-com 1.png"
                        alt=""
                      />
                    </button>
                    <button className="pt-6">
                      {" "}
                      <img
                        className=""
                        width="22"
                        height="22"
                        src="/img/24-hours-svgrepo-com 2.png"
                        alt=""
                      />
                    </button>
                    <button className="pt-6">
                      {" "}
                      <img
                        className=""
                        width="22"
                        height="22"
                        src="/img/24-hours-svgrepo-com 3.png"
                        alt=""
                      />
                    </button>
                    <button className="pt-6">
                      {" "}
                      <img
                        className=""
                        width="22"
                        height="22"
                        src="/img/delete.png"
                        alt=""
                      />
                    </button>
                  </div>
                </div>
                <div className="flex justify-end pr-10">
                  <button className="border-[#4556AC] text-[#4556AC] py-1 px-1 rounded-2xl text-sm border-[1px]">
                    + Add Selection
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="w-8/12 h-[278px] bg-white"></div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateMenuProduct;
