import { Types } from "mongoose";

export type TDenomination =
  | "christian-catholic"
  | "christian-protestant"
  | "christian-orthodox"
  | "muslim-sunni"
  | "muslim-shia"
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
  detailsImage?: string[];
  document: string;
  document1?: string;
  document2?: string;
  gender: 'male' | 'female';
  DOB: Date;
  age: number;
  country: string;
  state: string;
  city: string;
  bio: string;
  ethnicity : TEthnicity;
  denomination: TDenomination;
  occupation: string;
  education: string;
  marital_status: 'single' | 'married' | 'divorced' | 'separated' | 'widowed';
  hobby?: string;
  children? : string;
  role : 'admin' | 'user';
  subscriptionPlan: 'trail' | 'vip' | 'standard' | 'null';
  saveItems: Types.ObjectId[]
  isEngaged: boolean;
  isRegister: boolean;
  isDeleted: boolean;
  isEmailVerified?: boolean;
  isActive?: boolean;
};