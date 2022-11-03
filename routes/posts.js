const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/postsController.js');
const wrapAsyncController = require('../middlewares/wrapAsyncController');
const postController = new PostsController();

const postMiddleware = require('../middlewares/post_middleware.js')

// 1. 강의 목록 전체조회
router.get('/', postMiddleware, wrapAsyncController(postController.getPostAll));

// 2. 카테고리별 강의 조회
router.get('/:category', postMiddleware, wrapAsyncController(postController.getPostCategory));

// 3. 카테고리+스택별 강의 조회
router.get('/:category/:stack', postMiddleware, wrapAsyncController(postController.getPostStack));

 
module.exports = router;