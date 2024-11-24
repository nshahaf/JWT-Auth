import mongoose from "mogoose"

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true, lowercase: true },
        fullName: { type: String, required: true, set: capitalizeFullName},
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
console.log(capitalizeFullName("shahaf noked"))
export default User