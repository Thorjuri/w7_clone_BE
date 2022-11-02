const PostsService = require('../services/postsService.js');

class PostsController {
    postsService = new PostsService();

    getPostAll = async(req, res, next)=> {
        const { userId } = res.locals.user;
        try{
            const data = await this.postsService.getPostAll(userId);
            res.status(200).send(data);
        }catch(err){
            next(err);
        };
    };

    getPostCategory = async(req, res, next)=> {
        const {category} = req.params;
        const { userId } = res.locals.user;
        try{
            const data = await this.postsService.getPostCategory(category, userId);
            res.status(200).send(data);
        }catch(err){
            next(err);
        };
    };

    getPostStack = async(req, res, next)=> {
        const {category, stack} = req.params;
        const { userId } = res.locals.user;
        try{
            const data = await this.postsService.getPostStack(category, stack, userId);
            res.status(200).send(data);
        }catch(err){
            next(err);
        };
    };

};

module.exports = PostsController;

