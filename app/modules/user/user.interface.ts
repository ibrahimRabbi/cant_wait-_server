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
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  profile?: string;
  cover?: string;
  detailsImage?: string[];
  document: string;
  document1?: string;
  document2?: string;
  gender: 'male' | 'female';
  DOB: Date;
  country: string;
  state: string;
  city: string;
  bio: string;
  ethnicity : TEthnicity;
  denomination: TDenomination;
  occupation: string;
  education: string;
  marital_status: 'single' | 'married' | 'divorced' | 'separated' | 'widowed';
  hobby?: [string];
  children? : string;
  role : 'admin' | 'user';
  subscriptionPlan: 'trail' | 'premium' | 'standard' | 'null' | 'vip';
  saveItems: Types.ObjectId[]
  isEngaged: boolean;
  status: 'pending' | 'approved' | 'banned';
  banExpiresAt: Date | null;
  subscriptionExpiresAt:Date | null;
  subscriptionDuration : number 
  subscriptionStatus: "active"| "expired";
  isDeleted: boolean;
  isEmailVerified?: boolean;
  isActive?: boolean;
  blockedUsers: Types.ObjectId[];
  blockedMe : Types.ObjectId[];
};