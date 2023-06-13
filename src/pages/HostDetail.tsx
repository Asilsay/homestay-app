import Layout from '../components/Layout';
import { FaStar } from 'react-icons/fa';

import { data } from '../json/dummyReviews.json';
import { lazy, Suspense, useState } from 'react';

import { Input, TextArea } from '../components/Input';
import { Modals } from '../components/Modals';

const LazyCardReviews = lazy(() => import('../components/Card'));

import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  title: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  price: Yup.number().positive().integer().required('Required'),
});

const HostDetail = () => {
  const formikEdit = useFormik({
    initialValues: {
      title: '',
      description: '',
      address: '',
      price: 0,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout chose="layout">
      <Modals id="modal-edit">
        <form
          onSubmit={formikEdit.handleSubmit}
          className="flex flex-col gap-3 items-center"
        >
          <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
            Edit Page
          </p>
          <Input
            id="title"
            name="title"
            label="Title name"
            type="text"
            value={formikEdit.values.title}
            onChange={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}
            error={formikEdit.errors.title}
            touch={formikEdit.touched.title}
          />
          <TextArea
            id="description"
            name="description"
            label="Description"
            value={formikEdit.values.description}
            onChange={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}
            error={formikEdit.errors.description}
            touch={formikEdit.touched.description}
          />
          <Input
            id="address"
            name="address"
            label="Address"
            type="text"
            value={formikEdit.values.address}
            onChange={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}
            error={formikEdit.errors.address}
            touch={formikEdit.touched.address}
          />
          <Input
            id="price"
            name="price"
            label="price"
            type="number"
            value={formikEdit.values.price}
            onChange={formikEdit.handleChange}
            onBlur={formikEdit.handleBlur}
            error={formikEdit.errors.price}
            touch={formikEdit.touched.price}
          />
          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
              <label
                htmlFor="modal-edit"
                className="btn btn-ghost"
              >
                Close
              </label>
              <button
                type="submit"
                className="btn btn-secondary w-32"
                onClick={() => {
                  const modalCheckbox = document.getElementById(
                    'modal-edit'
                  ) as HTMLInputElement;
                  if (modalCheckbox) {
                    modalCheckbox.checked = false;
                  }
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </Modals>
      <Layout
        chose="section"
        addClass="bg-base-100 flex flex-col justify-center py-16 px-20"
      >
        <div className="w-full h-[500px] flex">
          <div className="w-4/6 relative bg-cover bg-center">
            <div className="w-full h-full p-3">
              <img
                src="https://placehold.co/600x400/png?text=placeholder+image
              "
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
            <button className="absolute btn btn-primary bottom-6 right-6">
              Edit Image
            </button>
          </div>
          <div className="w-2/6 flex flex-col">
            <div className="h-1/2 w-full relative bg-cover bg-center">
              <div className="w-full h-full p-3">
                <img
                  src="https://placehold.co/600x400/png?text=placeholder+image
                "
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <button className="absolute btn btn-primary bottom-6 right-6">
                Edit Image
              </button>
            </div>
            <div className="h-1/2 w-full relative bg-cover bg-center">
              <div className="w-full h-full p-3">
                <img
                  src="https://placehold.co/600x400/png?text=placeholder+image
                "
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <button className="absolute btn btn-primary bottom-6 right-6">
                Edit Image
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex">
          <div className="w-4/6 p-3">
            <p className="text-4xl font-semibold text-neutral uppercase">
              Homestay Premium A3
            </p>
            <div className="divider"></div>
            <p className="text-xl font-semibold text-neutral capitalize">
              2 Guest - 1 Bedroom - 1 Bed - Bath Pool - Wifi - Kitchen
            </p>
            <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
              Location: <span className="font-normal"> Nusa Penida, Bali</span>
            </p>
            <div className="divider"></div>
            <div className="text-xl flex items-center font-semibold text-neutral capitalize mt-3 ">
              <FaStar />
              <p> &ensp;4.8 - 2 Reviews</p>
            </div>
            <div className="w-full p-4">
              <Suspense
                fallback={
                  <span className="loading loading-dots loading-md"></span>
                }
              >
                <div className="grid  grid-cols-1 gap-5">
                  {data.map((data, idx) => {
                    return (
                      <LazyCardReviews
                        full_name={data.username}
                        key={idx}
                        rating={data.rating}
                        review={data.review}
                        user_picture={data.user_picture}
                      />
                    );
                  })}
                </div>
              </Suspense>
            </div>
          </div>

          <div className="w-2/6 p-3 h-full flex flex-col gap-5">
            <div className="bg-base-300 rounded-3xl shadow-md p-5">
              <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
                Rp400000 <span className="font-normal">{` `}Night</span>
              </p>
              <div className="divider"></div>
              <div className="w-full flex flex-col justify-center">
                <label
                  id="check"
                  className="btn btn-primary mt-3"
                  htmlFor="modal-edit"
                >
                  Edit Homestay
                </label>
                <button
                  id="check"
                  className="btn btn-error btn-outline mt-3"
                  type="button"
                >
                  Delete Homestay
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default HostDetail;
