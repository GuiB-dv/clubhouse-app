const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MessageSchema = new Schema ({
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref:"User", required: true},
})

module.exports = mongoose.model("Message", MessageSchema)