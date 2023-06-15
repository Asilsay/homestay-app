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

export interface DetailHomeType {
  homestay_id?: string;
  name?: string;
  description?: string;
  address?: string;
  price?: number;
  total_reviews?: number;
  average_rating?: number;
}
