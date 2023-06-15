import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { useNavigate } from 'react-router-dom';

import { Input, InputFile } from '../components/Input';
import Layout from '../components/Layout';
import api from '../utils/api';
import toast from '../utils/toast';

const schemaHosting = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  price: Yup.number().required('Required'),
  homestay_picture: Yup.mixed().required('Image is required'),
});

const Hosting = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);
  const navigate = useNavigate();
  const [cookie, ,] = useCookies(['user_id', 'token', 'pp']);
  const ckToken = cookie.token;
  const formDataToPost = async (datad?: any) => {
    const formData = new FormData();
    formData.append('name', datad.name);
    formData.append('description', datad.description);
    formData.append('address', datad.address);
    formData.append('price', datad.price);
    formData.append('homestay_picture', datad.homestay_picture);
    await postHosting(formData);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      address: '',
      price: '',
      homestay_picture: '',
    },
    validationSchema: schemaHosting,
    onSubmit: async (values) => {
      await formDataToPost(values);
    },
  });
  const postHosting = async (datad?: any) => {
    await api
      .addHosting(ckToken, datad)
      .then((response) => {
        const { message } = response.data;
        navigate('/');

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
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue('homestay_picture', file);
      setPreview(URL.createObjectURL(file));
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
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-3 w-full mt-3"
        >
          <div className="flex flex-row">
            <div className="w-1/2 h-full p-3 gap-10">
              <img
                src={
                  preview
                    ? preview
                    : 'https://placehold.co/600x400/png?text=placeholder+image'
                }
                alt={`Homestay's picture`}
                className="h-full w-full border-spacing-1 object-cover object-center"
              />
              <br />
              <InputFile
                id="homestay picture"
                name="homestay picture"
                label="homestay picture"
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
                error={formik.errors.homestay_picture}
                touch={formik.touched.homestay_picture}
              />
            </div>
            <div className="flex flex-col gap-5 w-1/2">
              <label
                htmlFor=""
                className="text-[#291334]"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                label="type the name here"
                type="text"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.name}
                touch={formik.touched.name}
              />
              <label
                htmlFor=""
                className="text-[#291334]"
              >
                Price
              </label>
              <Input
                id="price"
                name="price"
                label="type the price here"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.price}
                touch={formik.touched.price}
              />
              <label
                htmlFor=""
                className="text-[#291334]"
              >
                Location
              </label>
              <Input
                id="address"
                name="address"
                label="type the address here"
                type="text"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.address}
                touch={formik.touched.address}
              />
              <label
                htmlFor=""
                className="text-[#291334]"
              >
                Description
              </label>
              <Input
                id="description"
                name="description"
                label="type the description here"
                type="text"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.description}
                touch={formik.touched.description}
              />
            </div>
          </div>

          <div className="w-full flex justify-center gap-3">
            <button
              type="submit"
              className="btn btn-primary w-32 text-white"
            >
              Hosting
            </button>
          </div>
        </form>
      </Layout>
    </Layout>
  );
};
export default Hosting;
