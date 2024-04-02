const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },
    colour:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
})

const note = mongoose.model("note",noteSchema)
module.exports = note;