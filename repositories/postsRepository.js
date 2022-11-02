const { Posts } = require('../models');
const { Op } = require('sequelize')

class PostsRepository {
//aggregate('stack', 'DISTINCT', { plain: false }) // 컬럼의 종류를 1개씩 
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
};

module.exports = PostsRepository;