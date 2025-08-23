export type Tuser = {
  _id?: string;
  name: string;
  email: string;
  password: string;
  profile?: string;
  cover?: string;
  detailsImage: string[];
  gender: 'male' | 'female';
  DOB: Date;
  age: number;
  country: string;
  state: string;
  city: string;
  occupation?: string;
  education?: string;
  marital_status: 'single' | 'married' | 'divorced' | 'widowed';
  interest?: string;
  role : 'user' | 'admin' | 'vip' | 'premium'
  isRegister: boolean;
  isDeleted: boolean;
  isEmailVerified?: boolean;
  isActive?: boolean;
};