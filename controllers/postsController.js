const PostsService = require('../services/postsService.js');

class PostsController {
    postsService = new PostsService();

    getPostAll = async(req, res, next)=> {
        try{
            const data = await this.postsService.getPostAll();
            res.status(200).send(data);
        }catch(err){
            next(err);
        };
    };

    getPostCategory = async(req, res, next)=> {
        const {category} = req.params;
        try{
            const data = await this.postsService.getPostCategory(category);
            res.status(200).send(data);
        }catch(err){
            next(err);
        };
    };

    getPostStack = async(req, res, next)=> {
        const {category, stack} = req.params;
        try{
            const data = await this.postsService.getPostStack(category, stack);
            res.status(200).send(data);
        }catch(err){
            next(err);
        };
    };

    createPost = async(req, res, next)=> {
        try{
            console.log(req.file, req.body)
            const post = {
                "title" : req.body.title,
                "tutor" : req.body.tutor,
                "description" : req.body.description,
                "category" : req.body.category,
                "stack" : req.body.stack,
                "price" : req.body.price,
                "thumbnail" : req.file.path
            }
            const data = await this. postsService.createPost(post)
            res.send(data)
        }catch(err){
            next(err)
        }
    };
}
module.exports = PostsController;

