import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncErrorHandler } from "../utils/asyncErrorHandler.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false
        });

        return { accessToken, refreshToken };
};

const refreshAccessToken = asyncErrorHandler(async (req, res) => {

    const oldRefreshToken = req.cookies?.refreshToken;

    if(!oldRefreshToken)
            return res.status(401).json(new ApiError("No refresh token provided", 401));

    const decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded?._id);

    if(!user || user.refreshToken !== oldRefreshToken)
        return res.status(403).json(new ApiError("Invalid or reused refresh token", 403));

     const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(decoded._id);

    return res.status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .json(
            new ApiResponse(
                {},
                "Token refreshed successfully",
                200
            )
        );

});

export {
    generateAccessAndRefreshTokens,
    refreshAccessToken
}