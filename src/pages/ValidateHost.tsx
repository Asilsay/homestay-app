import React from 'react';
import Layout from '../components/Layout';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, InputFile, TextArea } from '../components/Input';
import { useState } from 'react';

const schemaImage = Yup.object().shape({
  picture_id: Yup.mixed().required('Image is required'),
});

const ValidateHost = () => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formikEditImage.setFieldValue('picture_id', file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const formikEditImage = useFormik({
    initialValues: {
      picture_id: null,
    },
    validationSchema: schemaImage,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex flex-col items-center py-16 px-20"
      >
        <div className="w-1/2">
          <p className="text-4xl font-semibold text-neutral uppercase">
            Validate to be Hosting
          </p>
          <div className="divider"></div>
          <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
            Name : &emsp;<span className="font-normal">Rahman Kamil</span>
          </p>
          <p className="text-xl font-semibold text-neutral capitalize mt-3 ">
            Role : &emsp;
            <span className="font-normal badge badge-warning p-3">
              {' '}
              Default
            </span>
          </p>
        </div>
        <form
          onSubmit={formikEditImage.handleSubmit}
          className="flex flex-col gap-3 items-center w-1/2 mt-3"
        >
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
            id="picture_id"
            name="picture_id"
            label="picture_id name"
            onChange={handleImageChange}
            onBlur={formikEditImage.handleBlur}
            error={formikEditImage.errors.picture_id}
            touch={formikEditImage.touched.picture_id}
          />

          <div className="w-full flex justify-end gap-3">
            <button
              type="submit"
              className="btn btn-primary w-32"
            >
              Submit
            </button>
          </div>
        </form>
      </Layout>
    </Layout>
  );
};

export default ValidateHost;
