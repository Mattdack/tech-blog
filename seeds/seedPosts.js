const { Post } = require(`../models`);

const posts = [
    {
        title: `This is is a test post.`,
        content: `This is the first post for this tech blog. It will remain in perpetuity to as a relic of the past and the development that occured to make this site work. Also I think its cool to just leave here.`,
        UserId: 1,
    },
    {
        title: `This is also a test post.`,
        content: `This is the second post for this tech blog. It might remain in perpetuity as a relic of the past and the development that occured to make this site work. It may also be removed because its not the first post and therefor is clearly not as cool.`,
        UserId: 2,
    }
];

const seedPosts = () => Post.bulkCreate(posts);

module.exports = seedPosts;