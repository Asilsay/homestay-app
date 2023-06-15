import Layout from '../components/Layout';
import { FaStar } from 'react-icons/fa';

import { data } from '../json/dummyReviews.json';
import { lazy, Suspense, useEffect, useState } from 'react';

import { Input, InputFile, TextArea } from '../components/Input';
import { Modals } from '../components/Modals';

const LazyCardReviews = lazy(() => import('../components/Card'));

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DetailHomeType } from '../utils/type';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import api from '../utils/api';
import LoadingFull from '../components/LoadingFull';
import toast from '../utils/toast';

const schema = Yup.object().shape({
  name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  price: Yup.number().positive().integer().required('Required'),
});

const schemaImage = Yup.object().shape({
  homestay_picture: Yup.mixed().required('Image is required'),
});

const HostDetail = () => {
  const [dataHome, setDataHome] = useState<DetailHomeType>();
  const [load, setLoad] = useState<boolean>(false);

  const MySwal = withReactContent(swal);
  const MyToast = withReactContent(toast);

  const navigate = useNavigate();
  const params = useParams();
  const { homestay_id } = params;

  const [cookie] = useCookies(['token']);
  const ckToken = cookie.token;

  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formikEditImage.setFieldValue('homestay_picture', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const fetchDetail = async () => {
    setLoad(true);
    await api
      .getHomestayById(ckToken, homestay_id)
      .then(async (response) => {
        const { data } = response.data;
        setDataHome(data);
        formikEdit.setFieldValue('name', data.name);
        formikEdit.setFieldValue('description', data.description);
        formikEdit.setFieldValue('address', data.address);
        formikEdit.setFieldValue('price', data.price);
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

  const formatedPrice = (n: number) => {
    const formattedNumber = n.toLocaleString('en-US', {
      useGrouping: true,
      maximumFractionDigits: 0,
    });
    return formattedNumber;
  };

  const putHomestays = async (datad?: any) => {
    await api
      .putHomestayById(ckToken, homestay_id, datad)
      .then((response) => {
        const { message } = response.data;
        formikEdit.resetForm();
        fetchDetail();
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

  const PostHomestaysImage = async (datad?: any) => {
    await api
      .PostImage(ckToken, homestay_id, datad)
      .then((response) => {
        const { message } = response.data;
        formikEditImage.resetForm();
        fetchDetail();
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

  const formDataToPut = async (datad?: any) => {
    const formData = new FormData();
    formData.append('homestay_picture', datad.homestay_picture);
    await PostHomestaysImage(formData);
  };

  const formikEditImage = useFormik({
    initialValues: {
      homestay_picture: null,
    },
    validationSchema: schemaImage,
    onSubmit: (values) => {
      formDataToPut(values);
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      name: '',
      description: '',
      address: '',
      price: 0,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await putHomestays(values);
    },
  });

  const delHome = async () => {
    await api
      .delHomestayById(ckToken, homestay_id)
      .then((response) => {
        const { message } = response.data;
        navigate('/');

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

  const handleDelHomestays = async () => {
    MySwal.fire({
      icon: 'question',
      title: 'DELETE',
      text: `are you sure delete ?`,
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        delHome();
      }
    });
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
        <>
          <Modals id="modal-edit">
            <form
              onSubmit={formikEdit.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
                Edit Page
              </p>
              <Input
                id="name"
                name="name"
                label="Homestay name"
                type="text"
                value={formikEdit.values.name}
                onChange={formikEdit.handleChange}
                onBlur={formikEdit.handleBlur}
                error={formikEdit.errors.name}
                touch={formikEdit.touched.name}
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
          <Modals id="modal-image-edit">
            <form
              onSubmit={formikEditImage.handleSubmit}
              className="flex flex-col gap-3 items-center"
            >
              <p className="text-secondary font-medium tracking-wide text-2xl mb-3">
                Edit Image
              </p>
              <div className="w-full h-full p-3">
                <img
                  src={
                    preview
                      ? preview
                      : 'https://placehold.co/600x400/png?text=placeholder+image'
                  }
                  alt=""
                  className="w-full h-full object-center object-cover"
                />
              </div>

              <InputFile
                id="homestay_picture"
                name="homestay_picture"
                label="homestay_picture name"
                onChange={handleImageChange}
                onBlur={formikEditImage.handleBlur}
                error={formikEditImage.errors.homestay_picture}
                touch={formikEditImage.touched.homestay_picture}
              />

              <div className="w-full flex justify-end gap-3">
                <div className="modal-action mt-0 ">
                  <label
                    htmlFor="modal-image-edit"
                    className="btn btn-ghost"
                  >
                    Close
                  </label>
                  <button
                    type="submit"
                    className="btn btn-secondary w-32"
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
                <label
                  htmlFor="modal-image-edit"
                  className="absolute btn btn-primary bottom-6 right-6"
                >
                  Edit Image
                </label>
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
                    Rp{dataHome?.price ? formatedPrice(dataHome?.price) : 0}{' '}
                    <span className="font-normal">{` `}Night</span>
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
                      onClick={() => handleDelHomestays()}
                    >
                      Delete Homestay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Layout>
        </>
      )}
    </Layout>
  );
};

export default HostDetail;
