import Layout from '../components/Layout';
import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { useCookies } from 'react-cookie';
import api from '../utils/api';
import { reservType } from '../utils/type';
import LoadingFull from '../components/LoadingFull';
import toast from '../utils/toast';
import { Select } from '../components/Input';

const schemaConfirm = Yup.object().shape({
  bank_account: Yup.string().required('status is required'),
  reservation_id: Yup.string().required('status is required'),
  amount: Yup.string().required('status is required'),
});

const ConfirmPay = () => {
  const [load, setLoad] = useState<boolean>(false);
  const [dataReserv, setDataReserv] = useState<reservType>();
  const navigate = useNavigate();

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);
  const params = useParams();
  const { reservation_id } = params;

  const [cookie, ,] = useCookies(['token']);
  const ckToken = cookie.token;

  // const formDataToPost = async (datad?: any) => {
  //   const formData = new FormData();
  //   formData.append("bank_account", datad.bank_account);
  //   formData.append("reservation_id", datad.reservation_id);
  //   formData.append("amount", datad.amount);
  //   await postPay(formData);
  // };

  const dateType = (date: any) => {
    const dated: any = new Date(date);
    const formattedDate = dated.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
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
        console.log(data);
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
      bank_account: '',
      reservation_id: '',
      amount: '',
    },
    validationSchema: schemaConfirm,
    onSubmit: (values) => {
      postPay(values);
    },
  });

  const postPay = async (datapay: any) => {
    setLoad(true);
    await api
      .postPayment(ckToken, datapay)
      .then((response) => {
        const { message } = response.data;
        navigate('/trip');

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
      })
      .finally(() => setLoad(false));
  };

  useEffect(() => {
    fetchPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    formik.setFieldValue('amount', dataReserv?.amount.toString());
    formik.setFieldValue('reservation_id', reservation_id);
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
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 w-full mt-3"
          >
            <div className="flex flex-col">
              <div className="w-full">
                <label className="label">
                  <span className="label-text text-[#291334] text-xl">
                    Choose a Bank
                  </span>
                </label>
                <Select
                  id="bank_account"
                  name="bank_account"
                  label="Bank"
                  value={formik.values.bank_account}
                  onChangeSelect={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.errors.bank_account}
                  touch={formik.touched.bank_account}
                >
                  <option value="bri">BRI</option>
                  <option value="bca">BCA</option>
                  <option value="bni">BNI</option>
                </Select>
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
                  Rp{dataReserv?.homestay_price} x{' '}
                  {calculateDays(
                    dataReserv?.checkin_date,
                    dataReserv?.checkout_date
                  )}{' '}
                  <span className="font-normal">{` `}Night</span>
                </p>
                <div className="divider w-96 my-1"></div>
                <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
                  Total Rp
                  {dataReserv?.amount}
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
