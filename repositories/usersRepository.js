const { Users, Likes, Buckets } = require('../models'); // mysql  유저 스키마 모듈

class UserRepository {
    constructor() {
        this.Users = Users;
        this.Likes = Likes;
        this.Buckets = Buckets;
    }

    findUser = async (findOption) => {
        return await this.Users.findOne(findOption);
    };

    signUpUser = async (createOption) => {
        return await this.Users.create(createOption);
    };

    loginUser = async (option) => {
        return await this.Users.findOne(option);
    };

    getLikesList = async (option) => {
        return await this.Likes.findAll(option);
    };

    getBucketsList = async (option) => {
        return await this.Buckets.findAll(option);
    };
}

module.exports = UserRepository;
