import axios from 'axios';
import { PostLogin, PostRegis, getUsers } from './type';

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
};
