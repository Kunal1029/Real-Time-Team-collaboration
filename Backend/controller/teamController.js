import Team from "../models/teamSchema.js";
import User from "../models/userSchema.js";

//Create a Team
export const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { uid, email } = req.user;

    // Find the user who is creating the team
    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: "User not found" });

    const team = await Team.create({
      name,
      description,
      owner: user._id,
      members: [
        {
          user: user._id,
          role: "admin",
        },
      ],
    });

    user.teams.push(team._id)
    // console.log(user)
    await user.save()


    res.status(201).json({ message: "Team created", team });
  } catch (err) {
    console.error("createTeam error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get all Teams Where User is Member
export const getMyTeams = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: "User not found" });

    const teams = await Team.find({ "members.user": user._id }).populate("members.user", "email name");

    res.status(200).json({ teams });
  } catch (err) {
    console.error("getMyTeams error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a Team by ID (if member)
export const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) return res.status(404).json({ error: "User not found" });

    const team = await Team.findOne({
      _id: id,
      "members.user": user._id,
    }).populate("members.user", "email name").populate("owner");

    if (!team) return res.status(404).json({ error: "Team not found or access denied" });

    res.status(200).json({ team });
  } catch (err) {
    console.error("getTeamById error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Add Member to Team (only admin)
export const addMember = async (req, res) => {
  const { teamId } = req.params;
  const { email} = req.body;
  
  try {
  
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Check if user already in team
    const alreadyInTeam = team.members.some(
      (m) => m.user.toString() === user._id.toString() 
    );
    if (alreadyInTeam) return res.status(400).json({ error: "User already in team" });

    // Add user
    team.members.push({ user: user._id });
    await team.save();
    res.json({ message: "Member added successfully", team });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }

};

// Remove Member from Team (only admin)
export const removeMember = async (req, res) => {
  try {
    const { teamId, userId } = req.params;
    const { uid } = req.user;
    
    const userRequesting = await User.findOne({ uid });
    const team = await Team.findById(teamId);

    if (!userRequesting || !team) return res.status(404).json({ error: "Team or user not found" });

    const isAdmin = team.members.find(
      (m) => m.user.toString() === userRequesting._id.toString() && m.role === "admin"
    );
    if (!isAdmin) return res.status(403).json({ error: "Only admins can remove members" });

    team.members = team.members.filter((m) => m.user.toString() !== userId);
    await team.save();

    res.status(200).json({ message: "Member removed", team });
  } catch (err) {
    console.error("removeMember error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const promoteToManager = async (req, res) => {
  try {
    const { teamId, userId } = req.params;
    const { uid } = req.user;

    const requestingUser = await User.findOne({ uid });
    const team = await Team.findById(teamId);

    if (!requestingUser || !team)
      return res.status(404).json({ error: "Team or user not found" });

    // Check if the requester is an admin of the team
    const isAdmin = team.members.find(
      (m) =>
        m.user.toString() === requestingUser._id.toString() && m.role === "admin"
    );

    if (!isAdmin)
      return res.status(403).json({ error: "Only admins can promote members" });

    // Find the target memberin team
    const member = team.members.find(
      (m) => m.user.toString() === userId
    );

    if (!member)
      return res.status(404).json({ error: "Target user is not a member of the team" });

    if (member.role === "admin")
      return res.status(400).json({ error: "User is already an admin" });

    if (member.role === "manager")
      return res.status(400).json({ error: "User is already a manager" });

    // Promote the member
    member.role = "manager";
    await team.save();

    res.status(200).json({ message: "Member promoted to manager", team });
  } catch (err) {
    console.error("promoteToManager error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNonMembersOfTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { uid } = req.user;

    const currentUser = await User.findOne({ uid });
    if (!currentUser) return res.status(404).json({ error: "User not found" });

    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ error: "Team not found" });

    const memberIds = team.members.map(member => member.user.toString()); //get members of team

    const nonMembers = await User.find({ _id: { $nin: memberIds } }) //store users those who's id not include in that team
      .select("name email teams");

    res.status(200).json({ nonMembers });
  } catch (err) {
    console.error("getNonMembersOfTeam error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNonAdminMembers = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { uid } = req.user;

    const requestingUser = await User.findOne({ uid });
    if (!requestingUser) return res.status(404).json({ error: "User not found" });

    const team = await Team.findById(teamId).populate("members.user", "name email uid");
    if (!team) return res.status(404).json({ error: "Team not found" });

    // Filter out members with role "admin"
    const nonAdminMembers = team.members.filter(
      (member) => member.role !== "admin"
    );

    res.status(200).json({ nonAdminMembers });

  } catch (err) {
    console.error("getNonAdminMembers error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

