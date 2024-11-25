import User from "../../models/user.model"
import Message from "../../models/message.model"
import cloudinary from "../../lib/cloudinary"

export const getUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const filterdUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')
        res.status(200).json(filterdUsers)
    } catch (error) {
        console.error("Error in getUsers controller", error)
        res.status(500).send("Internal server error")
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params
        const senderId = req.user._id
        const messages = await Message.find({
            $or: [
                { senderId, receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        })
        res.status(200).json(messages)

    } catch (error) {
        console.error("Error in getMessages controller", error)
        res.status(500).send("Internal server error")
    }
}

export const postMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl
        if (image) {
            const uploadedImage = await cloudinary.uploader.upload(image)
            imageUrl = uploadedImage.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })
        res.status(201).json(newMessage)

    } catch (error) {
        console.error("Error in postMessage controller", error)
        res.status(500).send("Internal server error")
    }

}

