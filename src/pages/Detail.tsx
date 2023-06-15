import Layout from '../components/Layout';
import { FaStar } from 'react-icons/fa';

import { data } from '../json/dummyReviews.json';
import { lazy, Suspense, useState, useEffect } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input } from '../components/Input';
import { DataReserveType, DetailHomeType } from '../utils/type';
import withReactContent from 'sweetalert2-react-content';
import { useNavigate, useParams } from 'react-router-dom';
import swal from '../utils/swal';
import { useCookies } from 'react-cookie';
import api from '../utils/api';
import LoadingFull from '../components/LoadingFull';

const LazyCardReviews = lazy(() => import('../components/Card'));

const schemaReservasi = Yup.object().shape({
  checkin_date: Yup.date()
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      'Start date cannot be before today'
    )
    .required('Start date is required'),
  checkout_date: Yup.date()
    .min(Yup.ref('checkin_date'), 'End date must be after start date')
    .test(
      'is-after-checkin',
      'End date must be at least one day after start date',
      function (value) {
        const checkinDate: any = this.resolve(Yup.ref('checkin_date'));
        const minimumCheckoutDate = new Date(checkinDate);
        minimumCheckoutDate.setDate(checkinDate.getDate() + 1);
        return !checkinDate || !value || value >= minimumCheckoutDate;
      }
    )
    .required('Check-out date is required'),
});

const Detail = () => {
  const [dataHome, setDataHome] = useState<DetailHomeType>();
  const [checkReserv, setCheckReserv] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(false);
  const [dataReserv, setDataReserv] = useState<DataReserveType>();
  const navigate = useNavigate();

  const MySwal = withReactContent(swal);
  const params = useParams();
  const { homestay_id } = params;

  const [cookie] = useCookies(['token']);
  const ckToken = cookie.token;

  const formikDate = useFormik({
    initialValues: {
      checkin_date: '',
      checkout_date: '',
    },
    validationSchema: schemaReservasi,
    onSubmit: async (values) => {
      const check = {
        homestay_id: homestay_id,
        checkin_date: values.checkin_date,
        checkout_date: values.checkout_date,
      };
      await PostCheck(check);
    },
  });

  const fetchDetail = async () => {
    setLoad(true);
    await api
      .getHomestayById(ckToken, homestay_id)
      .then(async (response) => {
        const { data } = response.data;
        setDataHome(data);
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

  const PostCheck = async (code: any) => {
    await api
      .postCheckReservation(ckToken, code)
      .then((response) => {
        const { message } = response.data;
        setDataReserv(code);
        MySwal.fire({
          title: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            if (message === 'Available') {
              setCheckReserv(true);
            }
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

  const PostReserv = async (code: any) => {
    await api
      .postReserv(ckToken, code)
      .then((response) => {
        const { data, message } = response.data;
        console.log(data);
        MySwal.fire({
          title: 'Success',
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/confirm/${data.reservation_id}`);
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

  const formatedPrice = (n: number) => {
    const formattedNumber = n.toLocaleString('en-US', {
      useGrouping: true,
      maximumFractionDigits: 0,
    });
    return formattedNumber;
  };

  useEffect(() => {
    fetchDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
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
                {dataHome?.name}
              </p>
              <div className="divider"></div>
              <p className="text-xl font-semibold text-neutral capitalize">
                {dataHome?.description}
              </p>
              <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
                Location:{' '}
                <span className="font-normal">{dataHome?.address}</span>
              </p>
              <div className="divider"></div>
              <div className="text-xl flex items-center font-semibold text-neutral capitalize mt-3 ">
                <FaStar />
                <p> &ensp;4 - 2 Reviews</p>
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
                  Rp{dataHome?.price ? formatedPrice(dataHome?.price) : 0}{' '}
                  <span className="font-normal">{` `}Night</span>
                </p>
                <div className="divider"></div>
                <form
                  onSubmit={formikDate.handleSubmit}
                  className="w-full flex flex-col justify-center"
                >
                  <div className="w-full">
                    <label
                      htmlFor="checkin_date"
                      className="label"
                    >
                      <p className="label-text">Start Date: </p>
                    </label>
                    <Input
                      id="checkin_date"
                      name="checkin_date"
                      label="type your Start Date here"
                      type="Date"
                      value={formikDate.values.checkin_date}
                      onChange={formikDate.handleChange}
                      onBlur={formikDate.handleBlur}
                      error={formikDate.errors.checkin_date}
                      touch={formikDate.touched.checkin_date}
                      disabled={checkReserv}
                    />
                  </div>
                  <div className="w-full">
                    <label
                      htmlFor="checkout_date"
                      className="label"
                    >
                      <p className="label-text">End Date: </p>
                    </label>
                    <Input
                      id="checkout_date"
                      name="checkout_date"
                      label="type your End Date here"
                      type="Date"
                      value={formikDate.values.checkout_date}
                      onChange={formikDate.handleChange}
                      onBlur={formikDate.handleBlur}
                      error={formikDate.errors.checkout_date}
                      touch={formikDate.touched.checkout_date}
                      disabled={checkReserv}
                    />
                  </div>
                  {!checkReserv ? (
                    <button
                      id="check"
                      className="btn btn-primary mt-3"
                      type="submit"
                    >
                      Check availability
                    </button>
                  ) : (
                    <></>
                  )}
                </form>
              </div>
              {checkReserv ? (
                <div className="bg-base-300 rounded-3xl shadow-md p-5 flex gap-3 justify-center">
                  <button
                    id="check"
                    className="btn btn-primary btn-outline mt-3 w-[45%]"
                    onClick={() => setCheckReserv(false)}
                  >
                    Back
                  </button>
                  <button
                    id="check"
                    className="btn btn-primary mt-3 w-[45%]"
                    onClick={() => PostReserv(dataReserv)}
                  >
                    Make Reservation
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </Layout>
      )}
    </Layout>
  );
};

export default Detail;
