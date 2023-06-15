import axios from 'axios';
import { PostLogin, PostRegis } from './type';

const instance = axios.create({
  baseURL: `https://peterzalai.biz.id/`,
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
};
