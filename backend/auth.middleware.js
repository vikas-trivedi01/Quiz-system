import { ApiError } from "./utils/ApiError.js";
import { asyncErrorHandler } from "./utils/asyncErrorHandler.js";
import { User } from "./models/user.model.js";
import jwt from "jsonwebtoken";


export const authenticateRequest = asyncErrorHandler( async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if(!token)
               return res.status(401).json(new ApiError("Unauthorized request", 401));

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -accessToken");

        if(!user) 
             return res.status(401).json(new ApiError("Invalid access token", 401));

        req.user = user;
        next();
            
    } catch (error) {
         throw new ApiError(error?.message || "Invalid access token", 401);
    }
    
});
