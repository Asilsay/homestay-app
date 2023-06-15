import axios from 'axios';
import { PostLogin, PostRegis } from './type';

const instance = axios.create({
  baseURL: `http://35.223.114.62/`,
});

export default {
  // ----- login logogut -----

  postLogin: (code?: PostLogin) =>
    instance({
      method: 'POST',
      url: `login`,
      data: code,
    }),
  postRegister: (code?: PostRegis) =>
    instance({
      method: 'POST',
      url: `register`,
      data: code,
    }),

  // ----- user -----

  getUserById: (token?: string) =>
    instance({
      method: 'GET',
      url: `users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  putUserById: (token?: string, data?: any) =>
    instance({
      method: 'PUT',
      url: `users`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  delUserById: (token?: string) =>
    instance({
      method: 'DELETE',
      url: `users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  putUserRoleById: (token?: string, data?: any) =>
    instance({
      method: 'PUT',
      url: `users/role`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  // --- list homestay ---

  getAllHomestay: (token?: string) =>
    instance({
      method: 'GET',
      url: 'homestays',
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': true,
      },
    }),

  addHosting: (token?: string, data?: any) =>
    instance({
      method: 'POST',
      url: 'homestays',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': true,
      },
    }),
  getHomestayById: (token?: string, home_id?: string) =>
    instance({
      method: 'GET',
      url: `homestays/${home_id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  putHomestayById: (token?: string, home_id?: string, data?: any) =>
    instance({
      method: 'PUT',
      url: `homestays/${home_id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  delHomestayById: (token?: string, home_id?: string, data?: any) =>
    instance({
      method: 'Delete',
      url: `homestays/${home_id}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  // --- list Reservation ---

  postCheckReservation: (token?: string, data?: any) =>
    instance({
      method: 'POST',
      url: 'reservations/availability',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  postReserv: (token?: string, data?: any) =>
    instance({
      method: 'POST',
      url: 'reservations/availability',
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};
