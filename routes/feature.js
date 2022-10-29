const express = require('express');
const router = express.Router();
const FeatureController = require('../controllers/featureController');
const AuthMiddleware = require('../middlewares/auth_middleware');

const featureController = new FeatureController();

router.patch('/likes/:postId', AuthMiddleware, featureController.updateLike);
router.patch('/buckets/:postId', AuthMiddleware, featureController.updateBucket);

module.exports = router;
