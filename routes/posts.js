const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/postsController.js');
const postController = new PostsController();

const postMiddleware = require('../middlewares/post_middleware.js')

// 1. 강의 목록 전체조회
router.get('/', postMiddleware, postController.getPostAll);

// 2. 카테고리별 강의 조회
router.get('/:category', postMiddleware, postController.getPostCategory);

// 3. 카테고리+스택별 강의 조회
router.get('/:category/:stack', postMiddleware, postController.getPostStack);

 
module.exports = router;