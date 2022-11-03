const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // 토큰 모듈
const PostsController = require('../controllers/postsController');
const { Posts } = require('../models');

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
        } else {
            const err = new Error(`UserService Error`);
            err.status = 500;
            err.message = '데이터 저장 과정 중 에러 발생';
            throw err;
        }
    };

    checkId = async (loginId) => {
        const findOption = { where: { loginId } };
        const findUser = await this.UserRepository.findUser(findOption);
        if (findUser) {
            const err = new Error(`UserService Error`);
            err.status = 400;
            err.message = '해당 아이디는 사용할 수 없습니다.';
            throw err;
        } else return findUser;
    };

    loginUser = async (loginId, password) => {
        const option = { where: { loginId } };
        const loginUser = await this.UserRepository.loginUser(option);
        if (!loginUser) {
            const err = new Error(`UserService Error`);
            err.status = 400;
            err.message = '아이디 또는 비밀번호를 확인해주세요.';
            throw err;
        } else {
            const match = bcrypt.compareSync(password, loginUser.password); // 재 암호화 후 동일 시 불리언 반환
            if (match) {
                const token = jwt.sign(
                    { userId: loginUser.userId, loginId: loginUser.loginId },
                    process.env.SECRET_KEY,
                    { expiresIn: '24h' }
                );
                return {
                    token,
                    userId: loginUser.userId,
                    loginId: loginUser.loginId,
                };
            } else {
                const err = new Error(`UserService Error`);
                err.status = 400;
                err.message = '아이디 또는 비밀번호가 다릅니다.';
                throw err;
            }
        }
    };

    getLikesList = async (userId) => {
        const option = {
            where: { userId },
            attributes: ['postId', 'userId'],
            include: {
                model: Posts,
                attributes: { exclude: ['postId', 'createdAt', 'deletedAt'] },
            },
        };
        const likeslist = await this.UserRepository.getLikesList(option);

        if (likeslist.length) {
            return likeslist.map((post) => {
                return {
                    userId: post.userId,
                    postId: post.postId,
                    title: post.Post.title,
                    tuter: post.Post.tutor,
                    description: post.Post.description,
                    category: post.Post.category,
                    stack: post.Post.category,
                    price: post.Post.price,
                    thumbnail: post.Post.thumbnail,
                    updatedAt: post.Post.updatedAt,
                };
            });
        } else {
            const err = new Error(`UserService Error`);
            err.status = 404;
            err.message = '좋아요에 등록된 강의가 없습니다.';
            throw err;
        }
    };

    getBucketsList = async (userId) => {
        const option = {
            where: { userId },
            attributes: ['postId', 'userId'],
            include: {
                model: Posts,
                attributes: { exclude: ['postId', 'createdAt', 'deletedAt'] },
            },
        };
        const bucketslist = await this.UserRepository.getBucketsList(option);
        if (bucketslist.length) {
            return bucketslist.map((post) => {
                return {
                    userId: post.userId,
                    postId: post.postId,
                    title: post.Post.title,
                    tuter: post.Post.tutor,
                    description: post.Post.description,
                    category: post.Post.category,
                    stack: post.Post.category,
                    price: post.Post.price,
                    thumbnail: post.Post.thumbnail,
                    updatedAt: post.Post.updatedAt,
                };
            });
        } else {
            const err = new Error(`UserService Error`);
            err.status = 404;
            err.message = '장바구니에 등록된 강의가 없습니다.';
            throw err;
        }
    };
}

module.exports = UserService;
