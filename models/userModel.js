const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema ({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    membership_status: { type: Boolean, default: false },
    admin: {type: Boolean, default: false}
})

UserSchema.virtual("url").get(function () { return `/user/${this._id}`; });

module.exports = mongoose.model("User", UserSchema)