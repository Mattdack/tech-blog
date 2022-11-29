const router = require(`express`).Router();
const { User, Post, Comment } = require(`../../models`);

router.get(`/`, async (req, res) => {
  try {
    const allUsers = await User.findAll({
      include: [
        {
          model: Post,
        },
        {
          model: Comment,
          attributes: [`content`],
        },
      ],
    });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get(`/id`, async (req, res) => {
    try{
        const oneUser = await User.findByPk(req.params.id, {});

        if(!oneUser) {
            return res.status(404).json({msg: `There was not user found with that ID.`});
        }
        res.status(200).json(oneUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post(`/`, async (req, res) => {
    try{
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
        });
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put(`/id`, async (req,res) => {
    try{
        const updatedUser = await User.update(
            {
                username: req.body.username,
                password: req.body.password,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (updatedUser[0] === 0) {
            return res.status(404).json({msg: `Provided User ID not found`});
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete(`/id`, async (req, res) => {
    try{
        const deletedUser = await User.destroy({
            where: {
                id: req.params.id,
            }
        });
        
        if(deletedUser === 0) {
            return res.status(404).json({msg: `Provided User ID not found`})
        }
        
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;