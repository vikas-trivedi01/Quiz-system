import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 65,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String
    },
    refreshToken: {
        type: String
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
    },
    quizzesAttempted: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz"
        }
    ],

}, { timestamps: true });

export const User = new mongoose.model("User", userSchema);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const bcrypt = await import("bcrypt");
    await bcrypt.hash(this.password, 10);
    next();
});