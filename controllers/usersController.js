const UserService = require('../services/usersService');

class UsersController {
    constructor() {
        this.UserService = new UserService();
    }

    signUpUser = async (req, res) => {
        if (req.headers.authorization) {
            const err = new Error(`UserController Error`);
            err.status = 401;
            err.message = '이미 로그인이 되어있습니다.'
            throw err;
        }
         else {
            const { loginId, password } = req.body;

            await this.UserService.signUpUser(loginId, password);
            res.status(201).send('가입 완료');
        }
    };

    checkId = async (req, res) => {
        const { loginId } = req.body;

        await this.UserService.checkId(loginId);
        res.status(200).send('해당 아이디는 사용 가능합니다');
    };

    loginUser = async (req, res) => {
        if (req.headers.authorization) {
            const err = new Error(`UserController Error`);
            err.status = 401;
            err.message = '이미 로그인이 되어있습니다.'
            throw err;
        } else {
            const { loginId, password } = req.body;

            const LoginUser = await this.UserService.loginUser(
                loginId,
                password
            );
            res.status(201).send(LoginUser);
        }
    };

    userLikes = async (req, res) => {
        const { userId } = res.locals.user;

        const likeslist = await this.UserService.getLikesList(userId);
        res.status(200).json(likeslist);
    };

    userBuckets = async (req, res) => {
        const { userId } = res.locals.user;

        const bucketslist = await this.UserService.getBucketsList(userId);
        res.status(200).json(bucketslist);
    };
}

module.exports = UsersController;
