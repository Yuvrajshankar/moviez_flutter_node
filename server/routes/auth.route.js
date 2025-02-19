import express from "express";
import { authCheck, login, logout, signup } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", login);
router.post("/logout", logout);

router.get("/authCheck", verifyToken, authCheck);

export default router;