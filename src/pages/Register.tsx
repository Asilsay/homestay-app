import imageReg from "../assets/register.png";
import withReactContent from "sweetalert2-react-content";
import swal from "../utils/swal";
import NavLog from "../assets/loginreg.png";
import { Input } from "../components/Input";
import Layout from "../components/Layout";

import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../utils/api";
import { PostRegis } from "../utils/type";

const schema = Yup.object().shape({
  email: Yup.string().email("please enter a valid email").required("Required"),
  fullname: Yup.string().min(6, "atleat 6 character").required("Required"),
  password: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
});

const Register = () => {
  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        fullname: "",
        phone: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        postRegis(values);
      },
    });

  const postRegis = async (code: PostRegis) => {
    await api
      .postRegister(code)
      .then((response) => {
        const { message } = response.data;
        MySwal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/login`);
          }
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

  return (
    <Layout
      chose="section"
      addClass="h-screen bg-gradient-to-br from-neutral to-primary flex justify-center items-center"
    >
      <div className="w-4/5 h-5/6 bg-base-100 rounded-xl flex ">
        <form
          onSubmit={handleSubmit}
          className="w-2/6 h-full flex flex-col justify-center p-10 gap-2"
        >
          <p className="text-2xl font-semibold">Create an account</p>
          <p className="text-sm">
            Already signed up?{" "}
            <Link className="font-medium" to={"/login"}>
              Log in
            </Link>
          </p>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full">
              <label htmlFor="fullname">
                <p className="label-text">Name: </p>
              </label>
              <Input
                id="fullname"
                name="fullname"
                label="type your Name here"
                type="text"
                value={values.fullname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.fullname}
                touch={touched.fullname}
              />
            </div>
            <div className="w-full">
              <label htmlFor="phone">
                <p className="label-text">Phone: </p>
              </label>
              <Input
                id="phone"
                name="phone"
                label="type your phone here"
                type="text"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touch={touched.phone}
              />
            </div>
            <div className="w-full ">
              <label htmlFor="email">
                <p className="label-text">Email: </p>
              </label>
              <Input
                id="email"
                name="email"
                label="type your email here"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touch={touched.email}
              />
            </div>
            <div className="w-full">
              <label htmlFor="password">
                <p className="label-text">Password: </p>
              </label>
              <Input
                id="password"
                name="password"
                label="type your password here"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touch={touched.password}
              />
            </div>
          </div>

          <button
            id="signup"
            className="btn btn-primary mt-3 text-white"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="w-4/6 h-full bg-base-300 p-10 rounded-r-xl flex flex-col justify-between items-center">
          <div className="h-full flex flex-col">
            <div className="h-5/6 w-full flex justify-center ">
              <img className="h-full" src={imageReg} alt="" />
            </div>
            <div className=" h-1/6 text-center w-full mt-3">
              <p className="text-xl font-light">Unlock Extraordinary Stays:</p>
              <p className="text-2xl font-semibold">
                Find Your Perfect Home Away from Home
              </p>
            </div>
          </div>

          <img className="h-7" src={NavLog} alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
