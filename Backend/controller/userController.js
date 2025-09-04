import User from "../models/userSchema.js";
import Team from "../models/teamSchema.js";
import admin from "../helper/firebase.js";

export const createOrGetUser = async (req, res) => {
  try {
    const {email, uid} = req.user;
    // console.log(email, name,uid)
    if (!uid || !email) {
      return res.status(400).json({ error: "UID and Email are required" });
    }

    const { name } = req.body; 

    let user = await User.findOne({ uid });

    if (!user) {
      // Create new user
      user = await User.create({
        uid,
        email,
        name: name || "No Name",
        role: "member",
      });
    }
    // console.log(user, "Successfull")
    return res.status(200).json({ message: user.isNew ? "User created" : "User retrieved", user });

  } catch (error) {
    console.error("createOrGetUser error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid }).populate("teams");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ user });
  } catch (err) {
    console.error("getUserProfile error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid })
    if (!user) return res.status(404).json({ error: "Unauthorized access" });

    const isOwnerAnyTeam = await Team.findOne({ owner: user._id });
    if (!isOwnerAnyTeam) {
      return res
        .status(403)
        .json({ error: "User must be an admin of at least one team." });
    }

    const allUsers = await User.find()
    res.status(200).json({ allUsers });
  } catch (error) {
    console.error("getAllUser error:", error);
    res.status(500).json({ error: "Failed to fetch all users" });
  }
};


export const logoutUser = async (req, res) => { 
  try {
    const { uid } = req.user;
    await admin.auth().revokeRefreshTokens(uid);
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ error: "Logout failed" });
  }
};


