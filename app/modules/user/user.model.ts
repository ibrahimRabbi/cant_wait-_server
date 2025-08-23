import { model, Schema } from "mongoose";
import { Tuser } from "./user.interface";



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
            message: 'Gender must be either male, female, other, or prefer_not_to_say'
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
        max: [120, 'Age cannot exceed 120']
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
            values: ['single', 'married', 'divorced', 'widowed'],
            message: 'Invalid marital status'
        }
    },
    interest: {
        type: String,
        trim: true,
        maxlength: [500, 'Interest cannot exceed 500 characters']
    },
    role: { type: String, required: [true, 'user role is required'], enum: { values: ['user', 'admin', 'vip', 'premium'], message: "invalid user role" } },
    isRegister: {
        type: Boolean,
        default: false
    },

    isDeleted: {
        type: Boolean,
        default: false
    },


    isEmailVerified: {
        type: Boolean,
        default: false
    },

    isActive: {
        type: Boolean,
        default: true
    }

});


export const userModel = model('users', userSchema)