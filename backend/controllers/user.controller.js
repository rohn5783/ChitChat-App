import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import PendingUser from "../model/pendingUser.model.js";
import bcrypt from "bcryptjs";
import { sendEmailOTP } from "../utils/email.js";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const otp = generateOTP();

        try {
            await sendEmailOTP(email, otp);
        } catch (emailError) {
            return res.status(500).json({ 
                message: "Failed to send OTP to email. Please use a valid email or check server config.", 
                error: emailError.message 
            });
        }

        let pendingUser = await PendingUser.findOne({ email });
        if (pendingUser) {
            pendingUser.name = name;
            pendingUser.password = hashedPassword;
            pendingUser.otp = otp;
            pendingUser.createdAt = Date.now();
            await pendingUser.save();
        } else {
            pendingUser = new PendingUser({
                name,
                email,
                password: hashedPassword,
                otp
            });
            await pendingUser.save();
        }

        res.status(201).json({
            message: "User created conditionally. Please check your email for the OTP.",
            email: pendingUser.email,
        });

    } catch (error) {
        console.error("Error in createUser controller: ", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const otp = generateOTP();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

        try {
            await sendEmailOTP(user.email, otp);
        } catch (emailError) {
            return res.status(500).json({ 
                message: "Failed to send OTP to email. Please check server config.", 
                error: emailError.message 
            });
        }
        
        user.emailOtp = otp;
        user.emailOtpExpiry = otpExpiry;
        await user.save();

        res.status(200).json({
            message: "Login credentials valid. Please verify OTP sent to email.",
            email: user.email,
        });

    } catch (error) {
        console.error("Error in loginUser controller: ", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function verifyEmailOtp(req, res) {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "Email and OTP are required" });
        }

        let user = null;
        const pendingUser = await PendingUser.findOne({ email });

        if (pendingUser) {
            if (pendingUser.otp !== otp) {
                return res.status(400).json({ message: "Invalid OTP" });
            }

            user = new User({
                name: pendingUser.name,
                email: pendingUser.email,
                password: pendingUser.password,
                isEmailVerified: true
            });
            await user.save();
            await PendingUser.deleteOne({ _id: pendingUser._id });

        } else {
            user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found or registration timeout" });
            }

            if (user.emailOtp !== otp) {
                return res.status(400).json({ message: "Invalid OTP" });
            }

            if (user.emailOtpExpiry < new Date()) {
                return res.status(400).json({ message: "OTP has expired" });
            }

            user.emailOtp = "";
            user.emailOtpExpiry = undefined;
            await user.save();
        }

        const token = generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            message: "OTP verified successfully. You are now logged in.",
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token
        });

    } catch (error) {
        console.error("Error in verifyEmailOtp controller: ", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function logoutUser(req, res) {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logoutUser controller: ", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

async function checkAuth(req, res) {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.error("Error in checkAuth controller:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export default {
    createUser,
    loginUser,
    verifyEmailOtp,
    logoutUser,
    checkAuth
};