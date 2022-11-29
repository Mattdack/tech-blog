const express = require(`express`);
const router = express.Router();
const { User, Post, Comment } = require(`../models`);

router.get(`/`, async (req, res) => {
  try {
    const allPosts = Post.findAll({
      include: [
        {
          model: User,
          attributes: `username`,
        },
        {
          model: Comment,
        },
      ],
    });

    const allPostsReady = allPosts.map((post) => post.get({ plain: true }));

    res.render(`homepage`, {
      Posts: allPostsReady,
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

router.get(`/signup`, async (req,res) => {
    res.render(`signup`, {});
})

router.get(`/dashboard`, async (req, res) => {
  try {
    if(!res.sessions.logged_in) {
        res.redirect(`/status`);
    }
    const usersPosts = await Post.findAll({
        where: {
            UserId: req.session.user_id,
        },
    });

    const usersPostsReady = usersPosts.map((post) => post.get({ plain:true }));

    res.render(`dashboard`, {
        Posts: usersPostsReady,
        logged_in: req.session.logged_in
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
