import imageReg from '../assets/register.png';
import NavLog from '../assets/loginreg.png';
import { Input } from '../components/Input';
import Layout from '../components/Layout';

import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  email: Yup.string().email('please enter a valid email').required('Required'),
  full_name: Yup.string().min(6, 'atleat 6 character').required('Required'),
  password: Yup.string().required('Required'),
  phone: Yup.string().required('Required'),
});

const Register = () => {
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
        full_name: '',
        phone: '',
      },
      validationSchema: schema,
      onSubmit: (values) => {
        console.log(values);
      },
    });

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
            Already signed up?{' '}
            <Link
              className="font-medium"
              to={'/login'}
            >
              Log in
            </Link>
          </p>
          <div className="w-full flex flex-col gap-2">
            <div className="w-full">
              <label htmlFor="full_name">
                <p className="label-text">Name: </p>
              </label>
              <Input
                id="full_name"
                name="full_name"
                label="type your Name here"
                type="text"
                value={values.full_name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.full_name}
                touch={touched.full_name}
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
                type="number"
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
            id="login"
            className="btn btn-primary mt-3"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="w-4/6 h-full bg-base-300 p-10 rounded-r-xl flex flex-col justify-between items-center">
          <div className="h-full flex flex-col">
            <div className="h-5/6 w-full flex justify-center ">
              <img
                className="h-full"
                src={imageReg}
                alt=""
              />
            </div>
            <div className=" h-1/6 text-center w-full mt-3">
              <p className="text-xl font-light">Unlock Extraordinary Stays:</p>
              <p className="text-2xl font-semibold">
                Find Your Perfect Home Away from Home
              </p>
            </div>
          </div>

          <img
            className="h-7"
            src={NavLog}
            alt=""
          />
        </div>
      </div>
    </Layout>
  );
};

export default Register;
