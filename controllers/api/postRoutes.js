const router = require(`express`).Router();
const { User, Post, Comment } = require(`../../models`);

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

    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/:id`, async (req, res) => {
  try {
    const onePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
        {
          model: Comment,
        },
      ],
    });
    if (!onePost) {
      return res.status(404).json({ msg: `Post not found!` });
    }
    res.status(200).json(onePost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/`, async (req, res) => {
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.body.userId,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(`/:id`, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
        UserId: req.body.userId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updatedPost[0] === 0) {
      return res.status(404).json({ msg: `Provided Post ID not found.` });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete(`/:id`, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedUser === 0) {
      return res.status(404).json({ msg: `Provided Post ID not found.` });
    }
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
