const router = require(`express`).Router();
const { User, Post, Comment } = require(`../../models`);

router.get(`/`, async (req, res) => {
  try {
    const allComments = Comment.findAll({
      include: [
        {
          model: User,
          attributes: `username`,
        },
        {
          model: Post,
          attributes: `title`,
        },
      ],
    });

    res.status(200).json(allComments);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/id`, async (req, res) => {
  try {
    const oneComment = Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: `username`,
        },
        {
          model: Post,
          attributes: `title`,
        },
      ],
    });
    if (!oneComment) {
      return res.status(404).json({ msg: `Comment not found!` });
    }
    res.status(200).json(oneComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/`, async (req, res) => {
  try {
    const newComment = Comment.create({
      content: req.body.content,
      UserId: req.body.userId,
      PostId: req.body.postId,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(`/id`, async (req, res) => {
  try {
    const updatedComment = await Comment.update(
      {
        content: req.body.content,
        UserId: req.body.userId,
        PostId: req.body.postId,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (updatedComment[0] === 0) {
      return res.status(404).json({ msg: `Provided Comment ID not found.` });
    }
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete(`/id`, async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedComment === 0) {
      return res.status(404).json({ msg: `Provided Comment ID not found.` });
    }
    res.status(200).json(deletedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
