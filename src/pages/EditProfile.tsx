import Layout from '../components/Layout';
import { Input, InputFile } from '../components/Input';

import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import LoadingFull from '../components/LoadingFull';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import toast from '../utils/toast';

const schemaProfile = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('required'),
  fullname: Yup.string().min(6, 'atleat 6 character').required('Required'),
  phone: Yup.string().required('Required'),
  profile_picture: Yup.mixed().required('Image is required'),
});

const schemaPassword = Yup.object().shape({
  old_password: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'password must match')
    .required('Required'),
});

const EditProfile = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const navigate = useNavigate();

  const [cookie, setCookie, removeCookie] = useCookies([
    'user_id',
    'token',
    'pp',
  ]);
  const ckToken = cookie.token;

  const fetchProfile = async () => {
    setLoad(true);
    await api
      .getUserById(ckToken)
      .then((response) => {
        const { data } = response.data;
        formikProfile.setFieldValue('fullname', data.fullname);
        formikProfile.setFieldValue('email', data.email);
        formikProfile.setFieldValue('phone', data.phone);
        formikProfile.setFieldValue('profile_picture', data.profile_picture);
        setPreview(data.profile_picture);
      })
      .catch((error) => {
        const { data } = error.response;
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${data.message}`,
          showCancelButton: false,
        });
      })
      .finally(() => setLoad(false));
  };

  const formikProfile = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      phone: '',
      profile_picture: '',
    },
    validationSchema: schemaProfile,
    onSubmit: async (values) => {
      await formDataToPut(values);
    },
  });

  const formikPassword = useFormik({
    initialValues: {
      password: '',
      old_password: '',
      confirmPassword: '',
    },
    validationSchema: schemaPassword,
    onSubmit: async (values) => {
      await putUsers(values);
    },
  });

  const formDataToPut = async (datad?: any) => {
    const formData = new FormData();
    formData.append('email', datad.email);
    formData.append('fullname', datad.fullname);
    formData.append('phone', datad.phone);
    formData.append('profile_picture', datad.profile_picture);

    await putUsers(formData);
  };

  const putUsers = async (datad?: any) => {
    await console.log(datad);
    await api
      .putUserById(ckToken, datad)
      .then((response) => {
        const { message } = response.data;
        navigate('/profile');

        MyToast.fire({
          icon: 'success',
          title: message,
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

  const delClass = async () => {
    await api
      .delUserById(ckToken)
      .then((response) => {
        const { message } = response.data;

        removeCookie('user_id');
        removeCookie('token');
        navigate('/landing');

        MyToast.fire({
          icon: 'success',
          title: message,
        });
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const handleDelClass = async () => {
    MySwal.fire({
      icon: 'question',
      title: 'DELETE',
      text: `are you sure delete ?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        delClass();
      }
    });
  };

  useEffect(() => {
    fetchProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formikProfile.setFieldValue('profile_picture', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
        <Layout
          chose="section"
          addClass="bg-base-100 flex items-center justify-center"
        >
          <>
            <input
              type="checkbox"
              id="my-modal-3"
              className="modal-toggle"
            />

            {/* Modal */}
            <div className="modal">
              <form
                onSubmit={formikPassword.handleSubmit}
                className="modal-box relative flex flex-col gap-3"
              >
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-error absolute right-2 top-2 text-white"
                >
                  ✕
                </label>
                <div className="w-full">
                  <label
                    htmlFor="old_password"
                    className="label"
                  >
                    <p className="label-text">Old Password: </p>
                  </label>
                  <Input
                    id="old_password"
                    name="old_password"
                    label="type your old password here"
                    type="password"
                    value={formikPassword.values.old_password}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    error={formikPassword.errors.old_password}
                    touch={formikPassword.touched.old_password}
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="label"
                  >
                    <p className="label-text">New Password: </p>
                  </label>
                  <Input
                    id="password"
                    name="password"
                    label="type your new password here"
                    type="password"
                    value={formikPassword.values.password}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    error={formikPassword.errors.password}
                    touch={formikPassword.touched.password}
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="confirmPassword"
                    className="label"
                  >
                    <p className="label-text">Confirm Password: </p>
                  </label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    label="type your confirm password here"
                    type="password"
                    value={formikPassword.values.confirmPassword}
                    onChange={formikPassword.handleChange}
                    onBlur={formikPassword.handleBlur}
                    error={formikPassword.errors.confirmPassword}
                    touch={formikPassword.touched.confirmPassword}
                  />
                </div>

                <div className="flex justify-center mr-4 mt-5">
                  <button
                    type="submit"
                    className="btn btn-wide btn-primary text-white translate-y-1"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </>
          <div className="px-10 py-10">
            <p className="text-[#291334] text-5xl tracking-wider font-bold text-center">
              Edit Profile
            </p>

            <form
              onSubmit={formikProfile.handleSubmit}
              className="flex flex-col mb-20 pt-10"
            >
              <div className="flex w-full">
                <div className="flex flex-col w-3/6 m-3 items-center">
                  <div className="card w-fit h-fit pb-5">
                    <div className="p-1 bg-slate-300 rounded-full">
                      <img
                        src={
                          preview
                            ? preview
                            : 'https://placehold.co/600x400/png?text=placeholder+image'
                        }
                        alt={`User's profile picture`}
                        className="h-52 w-52 border-spacing-1 rounded-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <InputFile
                    id="picture_id"
                    name="picture_id"
                    label="picture_id name"
                    onChange={handleImageChange}
                    onBlur={formikProfile.handleBlur}
                    error={formikProfile.errors.profile_picture}
                    touch={formikProfile.touched.profile_picture}
                  />
                </div>
                <div className="flex flex-col gap-1 w-3/6 m-3">
                  <div className="w-full">
                    <label
                      htmlFor="fullname"
                      className="label"
                    >
                      <p className="label-text">Name: </p>
                    </label>
                    <Input
                      id="fullname"
                      name="fullname"
                      label="type your name here"
                      type="text"
                      value={formikProfile.values.fullname}
                      onChange={formikProfile.handleChange}
                      onBlur={formikProfile.handleBlur}
                      error={formikProfile.errors.fullname}
                      touch={formikProfile.touched.fullname}
                    />
                  </div>
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
                      value={formikProfile.values.email}
                      onChange={formikProfile.handleChange}
                      onBlur={formikProfile.handleBlur}
                      error={formikProfile.errors.email}
                      touch={formikProfile.touched.email}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="phone"
                      className="label"
                    >
                      <p className="label-text">Phone: </p>
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      label="type your phone here"
                      type="text"
                      value={formikProfile.values.phone}
                      onChange={formikProfile.handleChange}
                      onBlur={formikProfile.handleBlur}
                      error={formikProfile.errors.phone}
                      touch={formikProfile.touched.phone}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-row justify-end gap-5 mt-5">
                <button
                  onClick={() => navigate('/profile')}
                  className="btn btn-error text-white px-3 rounded-md text-center text-bold"
                  type="button"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-white px-3 py-2 rounded-md text-center text-bold"
                >
                  Save change
                </button>
              </div>
            </form>

            <div className="flex flex-row justify-center mb-20">
              <div
                onClick={() => handleDelClass()}
                className="btn btn-wide btn-error text-white mr-4"
              >
                Delete Account
              </div>
              <div className="">
                <label
                  className="btn btn-wide btn-primary text-white"
                  htmlFor="my-modal-3"
                >
                  Change password?
                </label>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </Layout>
  );
};
export default EditProfile;
