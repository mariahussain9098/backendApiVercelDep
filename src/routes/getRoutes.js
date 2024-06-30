const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const blogController = require("../controller/blogController");
const verifyToken = require("../middleware/authMiddleware");

// User Routes
router.post("/users", userController.createUser); // signup/create user
router.get("/users/:id", verifyToken, userController.findUser);
router.patch("/users/:id", verifyToken, userController.updateUser);
router.delete("/users/:id", verifyToken, userController.deleteUser);

// Blog Routes
router.get("/blogs", blogController.findBlogs);
router.post("/blogs", verifyToken, blogController.createBlog);
router.get("/blogs/:id", blogController.findBlog);
router.patch("/blogs/:id", verifyToken, blogController.updateBlog);
router.delete("/blogs/:id", verifyToken, blogController.deleteBlog);

module.exports = router;
