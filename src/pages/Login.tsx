import imageLogin from '../assets/login.png';
import withReactContent from 'sweetalert2-react-content';
import swal from 'sweetalert2';
import NavLog from '../assets/loginreg.png';
import { Input } from '../components/Input';
import Layout from '../components/Layout';

import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api from '../utils/api';
import { PostLogin } from '../utils/type';
import { useCookies } from 'react-cookie';

const schema = Yup.object().shape({
  email: Yup.string().email('please enter a valid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const MySwal = withReactContent(swal);
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['user_id', 'email', 'token']);

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: schema,
      onSubmit: (values) => {
        postLogin(values);
      },
    });

  const postLogin = async (code: PostLogin) => {
    await api
      .postLogin(code)
      .then((response) => {
        const { data, message } = response.data;
        MySwal.fire({
          title: 'Success',
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setCookie('user_id', data.user_id, { path: '/' });
            setCookie('email', data.email, { path: '/' });
            setCookie('token', data.token, { path: '/' });
            navigate(`/`);
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
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
          <p className="text-4xl font-semibold">Log in.</p>
          <p className="font-light text-sm">
            Log in with our data that your entered during registration
          </p>
          <div className="w-full">
            <label
              htmlFor="email"
              className="label"
            >
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
            <label
              htmlFor="password"
              className="label"
            >
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

          <button
            id="login"
            className="btn btn-primary mt-3"
            type="submit"
          >
            LOGIN
          </button>
          <p className="text-sm">
            Don't have an account?{' '}
            <Link
              className="font-medium"
              to={'/register'}
            >
              Register here
            </Link>
          </p>
        </form>
        <div className="w-4/6 h-full bg-base-300 p-10 rounded-r-xl flex flex-col justify-between items-center">
          <div className="h-5/6">
            <div className=" h-1/6 text-center w-full">
              <p className="text-xl font-light">Nice To Meet You Again</p>
              <p className="text-4xl font-semibold">WELCOME BACK!</p>
            </div>
            <div className="h-5/6 w-full flex justify-center">
              <img
                className="h-full"
                src={imageLogin}
                alt=""
              />
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

export default Login;
