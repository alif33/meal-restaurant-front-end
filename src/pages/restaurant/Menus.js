import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../../base/Layout";
import AddCategory from "../../components/menu/AddCategory";
import { setCategories } from "../../store/menu/actions";
import { authPost, deleteData } from "../../__lib__/helpers/HttpService";
import ImportData from "../../components/menu/ImportData";
import {
  IoChevronUpOutline,
  IoEllipsisHorizontalSharp,
  IoMenuSharp,
} from "react-icons/io5";
import MenuProduct from "../../components/menu/MenuProduct";
import EditCategoryFrom from "../../components/menu/EditCategoryFrom";
import UpdateMenuProduct from "../../components/menu/UpdateMenuProduct";

const ReatauarantMenuPage = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [categoryModal, setCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [importDataModal, setImportDataModal] = useState(false);
  const { resturant, menu, auth } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategories(resturant.activeResturant?._id));
  }, []);

  const onError = () => {};

  const exportHandler = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(menu.categories)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${resturant.activeResturant.name}.json`;

    link.click();
  };

  const HandleRemoveMenu = () => {
    let _ids = [];
    menu.categories.forEach((___category) => {
      _ids.push(___category._id);
    });
    authPost("/menu/drop", { _ids }, auth.token)
    .then((res) => {
      dispatch(setCategories(resturant.activeResturant?._id));
    });
  };

  const handleCategoryDelete = (_id) => {
    console.log(_id);
    deleteData(`/menu/category?_id=${_id}`, auth.token)
    .then((res) => {

      console.log(res);
      if (res) {
        dispatch(setCategories(resturant.activeResturant?._id));
        toast.success(`${res.message}`);
      }
    });
  };

  const handleProductDelete = (cid, pid) => {
    deleteData(`/menu/product?cid=${cid}&pid=${pid}`, auth.token)
    .then((res) => {
      if (res.success) {
        // dispatch(setCategories(resturant.activeResturant?._id));
        toast.success(`${res.message}`);
      }
    });
  };

  return (
    <Layout status="restaurant">
      {productModal ? (
        <MenuProduct productModal={productModal} setProductModal={setProductModal} />
      ) : (
        <>
          <div className="w-11/12 mx-auto mt-4 border-b-[1px] pb-1">
            <div className="flex justify-between items-center mt-[38px]">
              <div>
                <h1 className="font-light text-[28px]">
                  Menus - {resturant?.activeResturant?.name}{" "}
                </h1>
                <label
                  htmlFor=""
                  className="text-[12px] font-light text-[#A4A4A4] block"
                >
                  Menu | Categories
                </label>
              </div>
              <div className="flex items-center gap-7">
                <div>
                  <button
                    onClick={() => setCategoryModal(!categoryModal)}
                    className="bg-[#6FB327] text-white w-[178.76px] h-[32px] rounded-3xl"
                  >
                    + Add new Category
                  </button>
                </div>
                <div>
                  <img
                    width="27"
                    height="32"
                    className="cursor-pointer img-center"
                    src="/img/import-svgrepo-com 1.png"
                    alt="import avatar"
                    onClick={() => setImportDataModal(true)}
                  />
                  <p
                    htmlFor=""
                    className="text-[12px] font-light text-[#A4A4A4] block text-center"
                  >
                    Import
                  </p>
                </div>

                <div>
                  {" "}
                  <img
                    onClick={exportHandler}
                    className="cursor-pointer img-center"
                    width="23"
                    height="28"
                    src="/img/export-svgrepo-com 1.png"
                    alt="export icon"
                  />
                  <p
                    htmlFor=""
                    className="text-[12px] font-light text-[#A4A4A4] block text-center"
                  >
                    Export
                  </p>
                </div>
                <div>
                  <img
                    className="cursor-pointer img-center"
                    width="27"
                    height="32"
                    src="/img/copy-svgrepo-com 1.png"
                    alt="copy avatar"
                  />
                  <p className="text-[12px] font-light text-[#A4A4A4] block text-center">
                    Copy
                  </p>
                </div>
                <div>
                  <img
                    className="cursor-pointer img-center"
                    width="22"
                    height="27"
                    src="/img/delete.png"
                    onClick={HandleRemoveMenu}
                    alt="delete avatar"
                  />
                  <p className="text-[12px] font-light text-[#A4A4A4] block text-center">
                    Delete
                  </p>
                </div>

                <button className="w-[163px] h-[40px] text-white bg-[#6FB327] rounded-3xl">
                  Complete update
                </button>
              </div>
            </div>
          </div>
          {categoryModal && <AddCategory 
            categoryModal={categoryModal} 
            setCategoryModal={setCategoryModal} 
          />}

          {importDataModal && <ImportData 
            importDataModal={importDataModal} 
            setImportDataModal={setImportDataModal} 
          />}

          {
            menu?.categories &&
            menu?.categories.length > 0 &&
            menu.categories.map((category, index) => (
              <div key={index} className="ml-[72px] mt-[30px] w-[816px]">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <img
                      width="16"
                      height="16"
                      src="/img/menu-order-svgrepo-com 5.png"
                      alt=""
                    />
                    <h2 className="text-[18px] font-normal">{category.name}</h2>
                    <img
                      onClick={() => setEditCategoryModal(category._id)}
                      className="cursor-pointer"
                      width="43.42"
                      height="23"
                      src="/img/Group 71.png"
                      alt=""
                    />
                    <img
                      className="cursor-pointer"
                      onClick={() => handleCategoryDelete(category._id)}
                      width="22"
                      height="22"
                      src="/img/delete.png"
                      alt=""
                    />
                  </div>
                  <button
                    onClick={() => setProductModal(!productModal)}
                    className="bg-[#6FB327] text-white w-[178.76px] h-[32px] rounded-3xl"
                  >
                    + Add new Product
                  </button>
                </div>
                <div className="mt-[10px]">
                  {category.products &&
                    category.products.map((product, _index) => (
                      <div
                        key={_index}
                        className="w-[805px] bg-white shadow-lg p-2 my-2"
                      >
                        <div className="grid grid-cols-12 ">
                          <div className="col-span-11">
                            <div className="flex items-center gap-2 ">
                              <img
                                width="22"
                                height="16"
                                src="/img/menu-order-svgrepo-com 6.png"
                                alt=""
                              />
                              <p className="text-[14px] font-light leading-5">
                                {product.name}
                              </p>
                            </div>

                            <p className="text-[12px] font-light leading-4 pl-[30px] pt-2 pb-2">
                              {product.description}
                            </p>
                          </div>
                          <div className="col-span-1 flex  justify-center items-center">
                            <div className="mr-2">
                              <img
                                onClick={() =>
                                  setUpdateProductModal([category._id, product._id])
                                }
                                className="cursor-pointer "
                                width="43.42"
                                height="23"
                                src="/img/Group 71.png"
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                className="cursor-pointer "
                                width="22"
                                height="22"
                                src="/img/delete.png"
                                alt=""
                                onClick={()=>handleProductDelete(category._id, product._id)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </>
      )}
      
      { updateProductModal && (
          <UpdateMenuProduct
            updateProductModal={updateProductModal}
            setUpdateProductModal={setUpdateProductModal}
          />
      )}

      {editCategoryModal && (
        <EditCategoryFrom
          editCategoryModal={editCategoryModal}
          setEditCategoryModal={setEditCategoryModal}
        />
      )}
    </Layout>
  );
};

export default ReatauarantMenuPage;
