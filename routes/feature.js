const express = require('express');
const router = express.Router();
const FeatureController = require('../controllers/featureController');
const AuthMiddleware = require('../middlewares/auth_middleware');
const wrapAsyncController = require('../middlewares/wrapAsyncController');

const featureController = new FeatureController();

router.patch('/likes/:postId', AuthMiddleware, wrapAsyncController(featureController.updateLike));
router.patch('/buckets/:postId', AuthMiddleware, wrapAsyncController(featureController.updateBucket));

module.exports = router;
