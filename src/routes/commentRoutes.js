const express = require("express");
const router = express.Router();
const commentController = require("../controller/commentController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/comments", verifyToken, commentController.createComment);
router.get("/comments/:blogId", commentController.findComments);

module.exports = router;
