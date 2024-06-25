import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// for the login page
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password!",
                success: false
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password!",
                success: false
            });
        }

        const token = jwt.sign({ id: user._id }, "your_jwt_secret_key", { expiresIn: "1d" });
        return res.status(200).cookie("token", token, { httpOnly: true }).json({
            message: `Welcome back, ${user.fullName}`,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// for the logout page
export const Logout = async (req, res) => {
    return res.status(200).cookie("token", "", {
        expires: new Date(0), 
        httpOnly: true
    }).json({
        message: "User logged out successfully!",
        success: true
    });
};

// for the register page
export const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(401).json({
                message: "Invalid data",
                success: false
            });
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(401).json({
                message: "This email is already used!",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullName,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Account created successfully!",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};
