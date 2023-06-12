import Layout from '../components/Layout';
import Kabel from '../assets/notFound.png';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Layout
      chose="section"
      addClass="h-screen bg-gradient-to-br from-neutral to-primary flex justify-center items-center"
    >
      <div className="w-4/5 h-5/6 bg-base-100 rounded-xl flex px-10">
        <div className="h-full w-2/6">
          <img
            className="h-full"
            src={Kabel}
            alt=""
          />
        </div>
        <div className="h-full w-4/6 flex flex-col justify-center items-center gap-4">
          <p className="font-bold text-9xl">404</p>
          <p className="font-medium text-3xl tracking-wide">Page Not Found</p>
          <p className="text-lg text-center">
            we{'’'}re sorry. the page you requested could no be found Please go
            back to the home page
          </p>
          <Link
            to={'/'}
            className="btn btn-primary mt-3 w-32"
            type="btn"
          >
            GO HOME
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
