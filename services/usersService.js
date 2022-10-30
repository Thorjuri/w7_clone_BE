const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // 토큰 모듈
const PostsController = require('../controllers/postsController');
const { Posts } = require("../models")

require('dotenv').config(); // 닷 env

const UserRepository = require('../repositories/usersRepository');

class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
    }

    signUpUser = async (loginId, password) => {
        const findOption = { where: { loginId } };
        const findUser = await this.UserRepository.findUser(findOption);

        if (!findUser) {
            const hashedPw = bcrypt.hashSync(password, 10); // 암호화
            password = hashedPw;

            const createOption = { loginId, password };
            const signUpUser = await this.UserRepository.signUpUser(
                createOption
            );
            return signUpUser;
        } else throw new Error('데이터 저장 과정 중 에러 발생');
    };

    checkId = async (loginId) => {
        const findOption = { where: { loginId } };
        const findUser = await this.UserRepository.findUser(findOption);
        if (findUser) throw new Error('해당 아이디는 사용할 수 없습니다');
        else return findUser;
    };

    loginUser = async (loginId, password) => {
        const option = { where: { loginId } };
        const loginUser = await this.UserRepository.loginUser(option);
        if (!loginUser) {
            throw new Error('아이디 또는 비밀번호를 확인 부탁드립니다');
        } else {
            const match = bcrypt.compareSync(password, loginUser.password); // 재 암호화 후 동일 시 불리언 반환
            if (match) {
                const token = jwt.sign(
                    { userId: loginUser.userId , loginId:loginUser.loginId },
                    process.env.SECRET_KEY,
                    { expiresIn: '24h' }
                );
                return token;
            } else throw new Error('아이디 또는 비밀번호가 다릅니다');
        }
    };

    getLikesList = async (userId) => {
        const option = {
            where: { userId },
            attributes:["postId","userId"],
            include:{
                model:Posts,
                attributes:{exclude:["postId","createdAt","deletedAt"]} 
            }
        };
        const likeslist = await this.UserRepository.getLikesList(option);
            
        return likeslist.map((post)=>  {
            return {
                "userId":post.userId,
                "postId":post.postId,
                "title":post.Post.title,
                "tuter":post.Post.tutor,
                "description":post.Post.description,
                "category":post.Post.category,
                "stack":post.Post.category,
                "price":post.Post.price,
                "thumbnail":post.Post.thumbnail,
                "updatedAt":post.Post.updatedAt
            }
           
        });
    };

    getBucketsList = async (userId) => {
        const option = {
            where: { userId },
            attributes:["postId","userId"],
            include:{
                model:Posts,
                attributes:{exclude:["postId","createdAt","deletedAt"]} 
            }
        };
        const bucketslist = await this.UserRepository.getBucketsList(option);
        return bucketslist.map((post)=>  {
            return {
                "userId":post.userId,
                "postId":post.postId,
                "title":post.Post.title,
                "tuter":post.Post.tutor,
                "description":post.Post.description,
                "category":post.Post.category,
                "stack":post.Post.category,
                "price":post.Post.price,
                "thumbnail":post.Post.thumbnail,
                "updatedAt":post.Post.updatedAt
            }
           
        });
    };
}

module.exports = UserService;
