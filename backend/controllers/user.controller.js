import { asyncErrorHandler } from "../utils/asyncErrorHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { generateAccessAndRefreshTokens } from "./auth.controller.js";
import { Quiz } from "../models/quiz.model.js";
import { Attempt } from "../models/attempt.model.js";

const registerUser = asyncErrorHandler(async (req, res) => {

    const { fullName, userName, email, age, role, password } = req.body;

    if (
        [fullName, userName, email, password].some(field => field?.trim() === "")
    ) {
        return res.status(400).json(new ApiError("All fields are required", 400));
    }

    const existedUser = await User.findOne({
        $or: [{ userName }, { email }]
    });

    if (existedUser)
        return res.status(409).json(new ApiError("User with email or username already exists", 409));

    const user = await User.create({
        fullName,
        userName,
        email,
        age,
        password,
        role
    });

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser)
        return res.status(500).json(new ApiError("Something went wrong while registering the user", 500));

    return res.status(201).json(
        new ApiResponse(createdUser, "User registered successfully", 201)
    );
});

const generateDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
};

const loginUser = asyncErrorHandler(async (req, res) => {

    const { email, role, password } = req.body;

    if (!email)
        return res.status(400).json(ApiError("Email is required", 400));

    const user = await User.findOne({ email, role });

    if (!user)
        return res.status(404).json(new ApiError("User does not exist or not authorized for this role", 404));

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid)
        return res.status(401).json(new ApiError("Invalid user credentials", 401));


    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(200)
        .cookie("accessToken", accessToken)
        .cookie("refreshToken", refreshToken)
        .cookie("role", role)
        .json(
            new ApiResponse(
                loggedInUser,
                "User logged In Successfully",
                200
            )
        );
});

const logoutUser = asyncErrorHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(
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

    
    const loginDateTime = generateDateTime();
    user.lastLogin = loginDateTime;

    await user.save();

    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .clearCookie("role")
        .json(new ApiResponse({}, "User loggedout successfully", 200));

});

const profileDetails = asyncErrorHandler(async (req, res) => {
    const userId = req.user?._id;

    const quizzes = await Quiz.find({
        participants: userId
    }, {
        quizName: 1,
        numberOfQuestions: 1,
        totalMarks: 1,
        category: 1,
        difficulty: 1,
    });

    const {
        userName,
        fullName,
        email,
        age,
        createdAt
    } = req.user;

    const quizzzesCreated = await Quiz.find({
        creator: userId
    });


    const topQuizzes = quizzzesCreated
        .sort((a, b) => (b.participants?.length || 0) - (a.participants?.length || 0))
        .slice(0, Math.min(3, quizzzesCreated.length))
        .map(quiz => ({
            quizName: quiz.quizName,
            numberOfQuestions: quiz.numberOfQuestions,
            totalMarks: quiz.totalMarks,
            category: quiz.category,
            difficulty: quiz.difficulty,
            participantsCount: (quiz.participants?.length || 0)
        }));

    const attemptQuizzes = await Attempt.find({
        user: userId
    });

    const profile = {
        userName,
        fullName,
        email,
        age,
        createdAt,
        quizzes: quizzes.length ? quizzes : null,
        attemptedCount: quizzes.length,
        quizCreatedCount: Array.isArray(quizzzesCreated)
            ? quizzzesCreated.length
            : null,
        topQuizzes: Array.isArray(topQuizzes) ? topQuizzes : null,
        numberOfTopPerformingQuizzes: Array.isArray(topQuizzes) ? topQuizzes.length : null,
        attemptedQuizzes: Array.isArray(attemptQuizzes) ? attemptQuizzes : null,
    }

    res.status(200)
        .json(new ApiResponse({
            profile
        }, "Profile fetched successfully", 200));
});

const changePassword = asyncErrorHandler(async (req, res) => {

    const {
        email,
        currentPassword,
        newPassword
    } = req.body;

    const user = await User.findOne({ email }).select("+password");

    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

    if (user.email !== email || !isPasswordCorrect)
        return res.status(400).json(new ApiError("Invalid credentials", 400));

    user.password = newPassword;

    await user.save();

    return res
        .status(200)
        .json(new ApiResponse({}, "Password changed successfully", 200));

});

const editProfile = asyncErrorHandler(async (req, res) => {
    const userId = req.user?._id;

    const { fullName, userName, email, age } = req.body;

    const updatedProfile = await User.findByIdAndUpdate(
        userId,
        {
            fullName,
            userName,
            email,
            age
        },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedProfile)
        return res.status(404).json(new ApiError("Profile not found or editing failed", 404));

    return res.status(200)
        .json(new ApiResponse({}, "Profile edited successfully", 200));
});

const lastLoginDateTime = asyncErrorHandler(async (req, res) => {
    const userId = req.user?._id;
    const loginData = await User.findById(userId).select("lastLogin");

    if (!loginData)
        return res.status(404).json(new ApiError("Last login details not found", 404));

    return res.status(200).json(
        new ApiResponse({ lastLogin: loginData.lastLogin }, "Last login details found successfully", 200)
    );

});

const removeAccount = asyncErrorHandler(async (req, res) => {
  const userId = req.user?._id;

  const result = await User.deleteOne({ _id: userId });

  if (result.deletedCount === 0) {
    return res.status(404).json(new ApiError("User not found or already deleted", 404));
  }
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("role");

  return res.status(200).json(
    new ApiResponse({}, "Account deleted successfully", 200)
  );
});

const toggleBookmark = asyncErrorHandler(async (req, res) => {
    const { quizId } = req.body.quizId;

    req.user.bookmarkedQuizzes.includes(quizId) ? user.bookmarkedQuizzes.pull(quizId) : user.bookmarkedQuizzes.push(quizId);
    await req.user.save();

    return res.status(200)
                .json(new ApiResponse({}, "Bookmark toggled successfully", 200));
});

const bookmarkedQuizzes = asyncErrorHandler(async (req, res) => {
    const bookmarkedQuizzes = User.findById(req.user._id).populate("bookmarkedQuizzes").select("bookmarkedQuizzes");

    res.status(200)
        .json(new ApiResponse({ bookmarkedQuizzes }, "Bookmarked quizzes fetched successfully", 200));

});


export {
    registerUser,
    loginUser,
    logoutUser,
    profileDetails,
    changePassword,
    editProfile,
    lastLoginDateTime,
    removeAccount,
    toggleBookmark,
    bookmarkedQuizzes
}