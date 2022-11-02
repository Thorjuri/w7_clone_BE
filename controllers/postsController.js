const PostsService = require('../services/postsService.js');

class PostsController {
    postsService = new PostsService();

    getPostAll = async (req, res, next) => {
        const { userId } = res.locals.user;
        const data = await this.postsService.getPostAll(userId);
        res.status(200).send(data);
    };

    getPostCategory = async (req, res, next) => {
        const { category } = req.params;
        const { userId } = res.locals.user;
        const data = await this.postsService.getPostCategory(category, userId);
        res.status(200).send(data);
    };

    getPostStack = async (req, res, next) => {
        const { category, stack } = req.params;
        const { userId } = res.locals.user;
        const data = await this.postsService.getPostStack(category, stack, userId);
        res.status(200).send(data);
    };
}

module.exports = PostsController;
