const Comment = require("../models/commentSchema");

// Create a comment
exports.createComment = async (req, res) => {
  try {
    const { content, blogId } = req.body;
    const userId = req.user.userId;
    const comment = new Comment({ content, user: userId, blog: blogId });
    await comment.save();
    res.send({ message: "Comment added", comment });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Fetch comments for a specific blog
exports.findComments = async (req, res) => {
  try {
    const comments = await Comment.find({ blog: req.params.blogId }).populate('user', 'firstName lastName');
    res.send({ message: "Comments fetched", comments });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
