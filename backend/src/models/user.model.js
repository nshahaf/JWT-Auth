import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/, 'Please fill a valid email address'] },
        fullName: { type: String, required: true, set: capitalizeFullName },
        password: { type: String, required: true, minlength: 6 },
        profilePic: { type: String, default: "" },
    },
    { timestamps: true }
)

//setters
function capitalizeFullName(fullName) {
    return fullName
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

const User = mongoose.model("User", userSchema)
export default User