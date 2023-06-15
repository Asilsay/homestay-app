import Layout from '../components/Layout';
import { Modals } from '../components/Modals';
import { data } from '../json/dummyTrip.json';
import { lazy, Suspense, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextArea } from '../components/Input';
import { FaStar } from 'react-icons/fa';
import api from '../utils/api';
import { useCookies } from 'react-cookie';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { ReadResevType } from '../utils/type';
import LoadingFull from '../components/LoadingFull';

const TripCard = lazy(() => import('../components/TripCard'));

const addSchema = Yup.object().shape({
  review: Yup.string().required('Required'),
  homestay_id: Yup.string().required('Required'),
  rating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must not exceed 5')
    .required('Required'),
});

const TripHistory = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [homestay, setHomestay] = useState<any>([]);
  const [dataReserv, setDataReserv] = useState<ReadResevType[]>([]);
  const [rating, setRating] = useState(0);

  const handleStarClick = (value: any) => {
    setRating(value);
  };
  const MySwal = withReactContent(swal);

  const [cookie] = useCookies(['token', 'pp', 'role']);
  const ckToken = cookie.token;

  const fetchData = async () => {
    await api
      .getAllHomestay(ckToken)
      .then((response) => {
        const { data } = response.data;
        setHomestay(data);
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
  const fetchReservation = async () => {
    setLoading(true);
    await api
      .getAllReservation(ckToken)
      .then((response) => {
        const { data } = response.data;
        setDataReserv(data);
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
      .finally(() => setLoading(false));
  };

  const postReviews = async (data: any) => {
    await api
      .postReview(ckToken, data)
      .then((response) => {
        const { message } = response.data;
        fetchReservation();
        MySwal.fire({
          title: 'Success',
          text: message,
          showCancelButton: false,
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

  const formikAdd = useFormik({
    initialValues: {
      review: '',
      rating: 0,
      homestay_id: '',
    },
    validationSchema: addSchema,
    onSubmit: (values) => {
      postReviews(values);
    },
  });

  const handlerClick = (str?: string) => {
    const id = getHomestays_id(str);
    formikAdd.setFieldValue('homestay_id', id);
  };

  const getHomestays_id = (name?: string) => {
    const dataItem = homestay.find((item: any) => item.name === name);
    return dataItem?.homestay_id;
  };

  useEffect(() => {
    fetchReservation();
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {loading ? (
        <LoadingFull />
      ) : (
        <>
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
                fallback={
                  <span className="loading loading-dots loading-md"></span>
                }
              >
                <div className="grid grid-cols-1 gap-5">
                  {dataReserv.map((data, idx) => {
                    return (
                      <TripCard
                        key={idx}
                        homestay_name={data.homestay_name}
                        payment_status={data.status}
                        checkin_date={data.checkin_date}
                        checkout_date={data.checkout_date}
                        amount={data.amount}
                        homestay_price={data.homestay_price}
                        duration={data.duration}
                        bank_account={data.bank_account}
                        va_number={data.va_number}
                        reservation_id={data.reservation_id}
                        onCLick={() => handlerClick(data.homestay_name)}
                      />
                    );
                  })}
                </div>
              </Suspense>
            </div>
          </Layout>
        </>
      )}
    </Layout>
  );
};

export default TripHistory;
