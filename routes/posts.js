const express = require('express');
const router = express.Router();

const PostsController = require('../controllers/postsController.js');
const postController = new PostsController();

// 1. 강의 목록 전체조회
router.get('/', postController.getPostAll);

// 2. 카테고리별 강의 조회
router.get('/:category', postController.getPostCategory);

// 3. 카테고리+스택별 강의 조회
router.get('/:category/:stack', postController.getPostStack);

 
module.exports = router;