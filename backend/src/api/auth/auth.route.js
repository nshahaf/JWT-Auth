import express from "express"
import { signup, login, logout, updateProfileImage } from "./auth.controller.js"
import { protectRoute } from "../../middleware/protectRoute.js"
const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.put("/update-image", protectRoute, updateProfileImage)
router.get("/check-token", protectRoute, (req, res) => res.status(200).send("Token is valid"))

export default router