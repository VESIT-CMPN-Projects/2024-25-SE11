// const express = require("express");
// const router = express.Router();

// // Dummy data for community posts
// let posts = [
//   { id: 1, user: "John", message: "Stay safe during fire drills!" },
//   { id: 2, user: "Alice", message: "What fire safety measures do you follow at home?" }
// ];

// // GET all posts
// router.get("/", (req, res) => {
//   res.json(posts);
// });

// // POST a new community message
// router.post("/", (req, res) => {
//   const { user, message } = req.body;
//   if (!user || !message) {
//     return res.status(400).json({ error: "User and message are required" });
//   }
//   const newPost = { id: posts.length + 1, user, message };
//   posts.push(newPost);
//   res.status(201).json(newPost);
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const authenticate = require("../middleware/authMiddleware");

// Create a new post
router.post("/create", authenticate, async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Validate input
    if (!title || !content) {
      return res.status(400).json({ error: "Title and content are required" });
    }

    const newPost = new Post({ 
      title, 
      content, 
      author: req.user.id 
    });
    
    await newPost.save();
    
    // Populate author info before sending response
    const populatedPost = await Post.findById(newPost._id).populate("author", "name");
    
    res.status(201).json(populatedPost); // Send back the complete post
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Fetch all posts with pagination
router.get("/posts", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author", "name email")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "name"
        }
      });

    const totalPosts = await Post.countDocuments();
    
    res.json({
      posts,
      total: totalPosts,
      page,
      pages: Math.ceil(totalPosts / limit)
    });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: "Server error" });
  }
});
// Get a single post by ID with comments
router.get('/posts/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('author', 'name email')
      .populate({
        path: 'comments',
        populate: {
          path: 'author',
          select: 'name'
        }
      });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// Add a comment to a post
// Get comments for a post
router.get('/posts/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate('author', 'name')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

// Add comment to a post
router.post('/posts/:postId/comments', authenticate, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Comment text is required' });

    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const newComment = new Comment({
      text,
      author: req.user.id,
      post: req.params.postId
    });

    await newComment.save();
    
    // Update post's comments array
    await Post.findByIdAndUpdate(
      req.params.postId,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    // Return populated comment
    const populatedComment = await Comment.findById(newComment._id)
      .populate('author', 'name');

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;