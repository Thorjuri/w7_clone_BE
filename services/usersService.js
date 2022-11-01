const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // 토큰 모듈

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
            password = bcrypt.hashSync(password, 10); // 암호화

            const createOption = { loginId, password };
            return await this.UserRepository.signUpUser(
                createOption
            );
        } else throw new Error('데이터 저장 과정 중 에러 발생');
    };

    checkId = async (loginId) => {
        const findOption = { where: { loginId } };
        const findUser = await this.UserRepository.findUser(findOption);
        if (findUser) throw Error('해당 아이디는 사용할 수 없습니다');
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
                return jwt.sign(
                    { userId: loginUser.userId },
                    process.env.SECRET_KEY,
                    { expiresIn: '24h' }
                );
            } else throw new Error('아이디 또는 비밀번호가 다릅니다');
        }
    };

    getLikesList = async (userId) => {
        const option = { where: { userId } };
        return await this.UserRepository.getLikesList(option);
    };

    getBucketsList = async (userId) => {
        const option = { where: { userId } };
        return await this.UserRepository.getBucketsList(option);
    };
}

module.exports = UserService;
