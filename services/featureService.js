const FeatureRepository = require('../repositories/featureRepository');

class FeatureService {
    featureRepository = new FeatureRepository();

    updateLike = async (postId, userId) => {
        try {
            // DB method 검색 조건
            const option = { postId, userId };

            const likeResult = await this.featureRepository.updateLike(option);
            return likeResult;
        } catch (err) {
            throw err;
        }
    };

    updateBucket = async (postId, userId) => {
        try {
            const option = { postId, userId };

            const bucketResult = await this.featureRepository.updateBucket(
                option
            );
            return bucketResult;
        } catch (err) {
            throw err;
        }
    };
}

module.exports = FeatureService;
