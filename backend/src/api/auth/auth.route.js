import express from "express"
import { signup, login, logout } from "./auth.controller.js"
const router = express.Router()


router.get("/", (req,res) => {
    res.send("auth route")
})

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

export default router