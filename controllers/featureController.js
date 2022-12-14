const FeatureService = require('../services/featureService');

class FeatureController {
    featureService = new FeatureService();

    updateLike = async (req, res) => {
            const { postId } = req.params;
            const { userId } = res.locals.user;

            // params 값이 잘못입력되거나 없을 시.
            if (postId === false) {
                const err = new Error(`FeatureController Error`);
                err.status = 404;
                err.message = '좋아요 할 강의가 없습니다.'
                throw err;
            }

            const result = await this.featureService.updateLike(postId, userId);
            res.header({
                "access-control-allow-origin" : "*",
                "access-control-expose-headers" : "Authorization"
                })
            result
                ? res.status(201).send(result) // 좋아요 누를 시 send(true)
                : res.status(201).send(result); // 좋아요 취소 시 send(false)
    };

    updateBucket = async (req, res) => {
            const { postId } = req.params;
            const { userId } = res.locals.user;

            if (postId === undefined) {
                const err = new Error(`FeatureController Error`);
                err.status = 404;
                err.message = '장바구니에 담을 강의가 없습니다.'
                throw err;
            }

            const result = await this.featureService.updateBucket(
                postId,
                userId
            );
            res.header({
                "access-control-allow-origin" : "*",
                "access-control-expose-headers" : "Authorization"
                })
            result
                ? res.status(201).send(result)
                : res.status(201).send(result);
    };
}

module.exports = FeatureController;
