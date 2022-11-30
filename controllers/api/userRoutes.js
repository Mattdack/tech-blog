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

router.get(`/:id`, async (req, res) => {
  try {
    const oneUser = await User.findByPk(req.params.id, {
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

    if (!oneUser) {
      return res
        .status(404)
        .json({ msg: `There was not user found with that ID.` });
    }
    res.status(200).json(oneUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(`/`, async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
      
      res.json({ username: newUser, message: 'Account Created and you are now logged in!' });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put(`/:id`, async (req, res) => {
  try {
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
      return res.status(404).json({ msg: `Provided User ID not found` });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete(`/:id`, async (req, res) => {
  try {
    const deletedUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedUser === 0) {
      return res.status(404).json({ msg: `Provided User ID not found` });
    }

    res.status(200).json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log("Fetch Made It ====================")
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username, please try again' });
      return;
    }

    console.log("Found User ======================")
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect password, please try again' });
      return;
    }
    console.log("Correct Password ==================")
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ username: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
