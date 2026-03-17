import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import PendingUser from "../model/pendingUser.model.js";
import bcrypt from "bcryptjs";
import { sendEmailOTP } from "../utils/email.js";
import imagekit from "../config/ImageKit.js";

/* ---------------- TOKEN ---------------- */

const generateTokenAndSetCookie = (userId, res) => {

  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: "15d" }
  );

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

/* ---------------- REGISTER ---------------- */

async function createUser(req, res) {

  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOTP();

    await sendEmailOTP(email, otp);

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
      message: "OTP sent to email",
      email: pendingUser.email
    });

  } catch (error) {

    console.error("createUser error:", error.message);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

/* ---------------- LOGIN ---------------- */

async function loginUser(req, res) {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    const otp = generateOTP();

    const otpExpiry =
      new Date(Date.now() + 10 * 60 * 1000);

    await sendEmailOTP(user.email, otp);

    user.emailOtp = otp;
    user.emailOtpExpiry = otpExpiry;

    await user.save();

    res.status(200).json({
      message: "OTP sent to email",
      email: user.email
    });

  } catch (error) {

    console.error("loginUser error:", error.message);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

/* ---------------- VERIFY OTP ---------------- */

async function verifyEmailOtp(req, res) {
  try {

    const { email, otp } = req.body;

    // normalize OTP
    const otpString = String(otp).trim();

    if (!email || !otpString) {
      return res.status(400).json({
        message: "Email and OTP required"
      });
    }

    let user = null;

    const pendingUser = await PendingUser.findOne({ email });

    /* -------- REGISTER OTP -------- */

    if (pendingUser) {

      const dbOtp = String(pendingUser.otp).trim();

      if (dbOtp !== otpString) {
        return res.status(400).json({
          message: "Invalid OTP"
        });
      }

      user = new User({
        name: pendingUser.name,
        email: pendingUser.email,
        password: pendingUser.password,
        isEmailVerified: true
      });

      await user.save();

      await PendingUser.deleteOne({
        _id: pendingUser._id
      });

    }

    /* -------- LOGIN OTP -------- */

    else {

      user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const dbOtp = String(user.emailOtp).trim();

      if (dbOtp !== otpString) {
        return res.status(400).json({
          message: "Invalid OTP"
        });
      }

      if (!user.emailOtpExpiry || user.emailOtpExpiry < new Date()) {
        return res.status(400).json({
          message: "OTP expired"
        });
      }

      // clear otp
      user.emailOtp = "";
      user.emailOtpExpiry = undefined;

      await user.save();
    }

    /* -------- LOGIN SUCCESS -------- */

    const token = generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      message: "OTP verified successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        profileCompleted: user.profileCompleted
      },
      token
    });

  } catch (error) {

    console.error("verifyEmailOtp error:", error);

    res.status(500).json({
      message: "Internal server error"
    });

  }
}
/* ---------------- LOGOUT ---------------- */

async function logoutUser(req, res) {

  try {

    res.cookie("jwt", "", { maxAge: 0 });

    res.status(200).json({
      message: "Logged out successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

/* ---------------- CHECK AUTH ---------------- */

async function checkAuth(req, res) {

  try {

    const user =
      await User.findById(req.user._id)
        .select("-password");

    res.status(200).json({
      user
    });

  } catch (error) {

    res.status(500).json({
      message: "Internal server error"
    });

  }
}

/* ---------------- UPDATE PROFILE ---------------- */

const updateProfile = async (req, res) => {

  try {

    const updateData = {
      name: req.body.name,
      bio: req.body.bio,
      profileCompleted: true
    };

    if (req.file) {

      const result =
        await imagekit.upload({

          file: req.file.buffer,
          fileName:
            Date.now() + "-" + req.file.originalname,
          folder: "/profilePics"

        });

      updateData.profilePic = result.url;

    }

    const user =
      await User.findByIdAndUpdate(

        req.user._id,
        updateData,
        { new: true }

      );

    res.json({
      message: "Profile updated",
      user
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Profile update failed"
    });
  }
};

export default {
  createUser,
  loginUser,
  verifyEmailOtp,
  logoutUser,
  checkAuth,
  updateProfile,
  getAllUsers
};

/* ---------------- GET ALL USERS ---------------- */

async function getAllUsers(req, res) {

  try {

    const loggedInUserId = req.user._id;

    const allUsers = await User.find({ _id: { $ne: loggedInUserId } })
      .select("-password");

    res.status(200).json(allUsers);

  } catch (error) {

    console.error("getAllUsers error:", error.message);

    res.status(500).json({
      message: "Internal server error"
    });

  }

}