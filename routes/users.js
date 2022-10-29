const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth_middleware')
const UsersController = require('../controllers/usersController');


const usersController = new UsersController();

router.post('/signUp', usersController.signUpUser); // 회원 가입 API

router.post('/checkId', usersController.checkId); //아이디 중복체크

router.post('/login', usersController.loginUser); // 토큰 발급 및 로그인 API

router.get('/likes',authMiddleware,usersController.userLikes); //좋아요 한 리스트

router.get('/buckets',authMiddleware,usersController.userBuckets); // 장바구니 담은 리스트

module.exports = router;
