const PostsRepository = require('../repositories/postsRepository.js');

class PostsService {
    postsRepository = new PostsRepository();

    getPostAll = async (userId) => {
        const data = await this.postsRepository.getPostAll(userId);
        if (!data.data) {
            const err = new Error(`PostService Error`);
            err.status = 404;
            err.message = '강좌가 존재하지 않습니다.';
            throw err;
        }
        return data;
    };

    getPostCategory = async (category, userId) => {
        const data = await this.postsRepository.getPostCategory(
            category,
            userId
        );
        if (data.data.length === 0) {
            const err = new Error(`PostService Error`);
            err.status = 404;
            err.message = '강좌가 존재하지 않습니다.';
            throw err;
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
            const err = new Error(`PostService Error`);
            err.status = 404;
            err.message = '강좌가 존재하지 않습니다.';
            throw err;
        }
        return data;
    };
}

module.exports = PostsService;
