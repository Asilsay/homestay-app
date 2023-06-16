import React, { useEffect } from "react";
import Layout from "../components/Layout";

import { useFormik } from "formik";
import * as Yup from "yup";
import { InputFile } from "../components/Input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import swal from "../utils/swal";

import { getUsers } from "../utils/type";
import { useCookies } from "react-cookie";
import api from "../utils/api";
import toast from "../utils/toast";
import LoadingFull from "../components/LoadingFull";

const schemaImage = Yup.object().shape({
  profile_picture: Yup.mixed().required("Image is required"),
});

const ValidateHost = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const [dataProfile, setDataProfile] = useState<getUsers>();
  const [load, setLoad] = useState<boolean>(false);

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);
  const navigate = useNavigate();

  const [cookie] = useCookies(["token"]);
  const ckToken = cookie.token;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formikEditImage.setFieldValue("profile_picture", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const fetchProfile = async () => {
    setLoad(true);
    await api
      .getUserById(ckToken)
      .then(async (response) => {
        const { data } = response.data;
        await setDataProfile(data);
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          icon: "error",
          title: "Failed",
          text: `error :  ${data.message}`,
          showCancelButton: false,
        });
      })
      .finally(() => setLoad(false));
  };

  const formDataToPut = async (datad?: any) => {
    const formData = new FormData();
    formData.append("profile_picture", datad.profile_picture);

    await putUsers(formData);
  };

  const putUsers = async (datad?: any) => {
    await api
      .putUserRoleById(ckToken, datad)
      .then((response) => {
        const { message } = response.data;
        navigate("/profile");

        MyToast.fire({
          icon: "success",
          title: message,
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          icon: "error",
          title: "Failed",
          text: `error :  ${data.message}`,
          showCancelButton: false,
        });
      });
  };

  const formikEditImage = useFormik({
    initialValues: {
      profile_picture: null,
    },
    validationSchema: schemaImage,
    onSubmit: async (values) => {
      await formDataToPut(values);
    },
  });

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
        <Layout
          chose="section"
          addClass="bg-base-100 flex flex-col items-center py-16 px-20"
        >
          <div className="w-1/2">
            <p className="text-4xl font-semibold text-neutral uppercase">
              Validate to be Hosting
            </p>
            <div className="divider"></div>
            <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
              Name : &emsp;
              <span className="font-normal">{dataProfile?.fullname}</span>
            </p>
            <div className="flex gap-3 items-end">
              <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
                Role :
              </p>
              <p
                className={`w-16 rounded-full flex items-center justify-center , ${
                  dataProfile?.role !== "user" ? "bg-success" : "bg-warning"
                }`}
              >
                <span className="text-white text-center font-bold">
                  {dataProfile?.role}
                </span>
              </p>
            </div>
          </div>
          <form
            onSubmit={formikEditImage.handleSubmit}
            className="flex flex-col gap-3 items-center w-1/2 mt-3"
          >
            <div className="w-full h-full p-3">
              <img
                src={
                  preview
                    ? preview
                    : "https://placehold.co/600x400/png?text=placeholder+image"
                }
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>

            <InputFile
              id="profile_picture"
              name="profile_picture"
              label="profile picture name"
              onChange={handleImageChange}
              onBlur={formikEditImage.handleBlur}
              error={formikEditImage.errors.profile_picture}
              touch={formikEditImage.touched.profile_picture}
            />

            <div className="w-full flex justify-end gap-3">
              <button type="submit" className="btn btn-primary w-32 text-white">
                Submit
              </button>
            </div>
          </form>
        </Layout>
      )}
    </Layout>
  );
};

export default ValidateHost;
