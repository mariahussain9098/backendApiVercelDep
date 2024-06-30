const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");

// Middleware to check if the user is an author
const isAuthor = (req, res, next) => {
  const { role } = req.user; // Assuming req.user is set after JWT verification
  if (role !== 'author') {
    return res.status(403).json({ message: "Forbidden: Authors only" });
  }
  next();
};

// Fetch all blogs
exports.findBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.send({ message: "All Blogs fetched", info: blogs });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Fetch specific blog
exports.findBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send({ message: "Blog not found" });
    res.send({ message: "Specific Blog fetched", info: blog });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

// Create a blog (author only)
// exports.createBlog = [isAuthor, async (req, res) => {
//   try {
//     const { title, detail, date, user } = req.body;
//     const [year, month, day] = date.split('-');
//     const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
//     const parsedDate = new Date(formattedDate).toISOString().split('T')[0];

//     const blog = new Blog({ title, detail, date: parsedDate, user });
//     await blog.save();
//     res.send({ message: blog });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong", isDataAdded: false, error: error.message });
//   }
// }];



exports.createBlog = async (req, res) => {
  const { title, detail, user } = req.body;

  try {
    const newBlog = new Blog({ title, detail, user }); // date will default to current date
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update existing blog (author only)
exports.updateBlog = [isAuthor, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send({ message: "Blog not found" });
    Object.assign(blog, req.body);
    await blog.save();
    res.send({ message: "Blog updated", info: blog });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}];

// Delete specific blog (author only)
exports.deleteBlog = [isAuthor, async (req, res) => {
  try {
    const delBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!delBlog) return res.status(404).send({ message: "Blog not found" });
    res.send({ message: "Blog deleted successfully", info: delBlog });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}];
