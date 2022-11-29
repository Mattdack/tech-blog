const sequelize = require("../config/connection");
const seedUsers = require(`./seedUsers`);
const seedPosts = require(`./seedPosts`);
const seedComments = require(`./seedComments`);

const seedAll = async () => {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.sync({ force: true });

    await seedUsers();
    await seedPosts();
    await seedComments();

    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    process.exit(0);
}

seedAll();