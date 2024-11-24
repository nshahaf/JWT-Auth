import User from '../../models/user.model.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../../lib/jwt.js'

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body
    console.log(req.body)
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
    console.log(req.body)
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
    res.send("logout route")
}

