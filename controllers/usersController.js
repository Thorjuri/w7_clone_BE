const UserService = require('../services/usersService');

class UsersController {
    constructor() {
        this.UserService = new UserService();
    }

    signUpUser = async (req, res, next) => {
        try {
            if (req.headers.authorization) {
                const err = new Error('이미 로그인이 되어있습니다.');
                err.statusCode = 401;
                throw err;
            } else {
                const { loginId, password } = req.body;

                await this.UserService.signUpUser(loginId, password);
                res.status(201).send('가입 완료');
            }
        } catch (err) {
            next(err);
        }
    };

    checkId = async (req, res, next) => {
        try {
            const { loginId } = req.body;

            await this.UserService.checkId(loginId);
            res.status(200).send('해당 아이디는 사용 가능합니다');
        } catch (err) {
            next(err);
        }
    };

    loginUser = async (req, res, next) => {
        try {
            if (req.headers.authorization) {
                const err = new Error('이미 로그인이 되어있습니다.');
                err.statusCode = 401;
                throw err;
            } else {
                const { loginId, password } = req.body;

                const LoginUser = await this.UserService.loginUser(
                    loginId,
                    password
                );
                res.status(201).send(LoginUser);
            }
        } catch (err) {
            next(err);
        }
    };

    userLikes = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;

            const likeslist = await this.UserService.getLikesList(userId);
            res.status(200).json(likeslist);
        } catch (err) {
            next(err);
        }
    };

    userBuckets = async (req, res, next) => {
        try {
            const { userId } = res.locals.user;

            const bucketslist = await this.UserService.getBucketsList(userId);
            res.status(200).json(bucketslist);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = UsersController;
