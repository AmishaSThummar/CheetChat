<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    members:{
        type:Array
    },
    admins:{
        type:Array
    },
    groupName:{
        type:String,
        required : true,
    }
});

=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    members:{
        type:Array
    },
    admins:{
        type:Array
    },
    groupName:{
        type:String,
        required : true,
    }
});

>>>>>>> b2d3be2 (First commit)
module.exports = mongoose.model("Group", GroupSchema);