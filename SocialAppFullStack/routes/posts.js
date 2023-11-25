const router = require("express").Router();
const Post = require("../modals/Post");
const mongoose = require("mongoose");
const upload = require("../middleware/upload");

// add post
router.post("/addpost", upload.single("imageUrl"), async (req, res) => {
  try {
    const newPost = new Post(req.body);
    if (req.file) {
      newPost.imageUrl = req.file.filename;
    }
    newPost
      .save()
      .then(() => {
        res
          .status(200)
          .json({ status: true, message: "post aded successfully !" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
});

// update post
router.put("/updatepost/:id", async (req, res) => {
  try {
    Post.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(() =>
        res.status(200).json({
          status: true,
          message: "post data updated successfully",
        })
      )
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete post
router.delete("/deletepost/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid user ID format",
      });
    }
    const post = await Post.findOne({ _id: req.params.id });
    if (post) {
      Post.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res
          .status(200)
          .json({ status: true, message: "Post deleted successfully" });
      });
    } else {
      res
        .status(200)
        .json({ status: false, message: "Post not found with this id" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//get post
router.get("/getpost", (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        status: true,
        message: "posts fetched successfully!",
        data: posts,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get post by id
router.get("/getpost/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    // Check if the provided ID is a valid ObjectId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid user ID format",
      });
    }

    const post = await Post.findOne({ _id: userId });
    if (post) {
      return res.status(200).json({
        status: true,
        message: "Post fetched successfully",
        data: post,
      });
    } else {
      return res.status(200).json({
        status: false,
        message: "Post not found",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/like/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    let isLiked = false;
    post.likes.map((item) => {
      if (item == req.body.userId) {
        isLiked = true;
      }
    });

    console.log(isLiked);
    if (isLiked) {
      const res1 = await Post.updateOne(
        { _id: req.params.id },
        { $pull: { likes: req.body.userId } }
      );

      res
        .status(200)
        .json({ status: true, message: " like  removed successfully" });
    } else {
      const res1 = await Post.updateOne(
        { _id: req.params.id },
        { $push: { likes: req.body.userId } }
      );
      res
        .status(200)
        .json({ status: true, message: " post liked  successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
