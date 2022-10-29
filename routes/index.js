const express = require('express');
const router = express.Router();
const postsRouter = require('./posts.js');
const usersRouter = require('./users.js');
const featureRouter = require('./feature');

//전역 미들웨어

router.use("/posts", postsRouter);
router.use('/users', usersRouter);
// router.use("/buckets", bucketsRouter);
router.use('/feature', featureRouter);

module.exports = router;
