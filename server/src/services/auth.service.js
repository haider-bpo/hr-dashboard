import {
  REFRESH_TOKEN_EXPIRY,
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} from "../config/environment.js";
import User from "../models/user.model.js";
import { ApiError, ApiResponse } from "../utils/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  // Generate access and refresh tokens
  static generateTokens(userId) {
    const accessToken = jwt.sign({ id: userId }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign({ id: userId }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    });

    return { accessToken, refreshToken };
  }

  // Signup method
  static async signup(req) {
    const userDetail = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      username: userDetail.username,
    });

    if (existingUser) {
      throw new ApiError(409, "Username already exists");
    }

    // Create new user
    const newUser = await User.create(userDetail);

    return new ApiResponse(
      {
        user: newUser,
      },
      201,
      "User registered successfully"
    );
  }

  // Signin method
  static async signin(req) {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Check password
    const isPasswordValid = user.comparePassword(password);
    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user._id);

    // Update user's refresh token
    user.refreshToken = refreshToken;
    await user.save();

    // Prepare response (remove sensitive info)
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    return new ApiResponse(
      {
        user: userResponse,
        accessToken,
        refreshToken,
      },
      200,
      "User signed in successfully"
    );
  }

  // Get user details
  static async getUser(req) {
    const user = req.user;

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Prepare response (remove sensitive info)
    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    return new ApiResponse(
      { user: userResponse },
      200,
      "User details retrieved successfully"
    );
  }

  // Update user
  static async update(req) {
    const { id } = req.params;
    const updatedUserDetails = req.body;

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // If password is being updated, hash it
    if (updatedUserDetails.password) {
      const salt = await bcrypt.genSalt(10);
      updatedUserDetails.password = await bcrypt.hash(
        updatedUserDetails.password,
        salt
      );
    }

    // Check if username is being changed and is unique
    if (
      updatedUserDetails.username &&
      updatedUserDetails.username !== user.username
    ) {
      const existingUser = await User.findOne({
        username: updatedUserDetails.username,
      });
      if (existingUser) {
        throw new ApiError(409, "Username already exists");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedUserDetails, {
      new: true,
    });

    // Prepare response (remove sensitive info)
    const userResponse = updatedUser.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    return new ApiResponse(
      { user: userResponse },
      200,
      "User updated successfully"
    );
  }

  // Delete user
  static async delete(req) {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const deletedUser = await User.findByIdAndDelete(id);

    // Prepare response (remove sensitive info)
    const userResponse = deletedUser.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

    return new ApiResponse(
      { user: userResponse },
      200,
      "User deleted successfully"
    );
  }

  // Get all users
  static async getAll(req) {
    const users = await User.find({}).select("-password -refreshToken");

    return new ApiResponse({ users }, 200, "Users fetched successfully");
  }

  // Logout method
  static async logout(req) {
    const { _id } = req?.user;

    const user = await User.findById(_id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Clear refresh token
    user.refreshToken = null;
    await user.save();

    return new ApiResponse({}, 200, "User logged out successfully");
  }

  static async refreshToken(req) {
    const { refreshToken: userRefreshToken } = req.body;

    // Check if refresh token is provided
    if (!userRefreshToken) {
      throw new ApiError(401, "Refresh token is required");
    }

    // Verify refresh token
    const payload = jwt.verify(userRefreshToken, REFRESH_TOKEN_SECRET);
    if (!payload) {
      throw new ApiError(401, "Invalid refresh token");
    }

    // Find user
    const user = await User.findById(payload?.id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Generate tokens
    const { accessToken, refreshToken } = this.generateTokens(user._id);

    // Update user's refresh token
    user.refreshToken = refreshToken;
    await user.save();

    return new ApiResponse(
      {
        accessToken,
        refreshToken,
      },
      200,
      "Tokens refreshed successfully"
    );
  }
}
