const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// route to render form view GET
router.get("/createPost", (req, res) => {
  res.render("posts/createPost.ejs");
});

// route to process form info POST
router.post("/", async (req, res) => {
  try {
    if (req.session.user.admin) {
      req.body.owner = req.session.user._id;
      await Post.create(req.body);
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const comments = await Comment.find({ post: post._id }).populate(
      "author",
      "username"
    );
    res.render("posts/show.ejs", { post, comments });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.post("/:postId/comments", async (req, res) => {
  try {
    if (req.session.user) {
        req.body.post = req.params.postId;
        req.body.author = req.session.user._id;
        await Comment.create(req.body);
        res.redirect(`/posts/${req.params.postId}`);
    } else {
        res.redirect(`/auth/sign-in`);
    }
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/:postId/edit", async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId)
        res.render("posts/edit.ejs", {post})
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

router.put("/:postId", async (req, res) => {
    try {
        const {postId} = req.params
        await Post.findByIdAndUpdate(postId, req.body)
        res.redirect(`/posts/${postId}`)
    } catch (error) {
        console.log(error);
        res.redirect("/"); 
    }
})

router.delete("/:postId", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.postId)
        res.redirect("/")
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
})

module.exports = router;
