const express = require('express');
const app = express();
const port = 3000;
const Router = require('./routes/index.js');
const errorHandlerMiddleware = require('./middlewares/error_handler_middleware')
const cookieParser = require('cookie-parser');
const cors = require('cors');
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

app.use("/", Router);
app.use('/' ,errorHandlerMiddleware); // 에러 핸들러


// WebSocket - 익명 다대다 채팅
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=>{
    socket.on('request_message', (msg) => {
        // response_message로 접속중인 모든 사용자에게 msg 를 담은 정보를 방출한다.
        io.emit('response_message', msg);
    });

    socket.on('disconnect', async () => {
        console.log('user disconnected');
    });
});


// TEST CODE GOES HERE
(async function(){
})();


http.listen(port, () => {
    console.log(`${port}번 포트로 서버 실행`);
});

// app.listen(port, () => {
//     console.log(port, '포트로 서버가 열렸어요!');
// });