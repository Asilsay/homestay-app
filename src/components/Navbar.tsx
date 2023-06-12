import { FC } from 'react';
import NavLog from '../assets/homestay_navbar_logo.png';

const Navbar: FC = () => {
  return (
    <div className="navbar px-16 bg-primary sticky top-0">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl w-52 hover:bg-inherit">
          <img
            src={NavLog}
            alt="img logo"
          />
        </a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar "
          >
            <div className="w-10 rounded-full border-2 border-base-100">
              <img src="https://ui-avatars.com/api/?name=default&rounded=true" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-md dropdown-content bg-base-100 rounded-box w-40 gap-1"
          >
            <li>
              <a>Add Homestay</a>
            </li>
            <li>
              <a>My Homestay</a>
            </li>
            <li>
              <a>History Trip</a>
            </li>

            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
