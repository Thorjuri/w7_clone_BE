const { Likes, Buckets } = require('../models');

class FeatureRepository {
    updateLike = async (option) => {
        try {
            // userId가 postId를 좋아요한 데이터가 존재하는지 유무로 판단.
            const checkData = await Likes.findOne({ where: option });

            checkData
                ? await Likes.destroy({ where: option })
                : await Likes.create(option);
            return checkData ? false : true; // checkData가 true면 없앴기 때문에 fasle 반환.
        } catch (err) {
            console.log(err);
            err = new Error(`Feature Repository Error[Likes]`);
            err.status = 500;
            throw err;
        }
    };

    updateBucket = async (option) => {
        try {
            const checkData = await Buckets.findOne({ where: option });

            checkData
                ? await Buckets.destroy({ where: option })
                : await Buckets.create(option);
            return checkData ? false : true;
        } catch (err) {
            console.log(err);
            err = new Error(`Feature Repository Error[Buckets]`);
            err.status = 500;
            throw err;
        }
    };
}

module.exports = FeatureRepository;
