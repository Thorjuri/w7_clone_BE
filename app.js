const express = require('express');
const app = express();
const port = 3000;
const Router = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandlerMiddleware = require('./middlewares/error_handler_middleware');
require('./models');

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
        exposedHeaders: 'Authorization',
    })
);

app.options('*', cors());

app.use('/', Router);
// 에러 핸들러
app.use(errorHandlerMiddleware)

app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
