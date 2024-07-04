const mongoose = require("mongoose")
const Schema = mongoose.Schema
const { DateTime } = require('luxon')

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
MessageSchema.virtual("timestamp_formatted").get(function () {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
});


module.exports = mongoose.model("Message", MessageSchema)