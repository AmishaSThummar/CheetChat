<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversationId:{
        type: String,
        required: true
    },
    sender:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
},
{timestamps: true}
);

=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    conversationId:{
        type: String,
        required: true
    },
    sender:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    }
},
{timestamps: true}
);

>>>>>>> b2d3be2 (First commit)
module.exports = mongoose.model("Message", MessageSchema);