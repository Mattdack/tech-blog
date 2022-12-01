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
    console.log(allPostsReady[0]);
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

router.get(`/:id`, async (req, res) => {
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
        },
      ],
    });
    console.log(onePost + "====================")
    const onePostReady = onePost.get({ plain: true });
    console.log(onePostReady)
    res.render(`onePost`, {
      Posts: onePostReady,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/sessions", (req, res) => {
  res.json(req.session);
});

module.exports = router;
