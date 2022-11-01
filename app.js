const express = require('express');
const app = express();
const port = 4000;
const Router = require('./routes/index');
const errorHandlerMiddleware = require('./middlewares/error_handler_middleware');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const auth_middleware = require('./middlewares/auth_middleware');
require('./models');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

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
app.use('/', errorHandlerMiddleware); // 에러 핸들러




// 로그인 클라이언트연결 테스트
app.get('/test/login', (req,res)=>{
    res.sendFile(__dirname + '/login.html');
})

// WebSocket - 실시간 채팅 
app.get('/chat1', async(req, res) => {
    // const loginId = res.locals.user.loginId  //현재 로그인된 유저의 loginId 도출
    // res.header('userId', loginId)  //응답 헤더에 넣어줌
    res.sendFile(__dirname + '/index.html');
}); 

app.get('/chat2', async(req, res)=> {
    res.sendFile(__dirname + '/room2.html')
})

app.get('/chat3', async(req, res)=> {
    res.sendFile(__dirname + '/room3.html')
})



io.on('connection', (socket)=>{
    socket.on('room2', (msg) => { 
        // response_message로 접속중인 모든 사용자에게 msg 를 담은 정보를 방출한다.
        io.emit('room_all', msg);
    })

        socket.on('room3', (msg) => { 
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

