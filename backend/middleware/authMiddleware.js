import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protected Routes
const protect = asyncHandler(async(req, res, next) => {
    let token;

    // read jwt from cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            //decode token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error("Unauthorized Access")
        }
    } else {
        res.status(401)
        throw new Error("Invalid JWT Token")
    }
})


// Admin Middleware
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error("Not authorized as admin") 
    }
}


export { protect, admin }