import { FC, useEffect } from 'react';
import NavLog from '../assets/homestay_navbar_logo.png';

import { Link, useNavigate } from 'react-router-dom';
import swal from '../utils/swal';
import { useCookies } from 'react-cookie';
import withReactContent from 'sweetalert2-react-content';

const Navbar: FC = () => {
  const [cookie, , removeCookie] = useCookies(['user_id', 'token', 'pp']);
  const ckPP = cookie.pp;
  const navigate = useNavigate();
  const MySwal = withReactContent(swal);

  const handleLogout = async () => {
    MySwal.fire({
      title: 'Logout',
      text: 'Are you sure?',
    }).then((result) => {
      if (result.isConfirmed) {
        removeCookie('user_id');
        removeCookie('token');
        removeCookie('pp');
        navigate('/landing');
      }
    });
  };

  return (
    <div className="navbar px-16 bg-primary sticky top-0 z-50">
      <div className="flex-1">
        <Link
          to={'/'}
          className="btn btn-ghost normal-case text-xl w-52 hover:bg-inherit"
        >
          <img
            src={NavLog}
            alt="img logo"
          />
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar "
          >
            <div className="w-10 rounded-full border-2 border-base-100">
              <img
                src={
                  !ckPP || ckPP === null || ckPP === undefined
                    ? 'https://placehold.co/40x40/png?text=I'
                    : ckPP
                }
                alt={`User's profile picture`}
                className="h-10 w-10 border-spacing-1 rounded-full object-cover object-center"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-md dropdown-content bg-base-200 rounded-box w-40 gap-1"
          >
            <li>
              <a>Add Homestay</a>
            </li>
            <li>
              <a>My Homestay</a>
            </li>
            <li>
              <Link to="/trip">My Reservation</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <a onClick={() => handleLogout()}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
