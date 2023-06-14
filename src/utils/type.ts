export interface PostLogin {
    email?: string;
    password?: string;
  }

  
export interface PostRegis extends PostLogin {
    phone?: string;
    username?: string;
  }

