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
const Profile = () => {
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

  const handleEdit: MouseEventHandler<HTMLButtonElement> = () => {
    navigate("/editprofile");
  };
  const handleValidate: MouseEventHandler<HTMLButtonElement> = () => {
    navigate("/validate");
  };

  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex items-center justify-center"
      >
        <div className="flex">
          <div className="flex flex-col">
            <div className="flex flex-row pb-10">
              <p className="text-[#291334] text-5xl tracking-wider font-bold text-center">
                Profile
              </p>
              <div className="w-16 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <div className="text-white text-center font-bold">Default</div>
              </div>
            </div>
            <div className="card w-fit h-fit pb-5">
              <div className="p-1 bg-slate-300  rounded-full">
                <img
                  src={user}
                  alt={`User's profile picture`}
                  className="h-72 w-72 border-spacing-1 rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center pb-5">
              <div>
                <p className="font-bold text-2xl dark:text-white">
                  {"Rahman Kamil"}
                </p>
              </div>
              <div>
                <p className="font-bold text-lg dark:text-white">
                  {"email@email.com"}
                </p>
              </div>
              <div className="flex w-full pb-5">
                <button
                  onClick={handleEdit}
                  className="btn btn-primary w-36 text-white"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleValidate}
                  className="btn btn-primary w-36 text-white"
                >
                  Become Hoster
                </button>
              </div>
            </div>
            <div className="w-3/4 h-full">
              <div className="h-screen bg-gray-100 flex justify-center">
                <div className="w-3/4">
                  <div className="mt-5">
                    <label htmlFor="user" className="label">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="user"
                      name="full_name"
                      placeholder="Full Name"
                      value={formik.values.full_name}
                      onChange={formik.handleChange}
                      required
                      className="input input-bordered input-warning w-full bg-gray-100"
                    />
                  </div>

                  <div className="mt-5">
                    <label className="label">
                      <span className="label-text">Your Email</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className=" input input-bordered input-warning w-full bg-gray-100"
                    />
                  </div>
                  <div className="mt-5">
                    <label className="label">
                      <span className="label-text">Your Phone</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className=" input input-bordered input-warning w-full bg-gray-100"
                    />
                  </div>
                  <div className="mt-5 font-bold flex justify-end">
                    <button className="btn btn-warning mb-5 text-white">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};
export default Profile;
