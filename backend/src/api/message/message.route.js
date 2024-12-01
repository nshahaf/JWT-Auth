import express from "express"
import { protectRoute } from "../../middleware/protectRoute.js"
import { getUsers, getMessages, postMessage } from "./message.controller.js"

const router = express.Router()

router.get("/users", protectRoute, getUsers)
router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, postMessage)



export default router