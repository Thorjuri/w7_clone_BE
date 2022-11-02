const express = require('express');
const app = express();
const port = 5000;
const Router = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('./middlewares/error_handler_middleware');
require('./models');

const http = require('http').createServer(app);
// const io = require('socket.io')(http);

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
        allowedHeaders: ['content-Type', 'Authorization'],
        exposedHeaders: ['content-Type', 'Authorization'],
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH', 'OPTIONS'],
        credential: 'true',
    })
);

app.options('*', cors());

app.use('/', Router);
// 에러 핸들러
app.use(errorHandler)


http.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행`);
});
