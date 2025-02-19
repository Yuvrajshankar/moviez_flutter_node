import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

        // console.log("Token: ", token);
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        // console.log("Decoded: ", decoded);
        if (!decoded) {
            return res.json(401).json({ success: false, message: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // console.log("User: ", user);
        req.user = user;
        // console.log("req.user: ", req.user);
        next();
    } catch (error) {
        console.log("Error in protected middleware: ", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};