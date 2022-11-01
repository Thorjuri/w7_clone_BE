const FeatureRepository = require('../repositories/featureRepository');

class FeatureService {
    featureRepository = new FeatureRepository();

    updateLike = async (postId, userId) => {
            // DB method 검색 조건
            const option = { postId, userId };

            const likeResult = await this.featureRepository.updateLike(option);
            return likeResult;
    };

    updateBucket = async (postId, userId) => {
            const option = { postId, userId };

            const bucketResult = await this.featureRepository.updateBucket(
                option
            );
            return bucketResult;
    };
}

module.exports = FeatureService;
