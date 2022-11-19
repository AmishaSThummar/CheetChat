<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true,'Username must be present.'],
        unique: [true,'This username is already taken.'],
        maxlength: 10 
    },
    password:{
        type: String,
        required: true,
        minlength: [6,'Password must contain atleast 6 characters.'] 
    },
    email:{
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        minlength: 10
    },
    profile:{
        type:String
    },
    messages:{
        type: Object,
        default:[]
    },
    contacts:{
        type: Object,
        default:[]
    },
    status:{
        type: String,
        default:'offline'
    },
    groups:{
        type: Array,
    }
},{collection: 'users'});

const User = mongoose.model('User',userSchema);

=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true,'Username must be present.'],
        unique: [true,'This username is already taken.'],
        maxlength: 10 
    },
    password:{
        type: String,
        required: true,
        minlength: [6,'Password must contain atleast 6 characters.'] 
    },
    email:{
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        minlength: 10
    },
    profile:{
        type:String
    },
    messages:{
        type: Object,
        default:[]
    },
    contacts:{
        type: Object,
        default:[]
    },
    status:{
        type: String,
        default:'offline'
    },
    groups:{
        type: Array,
    }
},{collection: 'users'});

const User = mongoose.model('User',userSchema);

>>>>>>> b2d3be2 (First commit)
module.exports = User;