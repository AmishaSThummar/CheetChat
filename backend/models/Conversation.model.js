<<<<<<< HEAD
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    members: {
        type:Array,
        required:true
    },
},
{timestamps: true}
);

=======
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConversationSchema = new Schema({
    members: {
        type:Array,
        required:true
    },
},
{timestamps: true}
);

>>>>>>> b2d3be2 (First commit)
module.exports = mongoose.model("Conversations", ConversationSchema);