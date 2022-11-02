<<<<<<< HEAD
const { Posts } = require('../models');
const { Op } = require('sequelize')

class PostsRepository {
//aggregate('stack', 'DISTINCT', { plain: false }) // 컬럼의 종류를 1개씩 
    getPostAll = async()=> {
=======
const { Posts, Likes, Buckets } = require('../models');

class PostsRepository {


    getLikeslist = async(userId)=> {
        const data = await Likes.findAll({
            attributes : ['postId'],
            where : { userId }
        })
        const likeList = data.map((val)=> { return val.postId})
        return likeList;
    }

    getBucketslist = async(userId)=> {
        const data = await Buckets.findAll({
            attributes : ['postId'],
            where : { userId }
        })
        const bucketList = data.map((val, idx, arr)=> { return val.postId})
        return bucketList;
    }

    getPostAll = async(userId)=> {
        let likes;
        let buckets;
        if(userId){
            likes = await this.getLikeslist(userId)
            buckets = await this.getBucketslist(userId)
        }
>>>>>>> d5163f55dcceef635dd5cbece12bdca7143dc2aa
        const data = await Posts.findAll({});
        const stacks = data.map((val)=> val.stack)
        const stacklist = [...new Set(stacks)]
        return {likes, buckets, stacklist, data} ;
    };

    getPostCategory = async(category, userId)=> {
        let likes;
        let buckets;
        if(userId){
            likes = await this.getLikeslist(userId)
            buckets = await this.getBucketslist(userId)
        }
        const data = await Posts.findAll({ where: { category }});
        return {likes, buckets, data};
    };

    getPostStack = async(category, stack, userId)=> {
        let likes;
        let buckets;
        if(userId){
            likes = await this.getLikeslist(userId)
            buckets = await this.getBucketslist(userId)
        }
        const data = await Posts.findAll({ where: { category, stack}});
        return {likes, buckets, data};
    };
};

module.exports = PostsRepository;