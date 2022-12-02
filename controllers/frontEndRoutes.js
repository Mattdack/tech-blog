const express = require(`express`);
const router = express.Router();
const { User, Post, Comment } = require(`../models`);

router.get(`/`, async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });

    const allPostsReady = allPosts.map((post) => post.get({ plain: true }));
    res.render(`homepage`, {
      Posts: allPostsReady,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/status`, async (req, res) => {
  res.render(`status`, {});
});

router.get(`/login`, async (req, res) => {
  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

router.get(`/signup`, async (req, res) => {
  res.render(`signup`, {});
});

router.get(`/dashboard`, async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect(`/status`);
  }
  try {
    const usersPosts = await Post.findAll({
      where: {
        UserId: req.session.user_id,
      },
    });

    const usersPostsReady = usersPosts.map((post) => post.get({ plain: true }));

    res.render(`dashboard`, {
      Posts: usersPostsReady,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/newPost`, async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect(`/status`);
  }
  try {
    res.render(`newPost`, {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/onePost/:id`, async (req, res) => {
  try {
    const onePost = await Post.findByPk(parseInt(req.params.id), {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: [
            {
              model:User,
            },
          ]
        },
      ],
    });
    const onePostReady = onePost.get({ plain: true });
    res.render(`onePost`, {
      Posts: onePostReady,
      Comments: onePostReady.Comments,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/updatePost/:id`, async (req, res) => {
  if (!req.session.logged_in) {
    return res.redirect(`/status`);
  }
  try {
    const onePost = await Post.findByPk(parseInt(req.params.id), {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
          include: [
            {
              model:User,
            },
          ]
        },
      ],
    });
    const onePostReady = onePost.get({ plain: true });
    res.render(`updatePost`, {
      Posts: onePostReady,
      Comments: onePostReady.Comments,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sessions", (req, res) => {
  try{
    res.status(200).json(req.session);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
