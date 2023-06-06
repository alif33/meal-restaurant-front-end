import React, { useState } from "react";
import { useSelector } from "react-redux";
import Layout from "../../base/Layout";
import AddPaymentForm from "../../components/AddPaymentForm";
import PaidStatements from "../../components/PaidStatements";
import UnpaidStatements from "../../components/UnpaidStatements";

const Statements = () => {

  const [addPaymentForm, setAddPaymentForm] = useState(false);
  const [tapList, setTapList] = useState(true);
  const { admin, resturant } = useSelector((state) => state);

  return (

    <Layout>
      <div className="w-[98%] mx-auto mt-4">
        <div className="flex justify-between items-center ">
          <h1 className=" text-[#212121] text-[26px] font-mono ">
            Statements - {resturant?.activeResturant?.name}
          </h1>
          {tapList === true ? (
            <button
              onClick={() => setAddPaymentForm(!addPaymentForm)}
              className="bg-[#00c220] border border-solid border-[#00c220] rounded-3xl flex justify-between items-center text-white py-2 px-4 text-sm font-mono hover:bg-transparent transition-all duration-300 ease-in-out focus:outline-none active:outline-none  hover:text-black cursor-pointer"
            >
              Add Payment
            </button>
          ) : (
            <p className="font-light text-[32px]">
              Total: <span>588.8 A$</span>
            </p>
          )}
        </div>
        <ul className="w-full border-b border-solid border-[#c7c7c7] flex items-center  ">
          <li>
            <button
              onClick={() => setTapList(true)}
              className={`border-b-2 bg-transparent border-solid py-4 mr-4 text-sm ${
                tapList
                  ? "border-b-[#00c220] text-[#00c220] "
                  : "border-b-transparent text-[#999999] "
              } `}
            >
              Unpaid Statements
            </button>
          </li>
          <li>
            <button
              onClick={() => setTapList(false)}
              className={`border-b-2 bg-transparent border-solid py-4 mr-4 text-sm ${
                !tapList
                  ? "border-b-[#00c220] text-[#00c220] "
                  : "border-b-transparent text-[#999999] "
              } `}
            >
              Paid Statements
            </button>
          </li>
        </ul>

        {tapList && <UnpaidStatements />}
        {!tapList && <PaidStatements />}
        {addPaymentForm && (
          <AddPaymentForm
            addPaymentForm={addPaymentForm}
            setAddPaymentForm={setAddPaymentForm}
          />
        )}
      </div>
    </Layout>
  );
};

export default Statements;