const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const Post = mongoose.model("Post");
const multer = require("multer");

router.get("/allpost", (req, res) => {
  Post.find()
    .populate("postedBy", "_id name pic")
    .populate("comments.postedBy", "_id name")
    .sort('-createdAt')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => console.log(err));
});

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, photo, user } = req.body;
  if (!title || !body || !photo || !user) {
    res.status(422).json({ error: "Please add all the fields" });
  }
  const post = new Post({
    title,
    body,
    photo,
    postedBy: user,
  });
  post
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((errr) => console.log(err));
});

router.get('/getsubpost',requireLogin,(req,res)=>{

  Post.find({postedBy:{$in:req.user.following}})
  .populate("postedBy","_id name")
  .populate("comments.postedBy","_id name")
  .sort('-createdAt')
  .then(posts=>{
      res.json({posts})
  })
  .catch(err=>{
      console.log(err)
  })
})

router.get("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((mypost) => {
      res.json({ mypost });
    })
    .catch((err) => console.log(err));
});

router.put("/like", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body._id,
    {
      $push: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/unlike", requireLogin, (req, res) => {
  Post.findByIdAndUpdate(
    req.body._id,
    {
      $pull: { likes: req.user._id },
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

router.put("/comment", requireLogin, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body._id,
    {
      $push: { comments: comment },
    },
    { new: true }
  )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete("/deletepost/:postId", requireLogin, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate("postedBy", "_id")
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

const upload = multer({ dest: "uploads/" });

router.post("/file", upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error("NO FILE");
    error.httpStatusCode = 404;
  }
  res.send(file);
});

module.exports = router;
