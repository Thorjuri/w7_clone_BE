const express = require('express');
const router = express.Router();
const FeatureController = require('../controllers/featureController');
const AuthMiddleware = require('../middlewares/auth_middleware');

const featureController = new FeatureController();

router.post('/likes/:postId', AuthMiddleware, featureController.updateLike);
router.post('/buckets/:postId', AuthMiddleware, featureController.updateBucket);

module.exports = router;
