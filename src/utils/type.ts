export interface PostLogin {
  email?: string;
  password?: string;
}

export interface PostRegis extends PostLogin {
  phone?: string;
  fullname?: string;
}

export interface getUsers extends PostRegis {
  profile_picture?: string;
  role?: string;
}
