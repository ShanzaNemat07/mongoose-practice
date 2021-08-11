const mongoose = require('mongoose')
const validator = require('validator')
const student = new mongoose.Schema({
    name: {
        type: String,
        minlength: [3, "name should be 3 characters long"],
        required: true,

    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email your Entered in InValid")
            }
        }
    },
    address: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        minlength: 11,
        maxlength: 11,
        required: true,
    }
})
const Student = new mongoose.model('Student', student)
module.exports = Student