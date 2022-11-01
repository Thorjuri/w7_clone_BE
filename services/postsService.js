const PostsRepository = require('../repositories/postsRepository.js');

class PostsService {
    postsRepository = new PostsRepository();

    getPostAll = async()=> {
        const data = await this.postsRepository.getPostAll();
        if(!data){throw new Error ({ name: 'error', message: '강좌가 존재하지 않습니다'})};
        return data;
    };

    getPostCategory = async(category)=> {
        const data = await this.postsRepository.getPostCategory(category);
        if(data.length===0){throw new Error ('강좌가 존재하지 않습니다')};
        return data;
    };

    getPostStack = async(category, stack)=> {
        const data = await this.postsRepository.getPostStack(category, stack);
        if(data.length===0){throw new Error ('강좌가 존재하지 않습니다')};
        return data;
    };

    createPost = async(post)=> {
        const data = await this.postsRepository.createPost(post);
        return data;
    };

};

module.exports = PostsService;