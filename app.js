const express = require('express');
const app = express();
const port = 4000;
const Router = require('./routes/index');
const errorHandlerMiddleware = require('./middlewares/error_handler_middleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');
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

app.get('/test', (req, res)=> {
    res.sendFile(__dirname + '/post.html')
})

app.use('/', Router);
app.use('/', errorHandlerMiddleware); // 에러 핸들러


app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});
