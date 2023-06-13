import Layout from '../components/Layout';
import { FaStar } from 'react-icons/fa';

import { data } from '../json/dummyReviews.json';
import { lazy, Suspense, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../components/Input';

const LazyCardReviews = lazy(() => import('../components/Card'));

const schemaReservasi = Yup.object().shape({
  start_date: Yup.string().required('Required'),
  end_date: Yup.string().required('Required'),
});

const Detail = () => {
  const [Days, setDays] = useState<number>();

  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        start_date: '',
        end_date: '',
      },
      validationSchema: schemaReservasi,
      onSubmit: (values) => {
        const dayss = calculateDays(values.start_date, values.end_date);
        setDays(dayss);
        console.log(values);
      },
    });

  const calculateDays = (start: string, end: string): number => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days;
  };

  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex flex-col gap-5 justify-center py-16 px-20"
      >
        <div className="w-full h-[500px] flex">
          <div className="w-4/6 bg-cover bg-center">
            <div className="w-full h-full p-3">
              <img
                src="https://placehold.co/600x400/png?text=placeholder+image
              "
                alt=""
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>
          <div className="w-2/6 flex flex-col">
            <div className="h-1/2 w-full bg-cover bg-center">
              <div className="w-full h-full p-3">
                <img
                  src="https://placehold.co/600x400/png?text=placeholder+image
                "
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
            </div>
            <div className="h-1/2 w-full bg-cover bg-center">
              <div className="w-full h-full p-3">
                <img
                  src="https://placehold.co/600x400/png?text=placeholder+image
                "
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>
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
              <form
                onSubmit={handleSubmit}
                className="w-full flex flex-col justify-center"
              >
                <div className="w-full">
                  <label
                    htmlFor="start_date"
                    className="label"
                  >
                    <p className="label-text">Start Date: </p>
                  </label>
                  <Input
                    id="start_date"
                    name="start_date"
                    label="type your Start Date here"
                    type="Date"
                    value={values.start_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.start_date}
                    touch={touched.start_date}
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="end_date"
                    className="label"
                  >
                    <p className="label-text">End Date: </p>
                  </label>
                  <Input
                    id="end_date"
                    name="end_date"
                    label="type your End Date here"
                    type="Date"
                    value={values.end_date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.end_date}
                    touch={touched.end_date}
                  />
                </div>

                <button
                  id="check"
                  className="btn btn-primary mt-3"
                  type="submit"
                >
                  Check availability
                </button>
              </form>
            </div>
            <div className="bg-base-300 rounded-3xl shadow-md p-5">
              <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
                Rp400000 x {Days}{' '}
                <span className="font-normal">{` `}Night</span>
              </p>
              <div className="divider"></div>
              <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
                Rp{Days ? Days * 400000 : 0}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default Detail;
