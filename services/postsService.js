const PostsRepository = require('../repositories/postsRepository.js');

class PostsService {
    postsRepository = new PostsRepository();

    getPostAll = async (userId) => {
        const data = await this.postsRepository.getPostAll(userId);
        if (!data.data) {
            throw new Error({
                name: 'PostService Error',
                statusCode: 404,
                message: '강좌가 존재하지 않습니다.',
            });
        }
        return data;
    };

    getPostCategory = async (category, userId) => {
        const data = await this.postsRepository.getPostCategory(
            category,
            userId
        );
        if (data.data.length === 0) {
            throw new Error({
                name: 'PostService Error',
                statusCode: 404,
                message: '강좌가 존재하지 않습니다.',
            });
        }
        return data;
    };

    getPostStack = async (category, stack, userId) => {
        const data = await this.postsRepository.getPostStack(
            category,
            stack,
            userId
        );
        if (data.data.length === 0) {
            throw new Error({
                name: 'PostService Error',
                statusCode: 404,
                message: '강좌가 존재하지 않습니다.',
            });
        }
        return data;
    };
}

module.exports = PostsService;
