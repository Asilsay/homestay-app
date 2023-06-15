import Layout from '../components/Layout';
import { Modals } from '../components/Modals';
import { data } from '../json/dummyTrip.json';
import { lazy, Suspense, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextArea } from '../components/Input';
import { FaStar } from 'react-icons/fa';

const TripCard = lazy(() => import('../components/TripCard'));

const addSchema = Yup.object().shape({
  review: Yup.string().required('Required'),
  rating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must not exceed 5')
    .required('Required'),
});

const TripHistory = () => {
  const [rating, setRating] = useState(0);
  const handleStarClick = (value: any) => {
    setRating(value);
  };

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
            Add Review
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

          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={`mr-1 ${
                  rating >= value ? 'text-warning' : 'text-base-300'
                }`}
                onClick={() => {
                  handleStarClick(value);
                  formikAdd.setFieldValue('rating', value);
                  formikAdd.setFieldTouched('rating', true);
                }}
                type="button"
              >
                <FaStar />
              </button>
            ))}
            <span>{rating}</span>
          </div>
          {formikAdd.touched.rating && formikAdd.errors.rating && (
            <div className="text-error">{formikAdd.errors.rating}</div>
          )}
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
                    homestay_name={data.category}
                    payment_status={data.payment_status}
                    checkin_date={data['check-in_date']}
                    checkout_date={data['check-out_date']}
                    amount={data.gross_amount}
                    homestay_price={data.price}
                    duration={data.quantity}
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
