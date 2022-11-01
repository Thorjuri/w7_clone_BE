const { Posts } = require('../models');

class PostsRepository {

    getPostAll = async()=> {
        const data = await Posts.findAll({});
        return data;
    };

    getPostCategory = async(category)=> {
        const data = await Posts.findAll({ where: { category }});
        return data;
    };

    getPostStack = async(category, stack)=> {
        const data = await Posts.findAll({ where: { category, stack}});
        return data;
    };

    createPost = async(post)=> {
        const data = await Posts.create(post)
        return data;
    }
};

module.exports = PostsRepository;