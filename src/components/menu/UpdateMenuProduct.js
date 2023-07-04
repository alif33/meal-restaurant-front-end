import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  IoChevronUpOutline,
  IoEllipsisHorizontalSharp,
  IoMenuSharp,
} from "react-icons/io5";
import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { updateData } from "../../__lib__/helpers/HttpService";
import { setCategories } from "../../store/catrgories/actions"

const UpdateMenuProduct = ({ updateProductModal, setUpdateProductModal }) => {
  const [pid, setPid] = useState();
  const [options, setOptions] = useState([]);
  const [changing, setChanging] = useState(true);
  const [image, setImage] = useState();
  const [types, setTypes] = useState([{ title: "", cost: "" }]);
  const [addons, setAddons] = useState([
    { selections: [{ }] },
  ]);


  const [shopSelectedFile, setShopSelectedFile] = useState();
  const [shopCheckFile, setShopCheckFile] = useState(false);
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);


  const shopImageHandler = (e) => {
    setShopSelectedFile(e.target.files[0]);
    setShopCheckFile(true);
  };

  const { restaurant, menu, admin } = useSelector((state) => state);
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
    setPid(product._id)
    setValue("name", product.name)
    setValue("description", product.description)
    setValue("category", product.category)
    setOptions(product.options)
    setTypes(product.types)
    setAddons(product.addons)
    console.log(product.addons);
  }, [])


  const onSubmit = (data) => {
    updateData(
      `/menu/product?pid=${pid}`,
      {
        ...data,
        image,
        options,
        types,
        addons
      },
      auth.token
    ).then((res) => {

      if (res.success) {
        dispatch(setCategories(restaurant.activeRestaurant?._id));
        toast.success(`${res.message}`);
      }

    });
  };

  const handleNewProductType = () => {
    console.log("newProductType");
  };


  const handleRemoveType = (_index) => {
    const __types = types.filter((item, index) => index !== _index);
    setTypes([...__types]);
  };

  const handleType = (value, __title, index) => {
    let _types = types;

    if (__title) {
      _types[index].title = value;
    } else {
      _types[index].cost = value;
    }
    setTypes(_types);
    setChanging(!changing);
  };

  const AddNewAddon = () => {
    setAddons([
      ...addons,
      {
        selections: [{ }]
      },
    ]);
  };

  const handleAddons = (name, value, index)=>{
    let _addons = addons;
    _addons[index][`${name}`] = value;

    setAddons(_addons);
    setChanging(!changing);
  }

  const addSelections = index=> {
    let _addons = addons;
    _addons[index].selections = [
      ...addons[index].selections,
      {}
    ];

    setAddons(_addons);
    setChanging(!changing);
  }

  const handleSelections = (index, _index, name, value)=>{
    let _addons = addons;
    _addons[index].selections[_index][`${name}`] = value;
    setAddons(_addons);
    setChanging(!changing);
  }

  const removeSelections = (index, _index)=>{
    let _addons = addons;
    _addons[index].selections = addons[index].selections
        .filter((sel, index) => index !== _index);
    setAddons(_addons);
    setChanging(!changing);
  }
  
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
                Menu - {restaurant?.activeRestaurant?.name}{" "}
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
                  onClick={handleSubmit(onSubmit)}
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
                    { menu.categories &&
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
                    <input
                      id="featured"
                      className="mr-2"
                      type="checkbox"
                      value="Featured"
                      checked={options.includes("Featured")? true: false}
                      {...register("featured", {})}
                    />
                    <label htmlFor="featured">Featured</label>
                  </div>
                  <div>
                    <input
                      id="inStoreOnly"
                      className="mr-2"
                      type="checkbox"
                      value="In Store Only"
                      checked={options.includes("In Store Only")? true: false}
                      {...register("featured", {})}
                    />
                    <label htmlFor="inStoreOnly">In Store Only</label>
                  </div>
                </div>
                <div className="flex items-center gap-[116px] pt-4">
                  <div>
                    <input
                      id="alcohol"
                      className="mr-2"
                      type="checkbox"
                      value="Alcohol"
                      checked={options.includes("Alcohol")? true: false}
                      {...register("featured", {
                        // required: " Sales Rep. is required.",
                      })}
                    />
                    <label htmlFor="alcohol">Alcohol</label>
                  </div>
                  <div>
                    <input
                      id="loyaltyReward"
                      className="mr-2"
                      type="checkbox"
                      value="Loyalty Reward"
                      checked={options.includes("Loyalty Reward")? true: false}
                      {...register("featured", {
                        // required: " Sales Rep. is required.",
                      })}
                    />
                    <label htmlFor="loyaltyReward">Loyalty Reward</label>
                  </div>
                </div>
                <div className="flex items-center gap-10 pt-4">
                  <div>
                    <input
                      id="discountIneligible"
                      className="mr-2"
                      type="checkbox"
                      value="Discount Ineligible"
                      checked={options.includes("Discount Ineligible")? true: false}
                      {...register("featured", {
                        // required: " Sales Rep. is required.",
                      })}
                    />
                    <label htmlFor="discountIneligible">
                      Discount Ineligible
                    </label>
                  </div>
                  <div>
                    <input
                      id="photoHidden"
                      className="mr-2"
                      type="checkbox"
                      value="Photo Hidden"
                      checked={options.includes("Photo Hidden")? true: false}
                      {...register("featured", {
                        onChange: (e) => {
                          if (e.target.checked) {
                            setOptions([...options, e.target.value]);
                          } else {
                            setOptions(
                              options.filter((item) => item !== e.target.value)
                            );
                          }
                        },
                      })}
                    />
                    <label htmlFor="photoHidden">Photo Hidden</label>
                  </div>
                </div>
              </div>

              </form>
            </div>
            <div className="col-span-8">
              <div className="h-auto bg-white w-auto">
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

                  { types.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center gap-5 px-24"
                    >
                      <div>
                        <label htmlFor="" className="text-[12px] text-[#717171]">
                          Title
                        </label>
                        <input
                          type="text"
                          className="input w-full border h-[40.85px] p-3 "
                          defaultValue={item.title}
                          onChange={(e) =>
                            handleType(e.target.value, true, index)
                          }
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
                              className="input w-full focus:outline-none  p-3"
                              defaultValue={item.cost}
                              onChange={(e) =>
                                handleType(e.target.value, false, index)
                              }
                            />
                          </div>
                        </div>
                        <div className="ml-7 mt-5">
                          <img
                            onClick={() => handleRemoveType(index)}
                            className="cursor-pointer"
                            width="22"
                            height="22"
                            src="/img/delete.png"
                            alt="dlt icon"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pt-7 pr-24 pb-10">
                  <button
                    onClick={handleNewProductType}
                    className="border-2 border-[#6FB327] rounded-2xl px-1 py-1 text-[#6FB327]"
                  >
                    + New Product Type
                  </button>
                </div>
              </div>

              <div className="h-auto mt-5 bg-white overflow-x-auto mb-10">
              <div className="flex justify-between items-center px-3 pt-10">
                <div>
                  <p className="text-[#6FB327] border-[1px] border-[#6FB327] py-1 px-3 rounded-full inline-block mr-3">
                    2
                  </p>
                  <p className="inline-block">Product Addons</p>
                </div>
                <div>
                  <button 
                    onClick={AddNewAddon} 
                    className="border-2 border-[#6FB327] rounded-3xl px-1 py-1 text-[#6FB327]">
                    + Add Addon
                  </button>
                </div>
              </div>
              {
                addons.map((addon, index)=>{
                  console.log(addon.name);
                  return(
                    <div key={index} className="border-[1px] mx-10 my-10">
                      <div className="flex  items-center gap-5 px-24 py-10 ">
                        <div>
                          <label htmlFor="" className="text-[12px] text-[#717171]">
                            Name
                          </label>
                          <input
                            type="text"
                            className="input w-full border h-[40.85px] p-3"
                            defaultValue={addon.name}
                            onChange={e=>handleAddons("name", e.target.value, index)}
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
                            type="number"
                            className="input w-[90px] border h-[40.85px] p-3"
                            value={addon.limit}
                            onChange={e=>handleAddons("limit", e.target.value, index)}
                          />
                        </div>
                      </div>
                      <div className="flex gap-3 pl-10 pt-5">
                        <div>
                          <input
                            id={`required${index}`}
                            className="mr-2"
                            type="radio"
                            value="Required"
                            {...register(`opt${index}`, {
                              // required: "Account Manager Name is required.",
                            })}
                          />
                          <label htmlFor={`required${index}`}>Required</label>
                        </div>
                        <div>
                          <input
                            id={`byType${index}`}
                            className="mr-2"
                            type="radio"
                            value="By Type"
                            {...register(`opt${index}`, {
                              // required: "Account Manager Name is required.",
                            })}
                          />
                          <label htmlFor={`byType${index}`}>By Type</label>
                        </div>
                        <div>
                          <input
                            id={`byHalf${index}`}
                            className="mr-2"
                            type="radio"
                            value="By Half"
                            {...register(`opt${index}`, {
                              onChange: e =>{
                                handleAddons("opt", e.target.value, index)
                              }
                            })}
                          />
                          <label htmlFor={`byType${index}`}>By Half</label>
                        </div>
                      </div>
                      <div className="pt-5 pl-9 ">
                        <p className="text-[#6FB327] pb-2">Selections</p>
                        {
                          addon.selections.map((selection, _index)=>(
                            <div key={ _index } className="gap-3">
                            <div className="inline-block my-1 mr-[5px]">
                              <IoMenuSharp className="inline-block mr-[5px] text-2xl" />
                              <div className="inline-block">
                                <label htmlFor="" className="text-[12px] block">
                                  Name
                                </label>
                                <input
                                  type="text"
                                  className="input border w-[166px] h-[40.85px] p-3"
                                  defaultValue={selection.name}
                                  onChange={e=>handleSelections(index, _index, "name", e.target.value)}
                                />
                              </div>
                            </div>
                          {" "}
                            { types.map((type, __index) => {
                              if(type?.title && type?.title.length >0){
                                return(
                                  <div key={__index} className="inline-block my-1 mr-[5px]">
                                  <label
                                    htmlFor=""
                                    className="text-[12px] text-[#717171]"
                                  >
                                    { type.title }
                                  </label>
                                  <div className="border w-[100px] h-[40.85px] flex">
                                    <p className="inline-block px-3 border-r flex justify-center items-center">
                                      $
                                    </p>
                                    <input
                                      type="text"
                                      className="input w-full focus:outline-none p-3"
                                      defaultValue={selection[`${type.title}`]}
                                      onChange={e=>handleSelections(index, _index, `${type.title}`, e.target.value)}
                                    />
                                  </div>
                                </div>
                                )
                              }
                            })}
                            <button className="pt-6 inline-block my-1 mr-[5px]">
                              {" "}
                              <img
                                className=""
                                width="22"
                                height="22"
                                src="/img/24-hours-svgrepo-com 1.png"
                                alt=""
                              />
                            </button>
                            <button className="pt-6 inline-block my-1 mr-[5px]">
                              {" "}
                              <img
                                className=""
                                width="22"
                                height="22"
                                src="/img/24-hours-svgrepo-com 2.png"
                                alt=""
                              />
                            </button>
                            <button className="pt-6 inline-block my-1 mr-[5px]">
                              {" "}
                              <img
                                className=""
                                width="22"
                                height="22"
                                src="/img/24-hours-svgrepo-com 3.png"
                                alt=""
                              />
                            </button>
                            <button className="pt-6 inline-block my-1 mr-[5px]">
                              {" "}
                              <img
                                className=""
                                width="22"
                                height="22"
                                src="/img/delete.png"
                                alt="dlt icon"
                                onClick={()=>removeSelections(index, _index)}
                              />
                            </button>
                          </div>
                          ))
                        }
                      </div>
                      <div className="flex justify-end pr-10 pb-5">
                        <button 
                          onClick={()=>addSelections(index)} 
                          className="border-[#4556AC] text-[#4556AC] py-1 px-1 rounded-2xl text-sm border-[1px]"
                        >
                          + Add Selection
                        </button>
                      </div>
                    </div>
                  )
                })
              }
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
