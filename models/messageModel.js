const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MessageSchema = new Schema ({
    title: { type: String },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    author: { type: Schema.Types.ObjectId, ref:"User", required: true},
})

// Virtual for message URL
// We don't use an arrow function as we'll need the this object
MessageSchema.virtual("url").get(function () { return `/message/${this._id}`; });

// time format with luxon



module.exports = mongoose.model("Message", MessageSchema)