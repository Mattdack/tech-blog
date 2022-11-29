const { Comment } = require(`../models`);

const comments = [
    {
        content: `I agree with the author of this blog. This post should definitely be maintained as the history of this tech blog.`,
        UserId: 3,
        PostId: 1
    },
    {
        content: `I agree with the author of this blog. The second post doesn't deserve the fame and persistence that the originality of the first blog provides.`,
        UserId: 3,
        PostId: 2,
    },
    {
        content: `While it may not be the first post, it was still integral in the testing of this blog. I hope other users of the site will come to appreciate that.`,
        UserId: 1,
        PostId: 2,
    }
];

const seedComments = () => Comment.bulkCreate(comments);

module.exports = seedComments;