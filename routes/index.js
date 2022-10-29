const express = require('express');
const router = express.Router();
const postsRouter = require('./posts.js');
const usersRouter = require('./users.js');
const bucketsRouter = require('./buckets.js');
const likesRouter = require('./likes.js');


//전역 미들웨어

router.use("/posts", postsRouter);
router.use("/users", usersRouter);
// router.use("/buckets", bucketsRouter);
// router.use("/likes", likesRouter);


module.exports = router;