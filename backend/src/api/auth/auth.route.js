import express from "express"
import { signup, login, logout, updateProfileImage } from "./auth.controller.js"
import { protectRoute } from "../../middleware/protectRoute.js"
const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
router.put("/update-profile", protectRoute, updateProfileImage)
router.get("/check-auth", protectRoute, (req, res) => res.status(200).send({ _id: req.user._id, email: req.user.email, fullName: req.user.fullName, profilePic: req.user.profilePic }))

export default router