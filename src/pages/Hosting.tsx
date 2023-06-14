import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { InputFile } from "../components/Input";
import Layout from "../components/Layout";
import hotel from "../assets/Untitled.jpg";

const schemaHosting = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  picture_id: Yup.mixed().required("Image is required"),
});
const schemaImgHosting = Yup.object().shape({
  picture_id: Yup.mixed().required("Image is required"),
});

const Hosting = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      address: "",
      price: "",
      picture_id: "",
    },
    validationSchema: schemaHosting,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const formikEditImage = useFormik({
    initialValues: {
      picture_id: null,
    },
    validationSchema: schemaImgHosting,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formikEditImage.setFieldValue("picture_id", file);
    }
  };
  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex flex-col items-center py-16 px-20"
      >
        <div className="w-1/2 items-center text-center">
          <p className="text-4xl font-semibold text-neutral uppercase ">
            Hosting
          </p>
          <div className="divider"></div>
        </div>
        <form
          onSubmit={formikEditImage.handleSubmit}
          className="flex flex-col gap-3 w-full mt-3"
        >
          <div className="flex flex-row">
            <div className="w-1/2 h-full p-3 gap-10">
              <img
                src={hotel}
                alt=""
                className="w-full h-full object-center object-cover"
              />
              <br />
              <InputFile
                id="picture_id"
                name="picture_id"
                label="picture_id name"
                onChange={handleImageChange}
                onBlur={formikEditImage.handleBlur}
                error={formikEditImage.errors.picture_id}
                touch={formikEditImage.touched.picture_id}
              />
            </div>
            <div className="flex flex-col gap-5 w-1/2">
              <label htmlFor="" className="text-[#291334]">
                Name
              </label>
              <input
                type="text"
                value={formik.values.name}
                className="border-b-2  h-14  mb-5 outline-none"
              />
              <label htmlFor="" className="text-[#291334]">
                Price
              </label>
              <input
                type="text"
                value={formik.values.price}
                className="border-b-2  h-14  mb-5 outline-none"
              />
              <label htmlFor="" className="text-[#291334]">
                Location
              </label>
              <input
                type="text"
                value={formik.values.address}
                className="border-b-2  h-14  mb-5 outline-none"
              />
              <label htmlFor="" className="text-[#291334]">
                Description
              </label>
              <input
                type="textarea"
                value={formik.values.description}
                className="border-b-2  h-14  mb-5 outline-none"
              />
            </div>
          </div>

          <div className="w-full flex justify-center gap-3">
            <button type="submit" className="btn btn-primary w-32 text-white">
              Hosting
            </button>
          </div>
        </form>
      </Layout>
    </Layout>
  );
};
export default Hosting;
