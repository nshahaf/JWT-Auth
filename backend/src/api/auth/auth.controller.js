import User from '../../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../../lib/jwt.js'
import cloudinary from '../../lib/cloudinary.js'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        if (!password || !fullName || !email) return res.status(400).send("All fields are required")
        if (password.length < 6) return res.status(400).send("Password should be at least 6 characters")


        const user = await User.findOne({ email })
        if (user) return res.status(400).send("User already exists")

        var salt = bcrypt.genSaltSync(10);
        var hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            })
        } else {
            res.status(400).send("Invalid user data")
        }

    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).send("Internal server error")
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        if (!user) return res.status(400).send("Invalid credentials")

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(400).send("Invalid credentials")

        generateToken(user._id, res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        })

    } catch (error) {
        console.log("Error in login controller", error)
        res.status(500).send("Internal server error")
    }
}

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 0 }) //clear the cookie
        res.status(200).send("User logged out")
    } catch (error) {
        console.log("Error in logout controller", error)
        res.status(500).send("Internal server error")
    }
}

/**
 * Updates the user's profile picture using Cloudinary and returns the updated user information.
 * @param {Request} req - The request object containing user information and profile picture.
 * @param {Response} res - The response object used to send back the result.
 */
export const updateProfileImage = async (req, res) => {
    try {
        // Extract user ID from the request object
        const userId = req.user._id

        // Extract profile picture URL from the request body
        const { profilePicture } = req.body
        if (!profilePicture) return res.status(400).send("Profile picture is required")

        // Upload the profile picture to Cloudinary
        const uploadResponse = await cloudinary.uploader.upload(profilePicture)

        // Update user's profile picture URL in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { profilePic: uploadResponse.secure_url },
            { new: true }
        )

        // Respond with the updated user information
        res.status(200).json(updatedUser)
    } catch (error) {
        // Log any errors and respond with a server error message
        console.log("Error in update controller", error)
        res.status(500).send("Internal server error")
    }
}

