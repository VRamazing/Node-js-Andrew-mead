const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String, 
        required: true,
        trim: true,
        minLength: 6,
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password not allowed. Try again");
            }
        }
    },
    email: {
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    }
})

UserSchema.pre('save', async function (next) {
    const user = this

    // on create and update this is true
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model("User", UserSchema);



module.exports = User;