import Layout from '../components/Layout';
import { Modals } from '../components/Modals';
import { data } from '../json/dummyTrip.json';
import { lazy, Suspense } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, TextArea } from '../components/Input';

const TripCard = lazy(() => import('../components/TripCard'));

const addSchema = Yup.object().shape({
  review: Yup.string().required('Required'),
  rating: Yup.number().positive().integer().required('Required'),
});

const TripHistory = () => {
  const formikAdd = useFormik({
    initialValues: {
      review: '',
      rating: 0,
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout chose="layout">
      <Modals id="modal-review">
        <form
          onSubmit={formikAdd.handleSubmit}
          className="flex flex-col gap-5 items-center"
        >
          <p className="text-primary font-medium tracking-wide text-2xl mb-3">
            Add Log
          </p>
          <TextArea
            id="review"
            name="review"
            label="review"
            value={formikAdd.values.review}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            error={formikAdd.errors.review}
            touch={formikAdd.touched.review}
          />

          <Input
            id="rating"
            name="rating"
            label="Rating"
            type="number"
            value={formikAdd.values.rating}
            onChange={formikAdd.handleChange}
            onBlur={formikAdd.handleBlur}
            error={formikAdd.errors.rating}
            touch={formikAdd.touched.rating}
          />

          <div className="w-full flex justify-end gap-3">
            <div className="modal-action mt-0 ">
              <label
                htmlFor="modal-review"
                className="btn btn-ghost"
              >
                Close
              </label>
            </div>
            <button className="btn btn-primary w-32">Submit</button>
          </div>
        </form>
      </Modals>
      <Layout
        chose="section"
        addClass="bg-base-100 flex flex-col  py-16 px-20"
      >
        <p className="text-4xl font-semibold text-neutral uppercase">
          My Reservation
        </p>
        <div className="divider"></div>

        <div className="w-full p-4">
          <Suspense
            fallback={<span className="loading loading-dots loading-md"></span>}
          >
            <div className="grid grid-cols-1 gap-5">
              {data.map((data, idx) => {
                return (
                  <TripCard
                    key={idx}
                    category={data.category}
                    payment_status={data.payment_status}
                    check_in_date={data['check-in_date']}
                    check_out_date={data['check-out_date']}
                    gross_amount={data.gross_amount}
                    price={data.price}
                    quantitiy={data.quantity}
                  />
                );
              })}
            </div>
          </Suspense>
        </div>
      </Layout>
    </Layout>
  );
};

export default TripHistory;
