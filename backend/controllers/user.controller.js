import { asyncErrorHandler } from "../utils/asyncErrorHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const generateAccessAndRefreshTokens = async userId => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
        await user.save({
            validateBeforeSave: false
        });

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError("Something went wrong while generating referesh and access token", 500);
    }
}

const registerUser = asyncErrorHandler(async (req, res) => {

    const { fullName, userName, email, age, role, password } = req.body;

    if (
        [fullName, userName, email, age, role, password].some(field => field?.trim() === "")
    ) {
        throw new ApiError("All fields are required", 400);
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existedUser)
        throw new ApiError("User with email or username already exists", 409);

    const user = await User.create({
        fullName,
        userName,
        email,
        age,
        password,
        role
    });

    const createdUser = await User.select(user._id).select("-password -refreshToken -accessToken");

    if (!createdUser)
        throw new ApiError("Something went wrong while registering the user", 500);

    return res.status(201).json(
        new ApiResponse(createdUser, "User registered successfully", 201)
    )
});
