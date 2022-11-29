const { User } = require(`../models`);

const users = [
    {
        username: `mattdack`,
        password: `securePassword2`,
    },
    {
        username: `matthewdacanay`,
        password: `differentPassword1`,
    },
    {
        username: `BrookeByun`,
        password: `WildCatLover69`,
    },
]

const seedUsers = () => User.bulkCreate(users, {individualHooks: true});

module.exports = seedUsers;