const PostsRepository = require('../repositories/postsRepository.js');

class PostsService {
    postsRepository = new PostsRepository();

    getPostAll = async (userId) => {
        const data = await this.postsRepository.getPostAll(userId);
        const postdata = data.data;
        const likelist = data.likes;
        const bucketList = data.buckets;
        const stack = data.stacklist;

        if (!data.data) {
            throw new Error({
                name: 'error',
                message: '강좌가 존재하지 않습니다',
            });
        }

        if (likelist || bucketList) {
            postdata.map((post) => {
                if (likelist.indexOf(post.postId) !== -1) {
                    if (bucketList.indexOf(post.postId) !== -1)
                        post.isCart = true;
                    post.isHeart = true;
                } else {
                    if (bucketList.indexOf(post.postId) !== -1)
                        post.isCart = true;
                }
                return post;
            });

            return { stack, postdata };
        } else return { stack, postdata };
        
    };

    getPostCategory = async (category, userId) => {
        const data = await this.postsRepository.getPostCategory(
            category,
            userId
        );
        const postdata = data.data;
        const likelist = data.likes;
        const bucketList = data.buckets;
        const stack = data.stacklist;
        if (data.data.length === 0) {
            throw new Error('강좌가 존재하지 않습니다');
        }

        if (likelist || bucketList) {
            postdata.map((post) => {
                if (likelist.indexOf(post.postId) !== -1) {
                    if (bucketList.indexOf(post.postId) !== -1)
                        post.isCart = true;
                    post.isHeart = true;
                } else {
                    if (bucketList.indexOf(post.postId) !== -1)
                        post.isCart = true;
                }
                return post;
            });

            return { stack, postdata };
        } else return { stack, postdata };
        
    };

    getPostStack = async (category, stack, userId) => {
        const data = await this.postsRepository.getPostStack(
            category,
            stack,
            userId
        );
        if (data.data.length === 0) {
            throw new Error('강좌가 존재하지 않습니다');
        }
        return data;
    };
}

module.exports = PostsService;
