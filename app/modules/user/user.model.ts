import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";
import { hobby } from "../../lib/hobbyArray";

const denomination = [
    "christian: catholic",
    "christian: protestant",
    "christian: orthodox",
    "muslim: sunni",
    "muslim: shia",
    "jewish",
    "hindu",
    "buddhist",
    "aethist",
    "other",
]

const ethnicity = [
    "african",
    "asian",
    "caucasian",
    "hispanic/latino",
    "middle eastern",
    "mixed race",
    "native american",
    "other",
];

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

    profile: {
        type: String,
        default: null,
        trim: true
    },
    cover: {
        type: String,
        default: null,
        trim: true
    },
    detailsImage: {
        type: [String],
        default: []
    },
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
    age: {
        type: Number,
        min: [13, 'Age must be at least 13'],
        max: [70, 'Age cannot exceed 70']
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        maxlength: [50, 'Country name cannot exceed 50 characters']
    },

    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
        maxlength: [50, 'State name cannot exceed 50 characters']
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
        maxlength: [50, 'City name cannot exceed 50 characters']
    },
    bio: {
        type: String,
        required: [true, 'Bio is required'],
        maxlength: [300, 'Bio cannot exceed 300 characters']
    },
    occupation: {
        type: String,
        trim: true,
        maxlength: [100, 'Occupation cannot exceed 100 characters']
    },
    education: {
        type: String,
        trim: true,
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
        type: String,
        required: [true, 'hobby is required'],
        enum: {
            values: hobby,
            message: 'Invalid hobby'
        }
    },
    role: {
        type: String,
        required: [true, 'user role is required'],
        enum: { values: ['admin', 'user'], message: "invalid user role" },
        select: false
    },
    subscriptionPlan: {
        type: String,
        required: [true, 'subscription plan is required'],
        enum: {
            values: ['null', 'trail', 'vip', 'standard'],
            message: "{VALUE} is invalid subscription plan"
        }
    },
    denimanation: {
        type: String,
        required: [true, 'Denomination is required'],
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
    isRegister: {
        type: Boolean,
        default: false,
        select: false
    },

    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    },

    isActive: {
        type: Boolean,
        default: true
    }

}, { timestamps: true, strict: "throw" });


export const userModel = model('users', userSchema)