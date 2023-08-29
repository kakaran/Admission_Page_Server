const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    FName: { type: String, required: true },
    LName: { type: String, required: true },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    PhoneNo: { type: Number, required: true },
    Password: { type: String, required: true },
    Role: { type: String, required: true },
    FormId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Form"
    }

},
    {
        timestamps: true,
    }
)

const User = mongoose.model("User", UserSchema);

module.exports = User