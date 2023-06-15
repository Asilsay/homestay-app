import Layout from '../components/Layout';
import { FC, useEffect, useState } from 'react';
import { data } from '../json/dummyTrip.json';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { useCookies } from 'react-cookie';
import api from '../utils/api';
import { reservType } from '../utils/type';
import LoadingFull from '../components/LoadingFull';

const schemaConfirm = Yup.object().shape({
  status: Yup.object()
    .shape({
      bank: Yup.string().required('status is required'),
    })
    .nullable() // for handling null value when clearing options via clicking "x"
    .required('status is required (from outter null check)'),
});

const ConfirmPay = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [dataPayment, setDataPayment] = useState();
  const [dataReserv, setDataReserv] = useState<reservType>();
  const navigate = useNavigate();

  const MySwal = withReactContent(swal);
  const params = useParams();
  const { reservation_id } = params;

  const [cookie] = useCookies(['token']);
  const ckToken = cookie.token;

  const dateType = (date: any) => {
    const dated: any = new Date(date);
    const formattedDate = dated.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  };

  const formatedPrice = (n: any) => {
    const formattedNumber = n.toLocaleString('en-US', {
      useGrouping: true,
      maximumFractionDigits: 0,
    });
    return formattedNumber;
  };

  const calculateDays = (start: any, end: any): number => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime());
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days;
  };

  const fetchPayment = async () => {
    setLoad(true);
    await api
      .getReservById(ckToken, reservation_id)
      .then(async (response) => {
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
      .finally(() => setLoad(false));
  };

  const formik = useFormik({
    initialValues: {
      bank: '',
    },
    validationSchema: schemaConfirm,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    fetchPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      {load ? (
        <LoadingFull />
      ) : (
        <Layout
          chose="section"
          addClass="bg-base-100 flex flex-col items-center py-16 px-20"
        >
          <div className="w-1/2 items-center text-center">
            <p className="text-4xl font-semibold text-neutral uppercase ">
              Confirmation and Payment
            </p>
            <div className="divider"></div>
          </div>
          <form className="flex flex-col gap-3 w-full mt-3">
            <div className="flex flex-col">
              <div className="w-full">
                <label className="label">
                  <span className="label-text text-[#291334] text-xl">
                    Choose a Bank
                  </span>
                </label>
                <select className="select select-bordered w-full">
                  <option
                    disabled
                    selected
                  >
                    Pick one
                  </option>
                  <option value={'BNI'}>BNI</option>
                  <option value={'BCA'}>BCA</option>
                  <option value={'BRI'}>BRI</option>
                </select>
              </div>
            </div>
            <div className="h-full w-full p-5 justify-between bg-gray-200 rounded-box shadow-md flex flex-row">
              <div className="w-3/6">
                <p className="text-2xl text-neutral font-semibold tracking-wide mb-2">
                  {dataReserv?.homestay_name} :
                </p>
                <div className="flex gap-3 items-center">
                  <div className="w-max h-max rounded-lg p-3 bg-gray-400">
                    {dateType(dataReserv?.checkin_date)}
                  </div>
                  <p className="font-semibold">TO</p>
                  <div className="w-max h-max rounded-lg p-3 bg-gray-400">
                    {dateType(dataReserv?.checkout_date)}
                  </div>
                </div>

                <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
                  Rp{formatedPrice(dataReserv?.homestay_price)} x{' '}
                  {calculateDays(
                    dataReserv?.checkin_date,
                    dataReserv?.checkout_date
                  )}{' '}
                  <span className="font-normal">{` `}Night</span>
                </p>
                <div className="divider w-96 my-1"></div>
                <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
                  Total Rp
                  {formatedPrice(
                    calculateDays(
                      dataReserv?.checkin_date,
                      dataReserv?.checkout_date
                    ) *
                      (dataReserv?.homestay_price
                        ? dataReserv?.homestay_price
                        : 1)
                  )}
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center gap-3">
              <button
                type="submit"
                className="btn btn-primary w-auto text-white"
              >
                Confirm and Pay
              </button>
            </div>
          </form>
        </Layout>
      )}
    </Layout>
  );
};
export default ConfirmPay;
