const User = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secretKey = process.env.JWT_SECRET_KEY;

// Register/Signup User
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    const user = new User({ firstName, lastName, email, password, role });
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (err) {
    res.status(400).json(err);
  }
};

// Fetch Specific User by ID
exports.findUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    res.send({ message: "User found", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({ message: "User not found" });
    Object.assign(user, req.body);
    await user.save();
    res.send({ message: "User updated", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const delUser = await User.findByIdAndDelete(req.params.id);
    if (!delUser) return res.status(404).send({ message: "User not found" });
    res.send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete user", error: error.message });
  }
};
