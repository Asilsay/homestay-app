import Layout from '../components/Layout';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';
import CardList from '../components/CardList';
import { useCookies } from 'react-cookie';
import api from '../utils/api';
import { useEffect } from 'react';

const HomePage = () => {
  const MySwal = withReactContent(swal);

  const [cookie, setCookie] = useCookies(['token', 'pp']);
  const ckToken = cookie.token;
  const ckPP = cookie.pp;

  const fetchProfile = async () => {
    if (!ckPP) {
      await api
        .getUserById(ckToken)
        .then((response) => {
          const { data } = response.data;
          setCookie('pp', data.profile_picture, { path: '/' });
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
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout chose="layout">
      <Layout
        chose="section"
        addClass="bg-base-100 flex items-center justify-center"
      >
        <div className="flex-row pb-5">
          <div className="text-[#291334] text-5xl tracking-wider font-bold text-center pt-5">
            Stays
          </div>
          <div className="flex-col my-32 pb-10">
            <CardList
              title="Living Room A6"
              address="Suromadu"
              description="2 Guest - 1 Bedroom - 1 Bed - Bath
          Pool - Wifi - Kitchen"
              price="$25"
            />
            <CardList
              title="Living Room A6"
              address="Suromadu"
              description="2 Guest - 1 Bedroom - 1 Bed - Bath
          Pool - Wifi - Kitchen"
              price="$25"
            />
            <CardList
              title="Living Room A6"
              address="Suromadu"
              description="2 Guest - 1 Bedroom - 1 Bed - Bath
          Pool - Wifi - Kitchen"
              price="$25"
            />
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default HomePage;
