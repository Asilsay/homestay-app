import image from '../assets/dashboard-imagr.png';
import NavLog from '../assets/loginreg.png';
import { Input } from '../components/Input';
import Layout from '../components/Layout';

import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Landing = () => {
  return (
    <Layout
      chose="section"
      addClass="h-screen bg-gradient-to-br from-neutral to-primary flex justify-center items-center"
    >
      <div className="w-4/5 h-5/6 bg-base-100 rounded-xl flex ">
        <div className="w-2/6 h-full flex flex-col justify-center p-10 gap-2">
          <p className="text-5xl font-semibold">Welcome to HomestayApp</p>
          <p className="font-medium text-base mt-5">
            Where you can experience comfortable and affordable accommodations
          </p>

          <Link
            to="/login"
            id="login"
            className="btn btn-primary mt-6 w-32"
            type="submit"
          >
            Get Started
          </Link>
        </div>
        <div className="w-4/6 h-full bg-base-100 p-10 rounded-r-xl flex flex-col justify-between items-center">
          <div className="h-5/6 w-full flex justify-center">
            <img
              className="w-full h-full object-center object-contain"
              src={image}
              alt=""
            />
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

export default Landing;
