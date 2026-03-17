import User from "../model/user.model.js";


export const getAllUsersForChat = async (req, res) => {
  try {
    
    const users = await User.find(
      { _id: { $ne: req.user._id } },
      "name email profilePic bio socialLinks" 
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};


export const getUserForChat = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, "name email profilePic bio socialLinks");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};