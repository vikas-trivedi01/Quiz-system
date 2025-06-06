import { asyncErrorHandler } from "../utils/asyncErrorHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"

const generateAccessAndRefreshTokens = async (userId) => {
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
        res.status(500).json(new ApiError("Something went wrong while generating referesh and access token", 500));
    }
}

const registerUser = asyncErrorHandler(async (req, res) => {

    const { fullName, userName, email, age, role, password } = req.body;

    if (
        [fullName, userName, email, password].some(field => field?.trim() === "")
    ) {
         res.status(400).json(new ApiError("All fields are required", 400));
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existedUser)
         res.status(409).json(new ApiError("User with email or username already exists", 409));

    const user = await User.create({
        fullName,
        userName,
        email,
        age,
        password,
        role
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken -accessToken");

    if (!createdUser)
         res.status(500).json(new ApiError("Something went wrong while registering the user", 500));

    return res.status(201).json(
        new ApiResponse(createdUser, "User registered successfully", 201)
    );
});

const loginUser = asyncErrorHandler(async (req, res) => {

    const { email, role, password } = req.body;

    if (!email)
        res.status(400).json(ApiError("Email is required", 400));

    const user = await User.findOne({ email, role });

    if (!user)
         res.status(404).json(new ApiError("User does not exist or not authorized for this role", 404));

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid)
         res.status(401).json(new ApiError("Invalid user credentials", 401));


    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -accessToken");

    const cookieOptions = {
        httpOnly: false,
        secure: false
    }

    return res.status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .cookie("role", role, cookieOptions)
        .json(
            new ApiResponse(
                { user: loggedInUser, accessToken, refreshToken },
                "User logged In Successfully",
                200
            )
        );
});

const logoutUser = asyncErrorHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: false,
        secure: false
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .clearCookie("role", options)
        .json(new ApiResponse({}, "User loggedout successfully", 200));

});

export {
    registerUser,
    loginUser, 
    logoutUser
}