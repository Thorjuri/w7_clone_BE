const express = require('express');
const app = express();

const port = 5000;

const Router = require('./routes/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandlerMiddleware = require('./middlewares/error_handler_middleware');
const auth_middleware = require('./middlewares/auth_middleware');
require('./models');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.

        allowedHeaders: ['content-Type','Authorization'],
        exposedHeaders: ['content-Type','Authorization'],
        methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH','OPTIONS'],
        credential: 'true'


    })
);

app.options('*', cors());

app.use('/', Router);
// 에러 핸들러
app.use(errorHandlerMiddleware);

// WebSocket - 실시간 채팅
app.get('/chat1', auth_middleware, async (req, res) => {
    const { loginId } = res.locals.user; //현재 로그인된 유저의 loginId 도출
    res.header('userId', loginId); //응답 헤더에 넣어줌
    res.sendFile(__dirname + '/chat.html');
});


io.on('connection', (socket)=>{
    socket.on('room1', (msg) => { 

        // response_message로 접속중인 모든 사용자에게 msg 를 담은 정보를 방출한다.
        io.emit('room_all', msg);
    });

    socket.on('disconnect', async () => {
        console.log('user disconnected');
    });
});

http.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행`);
});
