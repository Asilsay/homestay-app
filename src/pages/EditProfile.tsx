import Layout from "../components/Layout";
import user from "../assets/users.png";
import { Modals } from "../components/Modals";
import { data } from "../json/dummyProfile.json";
import { Input, TextArea, InputFile } from "../components/Input";

import { useEffect, lazy, Suspense, useState, MouseEventHandler } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const addSchema = Yup.object().shape({
  email: Yup.string().email("Please enter a valid email").required("required"),
  full_name: Yup.string().min(6, "atleat 6 character").required("Required"),
  password: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  profile_picture: Yup.mixed().required("Image is required"),
});
const EditProfile = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  const formik = useFormik({
    initialValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      profile_picture: "",
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const [cookies] = useCookies();
  console.log(formik.values.full_name);
  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    navigate("/profile");
  };

  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex items-center justify-center"
      >
        <div className="px-10 py-10">
          <p className="text-[#291334] text-5xl tracking-wider font-bold text-center">
            Edit Profile
          </p>
          <form action="" className="flex flex-col mb-20 pt-10">
            <div className="flex flex-row justify-center mb-20">
              <div className="btn btn-wide btn-error text-white mr-4">
                Delete Account
              </div>
              <div className="">
                <label
                  className="btn btn-wide btn-primary text-white"
                  htmlFor="my-modal-3"
                >
                  Change password?
                </label>
                <input
                  type="checkbox"
                  id="my-modal-3"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box relative flex flex-col gap-3">
                    <label
                      htmlFor="my-modal-3"
                      className="btn btn-sm btn-error absolute right-2 top-2 text-white"
                    >
                      ✕
                    </label>
                    <label htmlFor="oldpass" className="text-neutral">
                      Old password :{" "}
                    </label>
                    <input
                      className="input input-bordered input-neutral w-full"
                      type="password"
                      placeholder="old password"
                    />
                    <label htmlFor="newpass" className="text-neutral">
                      New password :{" "}
                    </label>
                    <input
                      className="input input-bordered input-neutral w-full"
                      type="password"
                      placeholder="new password"
                    />
                    <div className="flex justify-center mr-4 mt-5">
                      <button className="btn btn-wide btn-primary text-white translate-y-1">
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <InputFile id="profile_picture" label="Profile Picture" />
            <label htmlFor="" className="text-[#291334]">
              Name
            </label>
            <input
              type="text"
              value={formik.values.full_name}
              className="border-b-2  h-8  mb-5 outline-none"
            />
            <label htmlFor="">Email</label>
            <input
              type="text"
              value={formik.values.email}
              className="border-b-2  h-8 mb-5 outline-none"
            />
            <label htmlFor="">Phone</label>
            <input
              type="text"
              value={formik.values.phone}
              className="border-b-2 h-8 mb-5 outline-none"
            />
            <div className="flex flex-row justify-end gap-5 mt-5">
              <button
                onClick={(e) => handleClose(e)}
                className="btn btn-error text-white px-3 rounded-md text-center text-bold"
              >
                Close
              </button>
              <button className="btn btn-primary text-white px-3 py-2 rounded-md text-center text-bold">
                Save change
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </Layout>
  );
};
export default EditProfile;
