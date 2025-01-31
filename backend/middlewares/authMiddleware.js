import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    
    // Read JWT from the 'jwt' cookie
    // yani k backend par jo cookie set ho rhi hai hum yahan par 
    // us ko access kar rhy hian authentication k leay
    
    token = req.cookies?.jwt;

    if (token) {
        try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user to the request object
        req.user = await User.findById(decoded.userId).select("-password");

        // Proceed to the next middleware
        next();
        } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed.");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, No token.");
    }
});

const authorizedAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send("Not authorized as an admin.");
    }
};

export { authenticate, authorizedAdmin };
