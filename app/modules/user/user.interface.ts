export type TDenomination =
  | "christian: catholic"
  | "christian: protestant"
  | "christian: orthodox"
  | "muslim: sunni"
  | "muslim: shia"
  | "jewish"
  | "hindu"
  | "buddhist"
  | "aethist"
  | "other";

  export type TEthnicity =
  | "african"
  | "asian"
  | "caucasian"
  | "hispanic/latino"
  | "middle eastern"
  | "mixed race"
  | "native american"
  | "other";


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
  bio: string;
  ethnicity : TEthnicity;
  denimanation: TDenomination;
  occupation?: string;
  education?: string;
  marital_status: 'single' | 'married' | 'divorced' | 'widowed';
  hobby?: string;
  role : 'admin' | 'user';
  subscriptionPlan: 'trail' | 'vip' | 'standard' | 'null';
  isEngaged: boolean;
  isRegister: boolean;
  isDeleted: boolean;
  isEmailVerified?: boolean;
  isActive?: boolean;
};