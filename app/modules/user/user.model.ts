import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";
import { hobby } from "../../lib/hobbyArray";

const denomination = [
    "christian-catholic",
    "christian-protestant",
    "christian-orthodox",
    "muslim-sunni",
    "muslim-shia",
    "jewish",
    "hindu",
    "buddhist",
    "aethist",
    "others",
]

const ethnicity = [
    "african",
    "asian",
    "caucasian",
    "hispanic/latino",
    "middle eastern",
    "mixed race",
    "native american",
    "others",
];

const blockingSchema = { type: Schema.Types.ObjectId, ref: "users" }

const userSchema = new Schema<Tuser>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
            'Password must include uppercase, lowercase, number, and special character'
        ],
        select: false
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number']
    },
    profile: {
        type: String,
        default: "https://res.cloudinary.com/dymnrefpr/image/upload/v1757756925/axprgycysnygta9umc1z.jpg",
        trim: true
    },
    cover: {
        type: String,
        default: 'https://res.cloudinary.com/dymnrefpr/image/upload/v1757756927/uzhogzjebt1sa1nmi43y.jpg',
        trim: true
    },
    detailsImage: {
        type: [String],
        default: []
    },
    document: { type: String, required: true, trim: true },
    document1: { type: String, },
    document2: { type: String, },
    gender: {
        type: String,
        required: [true, 'Gender is required'],
        enum: {
            values: ['male', 'female'],
            message: 'Gender must be either male, or female'
        }
    },
    DOB: {
        type: Date,
        required: [true, 'Date of birth is required'],
        validate: {
            validator: function (value: any) {
                return value < new Date();
            },
            message: 'Date of birth cannot be in the future'
        }
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        lowercase: true,
        maxlength: [50, 'Country name cannot exceed 50 characters']
    },

    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
        lowercase: true,
        maxlength: [50, 'State name cannot exceed 50 characters']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        lowercase: true,
        maxlength: [50, 'City name cannot exceed 50 characters']
    },
    bio: {
        type: String,
        maxlength: [300, 'Bio cannot exceed 300 characters'],
        default: ''
    },
    occupation: {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [100, 'Occupation cannot exceed 100 characters']
    },
    education: {
        type: String,
        trim: true,
        lowercase: true,
        maxlength: [200, 'Education cannot exceed 200 characters']
    },
    marital_status: {
        type: String,
        required: [true, 'Marital status is required'],
        enum: {
            values: ['single', 'married', 'separated', 'divorced', 'widowed'],
            message: '{VALUE} Invalid marital status'
        }
    },
    hobby: {
        type: [String],
        required: [true, 'hobby is required'],
        lowercase: true,
        trim: true,
        enum: { values: hobby, message: '{VALUE} is Invalid hobby' }
    },
    children: { type: String, trim: true, default: '' },
    role: {
        type: String,
        required: [true, 'user role is required'],
        enum: { values: ['admin', 'user'], message: "invalid user role" },
    },
    saveItems: {
        type: [Schema.Types.ObjectId],
        ref: 'products',
        default: []
    },
    denomination: {
        type: String,
        required: [true, 'Denomination is required'],
        lowercase: true,
        enum: { values: denomination, message: '{VALUE} is not valid denomination' }
    },
    ethnicity: {
        type: String,
        enum: { values: ethnicity, message: '{VALUE} is not valid ethnicity' },
        required: [true, "Ethnicity is required"],
        lowercase: true,
        trim: true,
    },
    isEngaged: { type: Boolean, default: false },
    isEmailVerified: {
        type: Boolean,
        default: false,
        select: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'banned'],
        default: 'pending'
    },
    subscriptionPlan: {
        type: String,
        required: [true, 'subscription plan is required'],
        enum: {
            values: ['null', 'trial', 'premium', 'standard', 'vip'],
            message: "{VALUE} is invalid subscription plan"
        },
        default: 'null'
    },
    subscriptionDuration:{type:Number, default:0},
    banExpiresAt: { type: Date, default: null },
    subscriptionExpiresAt: { type: Date, default: null },
    subscriptionStatus: { type: String, enum: ["active", "expired"], default: "expired" },

    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },

    isActive: {
        type: Boolean,
        default: true
    },
    blockedUsers: {type:[blockingSchema], default:[]},
    blockedMe: {type:[blockingSchema], default:[]},

}, { timestamps: true, strict: "throw" });


export const userModel = model('users', userSchema)