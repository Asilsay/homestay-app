import Layout from '../components/Layout';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { getUsers } from '../utils/type';

import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';

const Profile = () => {
  const MySwal = withReactContent(swal);

  const navigate = useNavigate();
  const [dataProfile, setDataProfile] = useState<getUsers>();

  const [cookie] = useCookies(['user_id', 'token']);
  const ckToken = cookie.token;

  const fetchProfile = async () => {
    await api
      .getUserById(ckToken)
      .then((response) => {
        const { data } = response.data;
        setDataProfile(data);
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

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex py-12 justify-center px-20"
      >
        <div className="flex">
          <div className="flex flex-col items-center">
            <div className="flex flex-row pb-5">
              <p className="text-[#291334] text-5xl tracking-wider font-bold text-center">
                Profile&nbsp;
              </p>
              <div
                className={`w-16 h-10 rounded-full flex items-center justify-center , ${
                  dataProfile?.role !== 'user' ? 'bg-success' : 'bg-warning'
                }`}
              >
                <div className="text-white text-center font-bold">
                  {dataProfile?.role}
                </div>
              </div>
            </div>
            <div className="card w-fit h-fit pb-5">
              <div className="p-1 bg-slate-300 rounded-full">
                <img
                  src={dataProfile?.profile_picture}
                  alt={`User's profile picture`}
                  className="h-64 w-64 border-spacing-1 rounded-full object-cover object-center"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center pb-5">
              <div>
                <p className="font-bold text-2xl">{dataProfile?.fullname}</p>
              </div>
              <div>
                <p className="font-bold text-lg">{dataProfile?.email}</p>
              </div>
              <div className="flex w-full pt-5 gap-4">
                <button
                  onClick={() => navigate('/editprofile')}
                  className="btn btn-primary w-36 text-white"
                >
                  Edit Profile
                </button>
                <button
                  onClick={() => navigate('/validate')}
                  className="btn btn-primary w-36 text-white"
                >
                  Become Hoster
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </Layout>
  );
};
export default Profile;
