import Layout from "../components/Layout";
import { FC } from "react";
import { data } from "../json/dummyTrip.json";

import { useFormik } from "formik";
import * as Yup from "yup";

interface Props {
  category?: string;
  price?: number;
  quantitiy?: number;
  gross_amount?: number;
  check_in_date?: string;
  check_out_date?: string;
  payment_status?: string;
}

const schemaConfirm = Yup.object().shape({
  status: Yup.object()
    .shape({
      bank: Yup.string().required("status is required"),
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required("status is required (from outter null check)"),
});
const ConfirmPay = () => {
  const formik = useFormik({
    initialValues: {
      bank: "",
    },
    validationSchema: schemaConfirm,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex flex-col items-center py-16 px-20"
      >
        <div className="w-1/2 items-center text-center">
          <p className="text-4xl font-semibold text-neutral uppercase ">
            Confirmation and Payment
          </p>
          <div className="divider"></div>
        </div>
        <form className="flex flex-col gap-3 w-full mt-3">
          <div className="flex flex-col">
            <div className="w-full">
              <label className="label">
                <span className="label-text text-[#291334] text-xl">
                  Choose a Bank
                </span>
              </label>
              <select className="select select-bordered w-full">
                <option disabled selected>
                  Pick one
                </option>
                <option value={"BNI"}>BNI</option>
                <option value={"BCA"}>BCA</option>
                <option value={"BRI"}>BRI</option>
                <option value={"Mandiri"}>Mandiri</option>
                <option value={"Permata"}>Permata</option>
              </select>
            </div>
          </div>
          <div className="h-full w-full p-5 justify-between bg-gray-200 rounded-box shadow-md flex flex-row">
            <div className="w-3/6">
              <p className="text-2xl text-neutral font-semibold tracking-wide mb-2">
                Villa Premium A3:
              </p>
              <div className="flex gap-3">
                <div className="w-max h-max rounded-lg p-3 bg-gray-400">
                  2023/06/05 08:05
                </div>
                <div className="w-max h-max rounded-lg p-3 bg-gray-400">
                  2023/08/05 08:05
                </div>
              </div>

              <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
                Rp{100} x {2} <span className="font-normal">{` `}Night</span>
              </p>
              <div className="divider w-96 my-1"></div>
              <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
                Total Rp{200}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center gap-3">
            <button type="submit" className="btn btn-primary w-auto text-white">
              Confirm and Pay
            </button>
          </div>
        </form>
      </Layout>
    </Layout>
  );
};
export default ConfirmPay;
