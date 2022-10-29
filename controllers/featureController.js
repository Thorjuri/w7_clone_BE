const FeatureService = require('../services/featureService');

class FeatureController {
    featureService = new FeatureService();

    updateLike = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals.user;

            // params 값이 잘못입력되거나 없을 시.
            if (postId === undefined) {
                const err = new Error(`좋아요할 강의가 없습니다.`);
                err.statusCode = 400;
                throw err;
            }

            const result = await this.featureService.updateLike(postId, userId);
            result
                ? res.status(201).send(result) // 좋아요 누를 시 send(true)
                : res.status(201).send(result); // 좋아요 취소 시 send(false)
        } catch (err) {
            next();
        }
    };

    updateBucket = async (req, res, next) => {
        try {
            const { postId } = req.params;
            const { userId } = res.locals.user;

            if (postId === undefined) {
                const err = new Error(`장바구니에 담을 강의가 없습니다.`);
                err.statusCode = 400;
                throw err;
            }

            const result = await this.featureService.updateBucket(
                postId,
                userId
            );
            result
                ? res.status(201).send(result)
                : res.status(201).send(result);
        } catch (err) {
            next();
        }
    };
}

module.exports = FeatureController;
