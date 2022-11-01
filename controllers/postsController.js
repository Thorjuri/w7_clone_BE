const PostsService = require('../services/postsService.js');

class PostsController {
    postsService = new PostsService();

    getPostAll = async (req, res, next) => {
        const data = await this.postsService.getPostAll();
        res.status(200).send(data);
    };

    getPostCategory = async (req, res, next) => {
        const { category } = req.params;
        const data = await this.postsService.getPostCategory(category);
        res.status(200).send(data);
    };

    getPostStack = async (req, res, next) => {
        const { category, stack } = req.params;
        const data = await this.postsService.getPostStack(category, stack);
        res.status(200).send(data);
    };
}

module.exports = PostsController;
